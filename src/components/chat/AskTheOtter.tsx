"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, Send, Sparkles, RotateCcw, MinusCircle } from "lucide-react";
import ToolResultCard from "./ToolResultCard";
import type { ToolResultPayload } from "@/lib/chat-tools";

type MsgPart =
  | { type: "text"; text: string }
  | { type: "tool_invocation"; id: string; name: string; input: Record<string, unknown> }
  | { type: "tool_result"; id: string; payload: ToolResultPayload };

type Message = {
  role: "user" | "assistant";
  parts: MsgPart[];
};

const STORAGE_KEY = "aquaotter:chat:v1";
const GREETING: Message = {
  role: "assistant",
  parts: [{
    type: "text",
    text: "Hi! I'm Otis. I can help you figure out what's in your water, what system fits your home, or book a free in-home test. What's going on with your water?",
  }],
};

const QUICK_REPLIES = [
  { label: "What's in my water?", msg: "What's in my water? My ZIP is 46060." },
  { label: "Hard water signs?", msg: "How do I know if I have hard water?" },
  { label: "Softener vs filter?", msg: "What's the difference between a softener and a filter?" },
  { label: "Book a free test", msg: "I'd like to book a free water test." },
];

export default function AskTheOtter() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [streaming, setStreaming] = useState(false);
  const [showNudge, setShowNudge] = useState(false);
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const reduce = useReducedMotion();

  // Restore from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw) as { messages: Message[] };
        if (Array.isArray(data.messages) && data.messages.length > 0) {
          setMessages(data.messages);
        }
      }
    } catch {}
    // Nudge after 12s if chat never opened
    const t = setTimeout(() => {
      if (!localStorage.getItem("aquaotter:chat:nudge-seen")) {
        setShowNudge(true);
      }
    }, 12000);
    return () => clearTimeout(t);
  }, []);

  // Persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ messages }));
    } catch {}
  }, [messages]);

  // Autoscroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, streaming]);

  const dismissNudge = () => {
    setShowNudge(false);
    localStorage.setItem("aquaotter:chat:nudge-seen", "1");
  };

  const openChat = () => {
    setOpen(true);
    setMinimized(false);
    setUnread(0);
    dismissNudge();
  };

  const resetChat = () => {
    if (streaming) return;
    setMessages([GREETING]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const send = async (text: string) => {
    const userMsg: Message = { role: "user", parts: [{ type: "text", text }] };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput("");
    setStreaming(true);

    // Start an empty assistant message we'll stream into
    setMessages(prev => [...prev, { role: "assistant", parts: [] }]);

    const ctrl = new AbortController();
    abortRef.current = ctrl;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.flatMap((m) => {
            // Collapse parts into a single text blob per message for the API
            const text = m.parts.map(p => (p.type === "text" ? p.text : "")).join("").trim();
            return text ? [{ role: m.role, content: text }] : [];
          }),
        }),
        signal: ctrl.signal,
      });

      if (!res.ok || !res.body) {
        throw new Error(`HTTP ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        // Parse SSE lines
        const chunks = buffer.split("\n\n");
        buffer = chunks.pop() ?? "";
        for (const chunk of chunks) {
          const line = chunk.split("\n").find(l => l.startsWith("data: "));
          if (!line) continue;
          const payload = line.slice(6);
          let event: { type: string; [k: string]: unknown };
          try { event = JSON.parse(payload); } catch { continue; }

          setMessages(prev => {
            const next = [...prev];
            const last = next[next.length - 1];
            if (!last || last.role !== "assistant") return prev;

            if (event.type === "text_delta") {
              const parts = [...last.parts];
              const lastPart = parts[parts.length - 1];
              if (lastPart?.type === "text") {
                parts[parts.length - 1] = { type: "text", text: lastPart.text + (event.text as string) };
              } else {
                parts.push({ type: "text", text: event.text as string });
              }
              next[next.length - 1] = { ...last, parts };
            } else if (event.type === "tool_use") {
              const parts = [...last.parts, {
                type: "tool_invocation" as const,
                id: event.id as string,
                name: event.name as string,
                input: event.input as Record<string, unknown>,
              }];
              next[next.length - 1] = { ...last, parts };
            } else if (event.type === "tool_result") {
              const parts = [...last.parts, {
                type: "tool_result" as const,
                id: event.id as string,
                payload: event.payload as ToolResultPayload,
              }];
              next[next.length - 1] = { ...last, parts };
            }
            return next;
          });
        }
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        setMessages(prev => [...prev, { role: "assistant", parts: [{ type: "text", text: "Sorry, I hit a snag. You can reach us at (317) 983-5919 or the contact form." }] }]);
      }
    } finally {
      setStreaming(false);
      abortRef.current = null;
      if (!open || minimized) setUnread(u => u + 1);
    }
  };

  return (
    <>
      {/* FAB */}
      <AnimatePresence>
        {(!open || minimized) && (
          <motion.button
            key="fab"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            whileHover={reduce ? undefined : { scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openChat}
            className="fixed z-[90] rounded-full group"
            style={{
              bottom: "max(24px, env(safe-area-inset-bottom))",
              right: 24,
              width: 64,
              height: 64,
              backgroundColor: "#12BDFB",
              boxShadow: "0 12px 32px rgba(18,189,251,0.45), 0 0 0 6px rgba(18,189,251,0.1)",
            }}
            aria-label="Ask the Otter"
          >
            <motion.div
              animate={reduce ? undefined : { y: [0, -3, 0] }}
              transition={reduce ? undefined : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-full flex items-center justify-center"
            >
              <Image
                src="/client/otter-waving.png"
                alt=""
                width={80}
                height={80}
                className="w-16 h-16 object-contain -mb-1"
                style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))" }}
              />
            </motion.div>
            {/* Unread dot */}
            {unread > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center" style={{ backgroundColor: "#ef4444", color: "#fff", boxShadow: "0 0 0 2px #07111A" }}>
                {unread}
              </span>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Nudge bubble */}
      <AnimatePresence>
        {showNudge && !open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className="fixed z-[89] rounded-2xl px-4 py-3 max-w-[260px] flex items-start gap-2"
            style={{
              bottom: "calc(max(24px, env(safe-area-inset-bottom)) + 80px)",
              right: 24,
              backgroundColor: "#ffffff",
              boxShadow: "0 12px 40px rgba(12,31,46,0.2)",
              border: "1px solid rgba(18,189,251,0.15)",
            }}
          >
            <button onClick={dismissNudge} className="absolute top-1 right-1.5 text-gray-400 hover:text-gray-600" aria-label="Dismiss">
              <X className="w-3 h-3" />
            </button>
            <div>
              <p className="text-sm font-bold" style={{ color: "#0C1F2E" }}>Got water questions?</p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(12,31,46,0.6)" }}>
                I&apos;m here 24/7. Ask me anything. No sales pitch.
              </p>
              <button onClick={openChat} className="mt-2 text-xs font-bold" style={{ color: "#12BDFB" }}>
                Chat with Otis →
              </button>
            </div>
            {/* little tail */}
            <span
              className="absolute -bottom-2 right-8 w-4 h-4 rotate-45"
              style={{ backgroundColor: "#ffffff", borderRight: "1px solid rgba(18,189,251,0.15)", borderBottom: "1px solid rgba(18,189,251,0.15)" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && !minimized && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="fixed z-[91] flex flex-col rounded-3xl overflow-hidden"
            style={{
              bottom: "max(24px, env(safe-area-inset-bottom))",
              right: "max(16px, env(safe-area-inset-right))",
              width: "min(420px, calc(100vw - 32px))",
              height: "min(640px, calc(100vh - 48px))",
              backgroundColor: "#07111A",
              boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(18,189,251,0.2)",
            }}
          >
            {/* Header */}
            <div className="relative flex items-center gap-3 p-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)", background: "linear-gradient(180deg, #0C1F2E 0%, #07111A 100%)" }}>
              <div className="relative">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center overflow-hidden"
                  style={{
                    background: "radial-gradient(circle at 50% 40%, rgba(18,189,251,0.25) 0%, rgba(18,189,251,0.05) 70%)",
                    border: "2px solid rgba(18,189,251,0.35)",
                  }}
                >
                  <Image
                    src="/client/otter-waving.png"
                    alt="Otis"
                    width={80}
                    height={80}
                    className="object-contain"
                    style={{ width: 56, height: 56, objectFit: "contain", transform: "translateY(4px)" }}
                  />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full" style={{ backgroundColor: "#22c55e", boxShadow: "0 0 0 2px #0C1F2E" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">Otis the Otter</p>
                <p className="text-[11px]" style={{ color: "rgba(34,197,94,0.85)" }}>Online · usually replies instantly</p>
              </div>
              <button
                onClick={resetChat}
                disabled={streaming}
                className="p-2 rounded-lg transition-colors disabled:opacity-30"
                style={{ color: "rgba(255,255,255,0.4)" }}
                aria-label="Reset conversation"
                title="Start over"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => { setMinimized(true); setOpen(false); }}
                className="p-2 rounded-lg transition-colors"
                style={{ color: "rgba(255,255,255,0.4)" }}
                aria-label="Minimize"
              >
                <MinusCircle className="w-4 h-4" />
              </button>
              <button
                onClick={() => { setOpen(false); setMinimized(false); }}
                className="p-2 rounded-lg transition-colors"
                style={{ color: "rgba(255,255,255,0.4)" }}
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ scrollbarWidth: "thin" }}>
              {messages.map((m, i) => (
                <Bubble key={i} message={m} />
              ))}
              {streaming && messages[messages.length - 1]?.parts.length === 0 && <TypingDots />}
              <div ref={bottomRef} />
            </div>

            {/* Quick replies (only show when conversation is fresh) */}
            {messages.length <= 1 && !streaming && (
              <div className="px-4 pb-3 flex flex-wrap gap-1.5">
                {QUICK_REPLIES.map((q) => (
                  <button
                    key={q.label}
                    onClick={() => send(q.msg)}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
                    style={{
                      backgroundColor: "rgba(18,189,251,0.08)",
                      border: "1px solid rgba(18,189,251,0.2)",
                      color: "rgba(18,189,251,0.9)",
                    }}
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const v = input.trim();
                if (!v || streaming) return;
                send(v);
              }}
              className="p-3 border-t flex items-center gap-2"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={streaming ? "Otis is thinking..." : "Ask about your water..."}
                disabled={streaming}
                className="flex-1 bg-transparent outline-none px-3 py-3 text-sm rounded-xl"
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  color: "#ffffff",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              />
              <button
                type="submit"
                disabled={!input.trim() || streaming}
                className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-all"
                style={{
                  backgroundColor: input.trim() && !streaming ? "#12BDFB" : "rgba(18,189,251,0.2)",
                  color: input.trim() && !streaming ? "#0C1F2E" : "rgba(255,255,255,0.3)",
                  boxShadow: input.trim() && !streaming ? "0 4px 16px rgba(18,189,251,0.3)" : "none",
                }}
                aria-label="Send"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="px-4 pb-3 flex items-center gap-1 text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>
              <Sparkles className="w-3 h-3" />
              AI assistant. Responses may be imperfect. For a precise quote, book a free test.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Bubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div className={`max-w-[85%] ${isUser ? "order-2" : ""}`}>
        {message.parts.map((part, i) => {
          if (part.type === "text") {
            if (!part.text) return null;
            return (
              <div
                key={i}
                className="text-sm leading-relaxed rounded-2xl px-4 py-2.5 whitespace-pre-wrap"
                style={{
                  backgroundColor: isUser ? "#12BDFB" : "rgba(255,255,255,0.06)",
                  color: isUser ? "#0C1F2E" : "rgba(255,255,255,0.92)",
                  borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  border: isUser ? "none" : "1px solid rgba(255,255,255,0.06)",
                  marginBottom: 4,
                }}
              >
                {part.text}
              </div>
            );
          }
          if (part.type === "tool_invocation") {
            return <ToolInvocation key={i} name={part.name} input={part.input} />;
          }
          if (part.type === "tool_result") {
            return <ToolResultCard key={i} payload={part.payload} />;
          }
          return null;
        })}
      </div>
    </motion.div>
  );
}

function ToolInvocation({ name, input }: { name: string; input: Record<string, unknown> }) {
  const labels: Record<string, string> = {
    lookup_water_by_zip: "Looking up water data...",
    recommend_system: "Matching systems to your needs...",
    estimate_savings: "Running the math...",
    book_water_test: "Booking your free test...",
  };
  return (
    <div className="flex items-center gap-2 text-xs my-1.5 pl-1" style={{ color: "rgba(18,189,251,0.7)" }}>
      <motion.span
        animate={{ rotate: 360 }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
        className="inline-block w-3 h-3 rounded-full border-2 border-t-transparent"
        style={{ borderColor: "#12BDFB transparent #12BDFB #12BDFB" }}
      />
      <span>{labels[name] ?? "Thinking..."}</span>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 pl-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{ y: [0, -4, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: "#12BDFB" }}
        />
      ))}
    </div>
  );
}
