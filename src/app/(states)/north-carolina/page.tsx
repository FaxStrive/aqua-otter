import type { Metadata } from "next";
import StateHubPage from "../StateHubPage";
import { getStateHub } from "../_data";

const hub = getStateHub("north-carolina")!;

export const metadata: Metadata = {
  title: `${hub.h1} | Aqua Otter Water Systems`,
  description: `Family-owned water treatment in ${hub.state}. Free in-home water testing, no-salt softeners, well water systems, and whole-home filtration. Serving ${hub.cities.slice(0, 4).join(", ")} and more.`,
  alternates: { canonical: `https://www.myaquaotter.com/${hub.slug}` },
};

export default function Page() {
  return <StateHubPage hub={hub} />;
}
