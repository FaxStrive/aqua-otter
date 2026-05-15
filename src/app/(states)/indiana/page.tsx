import type { Metadata } from "next";
import StateHubPage from "../StateHubPage";
import { getStateHub, getCitiesInState } from "../_data";

const hub = getStateHub("indiana")!;
const cities = getCitiesInState(hub.abbr);
const cityList = cities.length
  ? cities.slice(0, 4).map((c) => c.city).join(", ")
  : "homeowners statewide";

export const metadata: Metadata = {
  title: `${hub.h1} | Aqua Otter Water Systems`,
  description: `Family-owned water treatment in ${hub.state}. Free in-home water testing, no-salt softeners, well water systems, whole-home filtration, and reverse osmosis. Serving ${cityList}.`,
  alternates: { canonical: `https://www.myaquaotter.com/${hub.slug}` },
};

export default function Page() {
  return <StateHubPage hub={hub} />;
}
