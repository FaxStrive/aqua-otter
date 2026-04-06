import type { Metadata } from "next";
import WholeHouseClient from "./WholeHouseClient";

export const metadata: Metadata = {
  title: "Whole House Filtration | Aqua Otter Water Systems",
  description:
    "Clean, filtered water from every faucet in your home. Aqua Otter installs whole house filtration systems for city and well water across Southern Indiana.",
};

export default function WholeHouseFiltrationPage() {
  return <WholeHouseClient />;
}
