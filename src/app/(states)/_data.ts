// State hub page metadata. Real geology / water info per state, no boilerplate.
// Cities are drawn from src/lib/service-areas.ts at render time. Office
// addresses use [REPLACE: ...] placeholders where street-level data is
// not yet confirmed by the client (no-fabrication policy).

import { SERVICE_AREAS, type ServiceArea } from "@/lib/service-areas";

export interface StateHub {
  slug: string;
  state: string;
  abbr: ServiceArea["state"];
  h1: string;
  intro: string;
  office: {
    name: string;
    streetAddress?: string;
    addressLocality?: string;
    postalCode?: string;
    telephone: string;
  };
}

export const STATE_HUBS: StateHub[] = [
  {
    slug: "indiana",
    state: "Indiana",
    abbr: "IN",
    h1: "Water Treatment in Indiana",
    intro:
      "Indiana sits on limestone bedrock, which is why most of the state pulls water that runs 15 to 22 grains per gallon hard. Hoosier homeowners on city water also see chlorine and chromium-6 from Citizens Energy and similar utilities, while private wells across central and southern Indiana frequently test high for iron, manganese, and sulfur. Aqua Otter has served Indiana families from our Noblesville headquarters since 1999, with two regional offices covering the entire state.",
    office: {
      name: "Aqua Otter Water Systems, Indianapolis HQ",
      streetAddress: "[REPLACE: Indianapolis HQ street address on Fall Creek Road]",
      addressLocality: "Indianapolis",
      postalCode: "[REPLACE: HQ ZIP]",
      telephone: "(317) 983-5919",
    },
  },
  {
    slug: "michigan",
    state: "Michigan",
    abbr: "MI",
    h1: "Water Treatment in Michigan",
    intro:
      "Michigan water varies sharply by region. Lake Michigan-fed cities like Grand Rapids run soft (around 8 grains per gallon), while Lansing and Ann Arbor sit on harder groundwater. Detroit Metro homeowners on GLWA face documented lead-service-line risks in older housing stock and chronic disinfection byproducts. Ann Arbor's Huron River supply has documented PFAS contamination, every Ann Arbor install we do pairs whole-home carbon with a 5-stage RO. Aqua Otter operates two Michigan offices, on Monroe Avenue in Grand Rapids and on Middlebelt Road in Livonia for the Detroit metro.",
    office: {
      name: "Aqua Otter Water Systems, West Michigan",
      streetAddress: "[REPLACE: Grand Rapids office street address on Monroe Avenue]",
      addressLocality: "Grand Rapids",
      postalCode: "[REPLACE: Grand Rapids ZIP]",
      telephone: "(616) 612-1660",
    },
  },
  {
    slug: "ohio",
    state: "Ohio",
    abbr: "OH",
    h1: "Water Treatment in Ohio",
    intro:
      "Ohio water hardness ranges from 7 grains per gallon in surface-water-fed cities like Columbus up to 25 grains per gallon in western limestone country. Columbus draws much of its supply from the Scioto and Griggs reservoirs and chloraminates the finished water, so disinfection byproducts (TTHMs and haloacetic acids) are the recurring complaint. Private wells across eastern Ohio tap shale aquifers that can deliver iron, sulfur, and naturally occurring radium. Aqua Otter serves Ohio from our office on South Third Street in Columbus.",
    office: {
      name: "Aqua Otter Water Systems, Ohio",
      streetAddress: "[REPLACE: Columbus office street address on South Third Street]",
      addressLocality: "Columbus",
      postalCode: "[REPLACE: Columbus OH ZIP]",
      telephone: "(380) 270-2422",
    },
  },
  {
    slug: "kentucky",
    state: "Kentucky",
    abbr: "KY",
    h1: "Water Treatment in Kentucky",
    intro:
      "Kentucky is karst country. Limestone bedrock dissolves into the groundwater, giving most of the state hard water. Lexington and Louisville pull from the Kentucky River and Ohio River respectively, both chlorinated surface-water systems where TTHMs and chlorine taste are routine complaints. Eastern Kentucky well owners deal with iron, sulfur, and turbidity from coal-region geology. Aqua Otter serves Kentucky homeowners from our office on East Main Street in Lexington.",
    office: {
      name: "Aqua Otter Water Systems, Kentucky",
      streetAddress: "[REPLACE: Lexington office street address on East Main Street]",
      addressLocality: "Lexington",
      postalCode: "[REPLACE: KY ZIP]",
      telephone: "(859) 710-9446",
    },
  },
  {
    slug: "tennessee",
    state: "Tennessee",
    abbr: "TN",
    h1: "Water Treatment in Tennessee",
    intro:
      "Tennessee water character splits along the state's three geographic divisions. West Tennessee taps the Memphis Sands aquifer, naturally soft but high in iron and acidic enough to corrode copper plumbing. Middle Tennessee, including Nashville, draws from the Cumberland River and runs soft (about 5 grains per gallon), making it a strong market for no-salt conditioning and whole-home filtration over traditional softening. East Tennessee well owners on the Knox Group dolomite frequently test 15 to 20 grains per gallon. Aqua Otter serves Tennessee from our Goodlettsville office.",
    office: {
      name: "Aqua Otter Water Systems, Tennessee",
      streetAddress: "[REPLACE: Goodlettsville office street address]",
      addressLocality: "Goodlettsville",
      postalCode: "[REPLACE: TN ZIP]",
      telephone: "(615) 880-9527",
    },
  },
  {
    slug: "north-carolina",
    state: "North Carolina",
    abbr: "NC",
    h1: "Water Treatment in North Carolina",
    intro:
      "North Carolina water varies from soft, slightly acidic surface water in the Piedmont to mineral-laden Coastal Plain groundwater. Raleigh and the Research Triangle pull from Falls Lake, naturally very soft, but the PFAS conversation is what drives most installs across Wake County. Whole-home granular activated carbon paired with a kitchen reverse osmosis system is the default Aqua Otter recommendation for Triangle homes. Aqua Otter serves North Carolina from our office on Centerview Drive in Raleigh.",
    office: {
      name: "Aqua Otter Water Systems, North Carolina",
      streetAddress: "5540 Centerview Drive",
      addressLocality: "Raleigh",
      postalCode: "[REPLACE: Raleigh ZIP for 5540 Centerview Drive]",
      telephone: "(919) 358-8340",
    },
  },
];

export function getStateHub(slug: string): StateHub | undefined {
  return STATE_HUBS.find((s) => s.slug === slug);
}

export function getCitiesInState(abbr: ServiceArea["state"]): ServiceArea[] {
  return SERVICE_AREAS.filter((a) => a.state === abbr);
}
