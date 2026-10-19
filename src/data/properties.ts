export type PropertyType =
  | "Condo"
  | "House & Lot"
  | "Townhouse"
  | "Lot"
  | "Commercial";

export type Property = {
  slug: string;
  title: string;
  location: string;
  city: string;
  type: PropertyType;
  price: number;
  beds: number;
  baths: number;
  sqm: number;
  lot?: string;
  year: number;
  description: string;
  features: string[];
  images: string[];
  featured: boolean;
  agentSlug: string;
};

export const PROPERTY_TYPES: PropertyType[] = [
  "Condo",
  "House & Lot",
  "Townhouse",
  "Lot",
  "Commercial",
];

export const PROPERTIES: Property[] = [
  {
    slug: "one-bgc-tower",
    title: "One BGC Tower",
    location: "Bonifacio Global City, Taguig",
    city: "Taguig",
    type: "Condo",
    price: 18500000,
    beds: 2,
    baths: 2,
    sqm: 118,
    year: 2021,
    description:
      "A corner two-bedroom with double-aspect skyline views above High Street. Quiet interiors, a proper study nook and balcony space that actually gets used.",
    features: ["Corner unit", "Two parking slots", "24/7 concierge", "Walk to High Street"],
    images: ["/images/p1.jpg", "/images/g1.jpg", "/images/g3.jpg"],
    featured: true,
    agentSlug: "camille-reyes",
  },
  {
    slug: "salcedo-sky-penthouse",
    title: "Salcedo Sky Penthouse",
    location: "Salcedo Village, Makati",
    city: "Makati",
    type: "Condo",
    price: 42000000,
    beds: 3,
    baths: 3,
    sqm: 220,
    year: 2019,
    description:
      "A duplex penthouse with a private roof deck, wrap-around glazing and a wine wall. Steps from Salcedo Market and the weekday financial district.",
    features: ["Private roof deck", "Wrap-around glazing", "Service entrance", "Three parking slots"],
    images: ["/images/p2.jpg", "/images/g2.jpg", "/images/g1.jpg"],
    featured: true,
    agentSlug: "camille-reyes",
  },
  {
    slug: "casa-alabang",
    title: "Casa Alabang",
    location: "Ayala Alabang, Muntinlupa",
    city: "Muntinlupa",
    type: "House & Lot",
    price: 28000000,
    beds: 5,
    baths: 4,
    sqm: 320,
    lot: "480 sqm lot",
    year: 2017,
    description:
      "A family home behind a quiet garden, with a lanai opening to mature trees and a separate service wing. Room for everyone to find a corner.",
    features: ["Mature landscaped garden", "Service wing", "Two-car carport", "Gated village"],
    images: ["/images/p3.jpg", "/images/g4.jpg", "/images/g5.jpg"],
    featured: true,
    agentSlug: "miguel-torres",
  },
  {
    slug: "tagaytay-ridge-villa",
    title: "Tagaytay Ridge Villa",
    location: "Tagaytay Highlands, Cavite",
    city: "Tagaytay",
    type: "House & Lot",
    price: 22000000,
    beds: 4,
    baths: 3,
    sqm: 280,
    lot: "600 sqm lot",
    year: 2020,
    description:
      "Cool air, a long ridge view and a deep covered terrace for weekend lunches. Designed as a second home that works on rainy weekdays too.",
    features: ["Ridge and lake views", "Outdoor dining terrace", "Fireplace and den", "Club membership"],
    images: ["/images/p4.jpg", "/images/g6.jpg", "/images/g2.jpg"],
    featured: true,
    agentSlug: "miguel-torres",
  },
  {
    slug: "mactan-shore-house",
    title: "Mactan Shore House",
    location: "Punta Engaño, Mactan, Cebu",
    city: "Cebu",
    type: "House & Lot",
    price: 35000000,
    beds: 4,
    baths: 5,
    sqm: 350,
    lot: "820 sqm lot",
    year: 2018,
    description:
      "A whitewashed house that opens to the water, with a shaded lanai, outdoor shower and a guest wing that feels like a small hotel.",
    features: ["Direct beach access", "Guest wing", "Outdoor shower", "Ten minutes to the airport"],
    images: ["/images/p5.jpg", "/images/g3.jpg", "/images/g6.jpg"],
    featured: false,
    agentSlug: "sofia-lim",
  },
  {
    slug: "vertis-north-townhouse",
    title: "Vertis North Townhouse",
    location: "Vertis North, Quezon City",
    city: "Quezon City",
    type: "Townhouse",
    price: 9800000,
    beds: 3,
    baths: 2,
    sqm: 156,
    year: 2023,
    description:
      "A corner townhouse in the middle of the city — high ceilings, a pocket garden and a study that catches the afternoon light.",
    features: ["Corner lot", "Skylight over stairwell", "Two parking slots", "Walk to the mall"],
    images: ["/images/p6.jpg", "/images/g1.jpg", "/images/g4.jpg"],
    featured: false,
    agentSlug: "camille-reyes",
  },
  {
    slug: "nasugbu-beach-lot",
    title: "Nasugbu Beach Lot",
    location: "Nasugbu, Batangas",
    city: "Batangas",
    type: "Lot",
    price: 6500000,
    beds: 0,
    baths: 0,
    sqm: 800,
    lot: "800 sqm lot",
    year: 2024,
    description:
      "A clean, titled beachfront lot facing west — ready for a weekend house, with road access and utilities already at the boundary.",
    features: ["Titled lot", "Beachfront", "Road access", "Utilities at boundary"],
    images: ["/images/p8.jpg", "/images/p5.jpg", "/images/p4.jpg"],
    featured: false,
    agentSlug: "miguel-torres",
  },
  {
    slug: "clark-commercial-space",
    title: "Clark Commercial Space",
    location: "Clark Freeport, Pampanga",
    city: "Pampanga",
    type: "Commercial",
    price: 48000000,
    beds: 0,
    baths: 0,
    sqm: 520,
    year: 2016,
    description:
      "A free-standing commercial building with a clear-span floor plate, loading access and parking for 12 — suited to showrooms, clinics or offices.",
    features: ["Clear-span floor plate", "Loading bay access", "12 parking slots", "PEZA-ready zone"],
    images: ["/images/p7.jpg", "/images/g5.jpg", "/images/g2.jpg"],
    featured: false,
    agentSlug: "daniel-santos",
  },
];

export const CITIES = Array.from(
  new Set(PROPERTIES.map((property) => property.city))
);

export function getProperty(slug: string): Property | undefined {
  return PROPERTIES.find((property) => property.slug === slug);
}
