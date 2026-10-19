import type { Property } from "@/data/properties";

export type SortKey = "featured" | "newest" | "price-asc" | "price-desc";

export type PropertyFilters = {
  query?: string;
  type?: string;
  location?: string;
  beds?: number;
  maxPrice?: number;
  saved?: boolean;
  sort?: SortKey;
};

export function filterProperties(
  list: Property[],
  filters: PropertyFilters,
  savedSlugs: string[]
): Property[] {
  const query = (filters.query ?? "").trim().toLowerCase();

  const result = list.filter((property) => {
    if (
      query &&
      ![property.title, property.location, property.city, property.type, property.description]
        .some((field) => field.toLowerCase().includes(query))
    ) {
      return false;
    }
    if (filters.type && property.type !== filters.type) return false;
    if (filters.location && property.city !== filters.location) return false;
    if (filters.beds && property.beds < filters.beds) return false;
    if (filters.maxPrice && property.price > filters.maxPrice) return false;
    if (filters.saved && !savedSlugs.includes(property.slug)) return false;
    return true;
  });

  switch (filters.sort) {
    case "price-asc":
      return [...result].sort((a, b) => a.price - b.price);
    case "price-desc":
      return [...result].sort((a, b) => b.price - a.price);
    case "newest":
      return [...result].sort((a, b) => b.year - a.year);
    default:
      return result;
  }
}
