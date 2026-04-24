// Service-area metadata for programmatic SEO.
// Each entry produces a /service-areas/[slug] page.
// office_phone maps the city to the nearest real Aqua Otter regional office.

export type ServiceArea = {
  slug: string;
  city: string;
  state: "IN" | "MI" | "OH" | "KY" | "TN" | "NC";
  county: string;
  zips: string[];
  hardness_gpg: number;
  source: "Municipal" | "Mix of Municipal and Well";
  notable_contaminants: string[];
  local_hook: string;
  office_phone: string;
  nearby: string[];
};

// Local office phone map — pick the closest regional office for each metro.
const PHONE_HQ         = "(317) 983-5919"; // Indianapolis HQ
const PHONE_FT_WAYNE   = "(260) 235-4204";
const PHONE_GRAND_RAP  = "(616) 612-1660";
const PHONE_DETROIT    = "(248) 621-8411";
const PHONE_OHIO       = "(380) 270-2422";
const PHONE_KY         = "(859) 710-9446";
const PHONE_TN         = "(615) 880-9527";
const PHONE_NC         = "(919) 358-8340";

export const SERVICE_AREAS: ServiceArea[] = [
  { slug: "noblesville-in",   city: "Noblesville",   state: "IN", county: "Hamilton",   zips: ["46060", "46062"], hardness_gpg: 20, source: "Municipal", notable_contaminants: ["Chromium-6", "Haloacetic acids"], local_hook: "Home base for Aqua Otter since 1999. Hamilton County's hardest water runs through here.", office_phone: PHONE_HQ, nearby: ["fishers-in", "carmel-in", "westfield-in"] },
  { slug: "fishers-in",       city: "Fishers",       state: "IN", county: "Hamilton",   zips: ["46038", "46037"], hardness_gpg: 19, source: "Municipal", notable_contaminants: ["Chromium-6", "Haloacetic acids"], local_hook: "One of the fastest-growing cities in Indiana and some of the hardest water. Every third home we install is a Fishers home.", office_phone: PHONE_HQ, nearby: ["noblesville-in", "carmel-in", "indianapolis-in"] },
  { slug: "carmel-in",        city: "Carmel",        state: "IN", county: "Hamilton",   zips: ["46032", "46033", "46074"], hardness_gpg: 19, source: "Municipal", notable_contaminants: ["Chromium-6", "TTHMs"], local_hook: "High-end builds, high-end expectations. Carmel homeowners notice hard water on glass surfaces first.", office_phone: PHONE_HQ, nearby: ["fishers-in", "westfield-in", "zionsville-in"] },
  { slug: "indianapolis-in",  city: "Indianapolis",  state: "IN", county: "Marion",     zips: ["46202", "46204", "46250", "46256"], hardness_gpg: 17, source: "Municipal", notable_contaminants: ["Chromium-6", "Nitrate"], local_hook: "Citizens Energy supplies most of Indy. Hard, chlorinated, with detectable nitrate in agricultural-adjacent neighborhoods. Our headquarters sits on Fall Creek Road.", office_phone: PHONE_HQ, nearby: ["greenwood-in", "fishers-in", "plainfield-in"] },
  { slug: "westfield-in",     city: "Westfield",     state: "IN", county: "Hamilton",   zips: ["46074"],           hardness_gpg: 20, source: "Municipal", notable_contaminants: ["Chromium-6"], local_hook: "Fast growing, mostly new construction. Most of our installs here are softeners paired with an RO for the kitchen.", office_phone: PHONE_HQ, nearby: ["carmel-in", "noblesville-in", "zionsville-in"] },
  { slug: "zionsville-in",    city: "Zionsville",    state: "IN", county: "Boone",       zips: ["46077"],           hardness_gpg: 21, source: "Municipal", notable_contaminants: ["Chromium-6", "TTHMs"], local_hook: "Boone County has some of the hardest water in the state. Summer TTHM spikes are common in the CCR reports.", office_phone: PHONE_HQ, nearby: ["carmel-in", "westfield-in"] },
  { slug: "greenwood-in",     city: "Greenwood",     state: "IN", county: "Johnson",     zips: ["46142", "46143"], hardness_gpg: 16, source: "Municipal", notable_contaminants: ["Haloacetic acids"], local_hook: "South-side suburb with a mix of municipal and well customers. Water is hard, not extreme.", office_phone: PHONE_HQ, nearby: ["indianapolis-in", "columbus-in"] },
  { slug: "plainfield-in",    city: "Plainfield",    state: "IN", county: "Hendricks",   zips: ["46168"],           hardness_gpg: 18, source: "Mix of Municipal and Well", notable_contaminants: ["Haloacetic acids"], local_hook: "Well-sourced municipal supply. Iron shows up in well households at the edge of town.", office_phone: PHONE_HQ, nearby: ["indianapolis-in"] },
  { slug: "columbus-in",      city: "Columbus",      state: "IN", county: "Bartholomew", zips: ["47201"],           hardness_gpg: 15, source: "Municipal", notable_contaminants: ["Nitrate"], local_hook: "Agricultural runoff makes nitrate a real conversation here. Bartholomew County softens around 15 GPG.", office_phone: PHONE_HQ, nearby: ["greenwood-in", "bloomington-in"] },
  { slug: "bloomington-in",   city: "Bloomington",   state: "IN", county: "Monroe",      zips: ["47401", "47404"], hardness_gpg: 13, source: "Municipal", notable_contaminants: ["TTHMs"], local_hook: "Monroe Reservoir supply. Softer than central Indiana by a wide margin, but city treatment means chlorine taste is the common complaint.", office_phone: PHONE_HQ, nearby: ["columbus-in"] },
  { slug: "fort-wayne-in",    city: "Fort Wayne",    state: "IN", county: "Allen",       zips: ["46802", "46804", "46815"], hardness_gpg: 22, source: "Municipal", notable_contaminants: ["Chromium-6", "TTHMs"], local_hook: "Among the hardest water in the state. Our Northern Indiana office sits on Stellhorn Road. Fort Wayne installs skew toward full-treatment combinations.", office_phone: PHONE_FT_WAYNE, nearby: [] },
  { slug: "south-bend-in",    city: "South Bend",    state: "IN", county: "St Joseph",   zips: ["46614", "46628"], hardness_gpg: 16, source: "Mix of Municipal and Well", notable_contaminants: ["Nitrate"], local_hook: "Well-sourced municipal with visible iron in a lot of homes. AiO is a common fit even on city supply.", office_phone: PHONE_FT_WAYNE, nearby: [] },
  { slug: "grand-rapids-mi",  city: "Grand Rapids",  state: "MI", county: "Kent",        zips: ["49503", "49505"], hardness_gpg: 8,  source: "Municipal", notable_contaminants: ["TTHMs"], local_hook: "Lake Michigan supply is moderately soft. Our West Michigan office on Monroe Avenue serves the whole metro.", office_phone: PHONE_GRAND_RAP, nearby: [] },
  { slug: "lansing-mi",       city: "Lansing",       state: "MI", county: "Ingham",      zips: ["48906"],           hardness_gpg: 6,  source: "Municipal", notable_contaminants: ["TTHMs"], local_hook: "Moderately soft water. The no-salt Quintex 5 performs beautifully in Lansing, one of our top no-salt markets.", office_phone: PHONE_DETROIT, nearby: [] },
  { slug: "detroit-mi",       city: "Detroit Metro", state: "MI", county: "Wayne",       zips: ["48154", "48201", "48105"], hardness_gpg: 7,  source: "Municipal", notable_contaminants: ["Lead", "Haloacetic acids"], local_hook: "GLWA supply is soft. Lead risk is real in older housing stock. Our SE Michigan office on Middlebelt Road in Livonia serves the whole Detroit metro.", office_phone: PHONE_DETROIT, nearby: [] },
  { slug: "ann-arbor-mi",     city: "Ann Arbor",     state: "MI", county: "Washtenaw",   zips: ["48104"],           hardness_gpg: 10, source: "Municipal", notable_contaminants: ["PFAS"], local_hook: "Huron River supply has documented PFAS. Every Ann Arbor install we do includes whole-home carbon plus a 5-stage RO.", office_phone: PHONE_DETROIT, nearby: [] },
  // Newly-covered metros via regional offices
  { slug: "columbus-oh",      city: "Columbus",      state: "OH", county: "Franklin",    zips: ["43215"],           hardness_gpg: 7,  source: "Municipal", notable_contaminants: ["TTHMs", "Haloacetic acids"], local_hook: "Columbus is moderately soft thanks to the Scioto and Griggs reservoir supply, but chlorine disinfection byproducts are a recurring concern. Our Ohio office is on South Third Street.", office_phone: PHONE_OHIO, nearby: [] },
  { slug: "lexington-ky",     city: "Lexington",     state: "KY", county: "Fayette",     zips: ["40502", "40507"], hardness_gpg: 8,  source: "Municipal", notable_contaminants: ["TTHMs"], local_hook: "Kentucky American Water supplies Lexington from the Kentucky River. Moderate hardness with chlorine byproducts. Our Kentucky office sits on East Main Street.", office_phone: PHONE_KY, nearby: [] },
  { slug: "nashville-tn",     city: "Nashville",     state: "TN", county: "Davidson",    zips: ["37072", "37209"], hardness_gpg: 5,  source: "Municipal", notable_contaminants: ["TTHMs", "Haloacetic acids"], local_hook: "Soft water from the Cumberland River supply. A great market for no-salt and filtration over traditional softening. Our Tennessee office is in Goodlettsville.", office_phone: PHONE_TN, nearby: [] },
  { slug: "raleigh-nc",       city: "Raleigh",       state: "NC", county: "Wake",        zips: ["27606", "27607"], hardness_gpg: 3,  source: "Municipal", notable_contaminants: ["TTHMs", "PFAS"], local_hook: "Falls Lake supply is naturally very soft. The PFAS conversation is what drives most Raleigh installs. Whole-home carbon plus RO is our default recommendation. Our NC office is on Centerview Drive.", office_phone: PHONE_NC, nearby: [] },
];

export function getServiceArea(slug: string): ServiceArea | null {
  return SERVICE_AREAS.find(a => a.slug === slug) ?? null;
}
