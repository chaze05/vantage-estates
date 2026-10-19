export type Agent = {
  slug: string;
  name: string;
  role: string;
  areas: string;
  initials: string;
  email: string;
  phone: string;
};

export const AGENTS: Agent[] = [
  {
    slug: "camille-reyes",
    name: "Camille Reyes",
    role: "Senior Property Advisor",
    areas: "BGC · Makati · Quezon City",
    initials: "CR",
    email: "camille@vantageestates.ph",
    phone: "+63 917 555 0101",
  },
  {
    slug: "miguel-torres",
    name: "Miguel Torres",
    role: "Property Advisor",
    areas: "Alabang · Tagaytay · Batangas",
    initials: "MT",
    email: "miguel@vantageestates.ph",
    phone: "+63 917 555 0102",
  },
  {
    slug: "sofia-lim",
    name: "Sofia Lim",
    role: "Property Advisor",
    areas: "Cebu · Mactan · Visayas",
    initials: "SL",
    email: "sofia@vantageestates.ph",
    phone: "+63 917 555 0103",
  },
  {
    slug: "daniel-santos",
    name: "Daniel Santos",
    role: "Commercial Lead",
    areas: "Clark · Metro Manila",
    initials: "DS",
    email: "daniel@vantageestates.ph",
    phone: "+63 917 555 0104",
  },
];

export function getAgent(slug: string): Agent | undefined {
  return AGENTS.find((agent) => agent.slug === slug);
}
