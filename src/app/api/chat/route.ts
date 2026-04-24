import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { OTTER_SYSTEM_PROMPT } from "@/lib/chat-system-prompt";
import { CHAT_TOOLS, executeTool, stringifyToolResult } from "@/lib/chat-tools";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

type InMessage =
  | { role: "user"; content: string }
  | { role: "assistant"; content: string };

// We stream Server-Sent Events (not raw Anthropic stream) so the client
// can receive both text deltas AND tool-call result cards as they happen.
// Event types the client handles:
//   { type: "text_delta", text }
//   { type: "tool_use", name, input, id }
//   { type: "tool_result", id, payload }
//   { type: "done" }
//   { type: "error", message }

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "Chat is unavailable. ANTHROPIC_API_KEY not configured." }, { status: 503 });
  }

  let body: { messages?: InMessage[] } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const incoming = Array.isArray(body.messages) ? body.messages : [];
  if (incoming.length === 0) {
    return NextResponse.json({ error: "No messages provided." }, { status: 400 });
  }

  // Convert to Anthropic message format. Only the final user turn is handled via streaming —
  // prior turns go in as plain text history.
  const history: Anthropic.Messages.MessageParam[] = incoming.map(m => ({
    role: m.role,
    content: m.content,
  }));

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (obj: unknown) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(obj)}\n\n`));
      };

      try {
        // Tool-use loop: up to 4 iterations.
        let currentHistory = [...history];
        for (let iter = 0; iter < 4; iter++) {
          const toolUses: { id: string; name: string; input: Record<string, unknown> }[] = [];
          let assistantBuffered: Anthropic.Messages.ContentBlockParam[] = [];

          const stream = client.messages.stream({
            model: "claude-sonnet-4-5",
            max_tokens: 1200,
            system: OTTER_SYSTEM_PROMPT,
            tools: CHAT_TOOLS,
            messages: currentHistory,
          });

          let currentText = "";

          stream.on("text", (textDelta) => {
            currentText += textDelta;
            send({ type: "text_delta", text: textDelta });
          });

          stream.on("contentBlock", (block) => {
            if (block.type === "text") {
              assistantBuffered.push({ type: "text", text: block.text });
            } else if (block.type === "tool_use") {
              assistantBuffered.push({
                type: "tool_use",
                id: block.id,
                name: block.name,
                input: block.input as Record<string, unknown>,
              });
              toolUses.push({ id: block.id, name: block.name, input: block.input as Record<string, unknown> });
            }
          });

          const finalMessage = await stream.finalMessage();

          // If no tool use, we're done.
          if (toolUses.length === 0 || finalMessage.stop_reason !== "tool_use") {
            send({ type: "done" });
            controller.close();
            return;
          }

          // Append the assistant turn (with tool_use blocks) to history.
          currentHistory.push({ role: "assistant", content: assistantBuffered });

          // Execute each tool and stream its result card, then append tool_result back.
          const toolResults: Anthropic.Messages.ToolResultBlockParam[] = [];
          for (const tu of toolUses) {
            send({ type: "tool_use", id: tu.id, name: tu.name, input: tu.input });
            const result = await executeTool(tu.name, tu.input);
            send({ type: "tool_result", id: tu.id, payload: result });
            toolResults.push({
              type: "tool_result",
              tool_use_id: tu.id,
              content: stringifyToolResult(result),
            });
          }

          currentHistory.push({ role: "user", content: toolResults });
          // loop again: model will incorporate tool results and continue / finish
        }

        send({ type: "done" });
        controller.close();
      } catch (err) {
        console.error("[chat] error", err);
        const msg = err instanceof Error ? err.message : "Unknown error";
        send({ type: "error", message: msg });
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
