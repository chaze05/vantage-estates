"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { parseFavorites, toggleFavorite } from "@/lib/favorites";

const STORAGE_KEY = "vantage.favorites.v1";

type FavoritesContextValue = {
  favorites: string[];
  has: (slug: string) => boolean;
  toggle: (slug: string) => void;
  count: number;
  hydrated: boolean;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      setFavorites(parseFavorites(window.localStorage.getItem(STORAGE_KEY)));
    } catch {
      setFavorites([]);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      /* storage unavailable */
    }
  }, [favorites, hydrated]);

  const toggle = useCallback((slug: string) => {
    setFavorites((current) => toggleFavorite(current, slug));
  }, []);

  const has = useCallback(
    (slug: string) => favorites.includes(slug),
    [favorites]
  );

  const value = useMemo(
    () => ({ favorites, has, toggle, count: favorites.length, hydrated }),
    [favorites, has, toggle, hydrated]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites(): FavoritesContextValue {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return context;
}
