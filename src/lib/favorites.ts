export function parseFavorites(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const favorites: string[] = [];
    for (const item of parsed) {
      if (typeof item === "string" && item && !favorites.includes(item)) {
        favorites.push(item);
      }
    }
    return favorites;
  } catch {
    return [];
  }
}

export function toggleFavorite(list: string[], slug: string): string[] {
  return list.includes(slug)
    ? list.filter((item) => item !== slug)
    : [...list, slug];
}
