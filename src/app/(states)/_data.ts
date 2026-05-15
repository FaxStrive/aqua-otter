// State hub page data. Real geology / water notes per state, no boilerplate.
// Office addresses are from /service-areas live site copy. Where an address
// is not on the site, the field is omitted rather than fabricated.

export interface StateOffice {
  name: string;
  streetAddress?: string;
  postalCode?: string;
  telephone: string;
}

export interface StateHub {
  slug: string;
  state: string;
  abbr: string;
  h1: string;
  intro: string;
  cities: string[];
  office: StateOffice;
}

const PHONE = "+1-317-961-6925";

export const STATE_HUBS: StateHub[] = [
  {
    slug: "indiana",
    state: "Indiana",
    abbr: "IN",
    h1: "Water Treatment in Indiana",
    intro:
      "Indiana sits on limestone bedrock, which is why most of the state pulls water that runs 15 to 25 grains per gallon hard. Hoosier homeowners on city water also see chlorine and chloramine from municipal treatment, while private wells across central and southern Indiana frequently test high for iron, manganese, and sulfur. Aqua Otter has served Indiana families since 1999 from our Noblesville office, with free in-home water testing in the Indianapolis metro and the surrounding counties.",
    cities: [
      "Indianapolis",
      "Carmel",
      "Fishers",
      "Noblesville",
      "Westfield",
      "Zionsville",
      "Greenwood",
      "Fort Wayne",
      "Evansville",
      "South Bend",
      "Bloomington",
      "Lafayette",
      "Muncie",
      "Terre Haute",
    ],
    office: {
      name: "Aqua Otter Water Systems, Indiana",
      streetAddress: "[REPLACE: Noblesville HQ street address]",
      postalCode: "[REPLACE: Noblesville HQ ZIP, likely 46060 or 46062]",
      telephone: PHONE,
    },
  },
  {
    slug: "michigan",
    state: "Michigan",
    abbr: "MI",
    h1: "Water Treatment in Michigan",
    intro:
      "Michigan water varies sharply by region. Most of the Lower Peninsula draws hard, mineral-rich water from carbonate aquifers, with hardness levels regularly above 20 grains per gallon. Detroit and Grand Rapids residents on municipal supply deal with chloramine, lead-service-line legacy concerns, and seasonal taste-and-odor issues from surface-water intakes. Rural well owners across the state contend with iron staining, hydrogen sulfide, and arsenic in pockets of the thumb region. Aqua Otter brings free in-home water testing to homeowners across southern Michigan.",
    cities: ["Detroit", "Grand Rapids", "Lansing", "Ann Arbor", "Kalamazoo"],
    office: {
      name: "Aqua Otter Water Systems, Michigan service",
      telephone: PHONE,
    },
  },
  {
    slug: "ohio",
    state: "Ohio",
    abbr: "OH",
    h1: "Water Treatment in Ohio",
    intro:
      "Ohio water hardness ranges from 7 grains per gallon in surface-water-fed cities like Cleveland up to 30 grains per gallon in the western limestone belt around Columbus and Dayton. Columbus draws much of its supply from the Scioto and Big Walnut reservoirs and chloraminates the finished water, while private wells in eastern Ohio tap shale aquifers that can deliver iron, sulfur, and naturally occurring radium. Aqua Otter serves Ohio homeowners with free in-home testing and treatment systems matched to your exact water profile.",
    cities: ["Columbus", "Cincinnati", "Cleveland", "Dayton", "Toledo"],
    office: {
      name: "Aqua Otter Water Systems, Ohio service",
      telephone: PHONE,
    },
  },
  {
    slug: "kentucky",
    state: "Kentucky",
    abbr: "KY",
    h1: "Water Treatment in Kentucky",
    intro:
      "Kentucky is karst country. Limestone bedrock dissolves into the groundwater across most of the state, giving central and western Kentucky some of the hardest water in the Midwest, often 18 to 25 grains per gallon. Louisville pulls from the Ohio River and treats with chlorine and granular activated carbon, but residual chlorine taste and disinfection byproducts are common complaints. Eastern Kentucky well owners deal with iron, sulfur, and turbidity from coal-region geology. Aqua Otter brings free in-home water testing to Louisville, Lexington, and surrounding communities.",
    cities: ["Louisville", "Lexington", "Bowling Green", "Owensboro"],
    office: {
      name: "Aqua Otter Water Systems, Lexington",
      streetAddress: "[REPLACE: Lexington office street address]",
      postalCode: "[REPLACE: KY ZIP]",
      telephone: PHONE,
    },
  },
  {
    slug: "tennessee",
    state: "Tennessee",
    abbr: "TN",
    h1: "Water Treatment in Tennessee",
    intro:
      "Tennessee water character splits along the state's three geographic divisions. West Tennessee taps the Memphis Sands aquifer, naturally soft but high in iron and acidic enough to corrode copper plumbing. Middle Tennessee, including Nashville, draws from the Cumberland River and limestone aquifers, producing moderately hard water with seasonal chloramine. East Tennessee well owners on the Knox Group dolomite frequently test 15 to 20 grains per gallon. Aqua Otter serves Tennessee homeowners with free in-home testing and matched treatment systems.",
    cities: ["Nashville", "Knoxville", "Chattanooga", "Memphis"],
    office: {
      name: "Aqua Otter Water Systems, Tennessee service",
      telephone: PHONE,
    },
  },
  {
    slug: "north-carolina",
    state: "North Carolina",
    abbr: "NC",
    h1: "Water Treatment in North Carolina",
    intro:
      "North Carolina water varies from soft, slightly acidic surface water in the Piedmont to mineral-laden Coastal Plain groundwater. Raleigh and the Research Triangle pull from Falls Lake and Jordan Lake, both chloraminated and prone to seasonal disinfection byproducts. Wake County private well owners contend with naturally occurring radon, low pH that pits copper, and elevated iron from the Triassic Basin. Aqua Otter serves North Carolina homeowners from our Raleigh office with free in-home water testing across the Triangle.",
    cities: [
      "Raleigh",
      "Cary",
      "Durham",
      "Chapel Hill",
      "Apex",
      "Wake Forest",
      "Garner",
      "Holly Springs",
    ],
    office: {
      name: "Aqua Otter Water Systems, Raleigh",
      streetAddress: "5540 Centerview Drive",
      postalCode: "[REPLACE: Raleigh ZIP for 5540 Centerview Dr]",
      telephone: PHONE,
    },
  },
];

export function getStateHub(slug: string): StateHub | undefined {
  return STATE_HUBS.find((s) => s.slug === slug);
}
