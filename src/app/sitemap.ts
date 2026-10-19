import type { MetadataRoute } from "next";
import { PROPERTIES } from "@/data/properties";

const BASE = "https://vantage-estates-two.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/listings", "/agents", "/contact"];
  return [
    ...routes.map((route) => ({
      url: BASE + route,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...PROPERTIES.map((property) => ({
      url: `${BASE}/properties/${property.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
