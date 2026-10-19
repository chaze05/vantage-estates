"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import { CITIES, PROPERTIES, PROPERTY_TYPES } from "@/data/properties";
import { filterProperties, type SortKey } from "@/lib/filters";
import { useFavorites } from "@/components/providers/FavoritesProvider";
import { PropertyCard } from "@/components/property/PropertyCard";

const SORTS: { label: string; value: SortKey }[] = [
  { label: "Featured first", value: "featured" },
  { label: "Newest", value: "newest" },
  { label: "Price: low to high", value: "price-asc" },
  { label: "Price: high to low", value: "price-desc" },
];

const BUDGETS = [
  { label: "Any price", value: 0 },
  { label: "Up to ₱10M", value: 10000000 },
  { label: "Up to ₱20M", value: 20000000 },
  { label: "Up to ₱30M", value: 30000000 },
  { label: "Up to ₱50M", value: 50000000 },
];

const BEDS = [
  { label: "Any beds", value: 0 },
  { label: "2+ beds", value: 2 },
  { label: "3+ beds", value: 3 },
  { label: "4+ beds", value: 4 },
  { label: "5+ beds", value: 5 },
];

const selectClasses =
  "w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm text-ink focus:border-emerald focus:outline-none";

type InitialFilters = {
  query: string;
  type: string;
  location: string;
  beds: number;
  maxPrice: number;
  sort: SortKey;
  savedOnly: boolean;
};

export function ListingsExplorer({ initial }: { initial: InitialFilters }) {
  const router = useRouter();
  const pathname = usePathname();
  const { favorites } = useFavorites();

  const [query, setQuery] = useState(initial.query);
  const [type, setType] = useState(initial.type);
  const [location, setLocation] = useState(initial.location);
  const [beds, setBeds] = useState(initial.beds);
  const [maxPrice, setMaxPrice] = useState(initial.maxPrice);
  const [sort, setSort] = useState<SortKey>(initial.sort);
  const [savedOnly, setSavedOnly] = useState(initial.savedOnly);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const next = new URLSearchParams();
    if (query) next.set("q", query);
    if (type) next.set("type", type);
    if (location) next.set("location", location);
    if (beds) next.set("beds", String(beds));
    if (maxPrice) next.set("maxPrice", String(maxPrice));
    if (sort !== "featured") next.set("sort", sort);
    if (savedOnly) next.set("saved", "1");
    const qs = next.toString();
    router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
  }, [query, type, location, beds, maxPrice, sort, savedOnly, pathname, router]);

  const results = useMemo(
    () =>
      filterProperties(
        PROPERTIES,
        { query, type, location, beds, maxPrice, saved: savedOnly, sort },
        favorites
      ),
    [query, type, location, beds, maxPrice, savedOnly, sort, favorites]
  );

  const activeCount = [
    query,
    type,
    location,
    beds > 0 ? "beds" : "",
    maxPrice > 0 ? "max" : "",
    savedOnly ? "saved" : "",
  ].filter(Boolean).length;

  const clearAll = () => {
    setQuery("");
    setType("");
    setLocation("");
    setBeds(0);
    setMaxPrice(0);
    setSavedOnly(false);
    setSort("featured");
  };

  const controls = (
    <div className="space-y-5">
      <label className="block">
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
          Search
        </span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="City, property or keyword…"
          className="mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-ink placeholder:text-muted/70 focus:border-emerald focus:outline-none"
        />
      </label>

      <div>
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
          Property type
        </span>
        <div className="mt-2 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setType("")}
            aria-pressed={type === ""}
            className={`min-h-9 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              type === ""
                ? "border-emerald bg-emerald text-white"
                : "border-line bg-white text-ink/70 hover:border-emerald/50"
            }`}
          >
            All
          </button>
          {PROPERTY_TYPES.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setType(item)}
              aria-pressed={type === item}
              className={`min-h-9 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                type === item
                  ? "border-emerald bg-emerald text-white"
                  : "border-line bg-white text-ink/70 hover:border-emerald/50"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
            Location
          </span>
          <select
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            className={`${selectClasses} mt-1.5`}
          >
            <option value="">All locations</option>
            {CITIES.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
            Bedrooms
          </span>
          <select
            value={beds}
            onChange={(event) => setBeds(Number(event.target.value))}
            className={`${selectClasses} mt-1.5`}
          >
            {BEDS.map((item) => (
              <option key={item.label} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block sm:col-span-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
            Budget
          </span>
          <select
            value={maxPrice}
            onChange={(event) => setMaxPrice(Number(event.target.value))}
            className={`${selectClasses} mt-1.5`}
          >
            {BUDGETS.map((budget) => (
              <option key={budget.label} value={budget.value}>
                {budget.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button
        type="button"
        onClick={() => setSavedOnly((value) => !value)}
        aria-pressed={savedOnly}
        className={`inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition-colors ${
          savedOnly
            ? "border-emerald bg-emerald-soft text-emerald"
            : "border-line bg-white text-ink/70 hover:border-emerald/50"
        }`}
      >
        <svg viewBox="0 0 24 24" width="15" height="15" fill={savedOnly ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 20s-7-4.4-7-9.2A3.8 3.8 0 0 1 12 8a3.8 3.8 0 0 1 7 2.8C19 15.6 12 20 12 20Z" />
        </svg>
        Saved only ({favorites.length})
      </button>

      {activeCount > 0 ? (
        <button
          type="button"
          onClick={clearAll}
          className="min-h-9 w-full text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-muted transition-colors hover:text-ink"
        >
          Clear all filters
        </button>
      ) : null}
    </div>
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
      <aside className="hidden lg:block">
        <div className="sticky top-24 rounded-2xl border border-line bg-paper p-5">
          {controls}
        </div>
      </aside>

      <div>
        <h2 className="sr-only">Search results</h2>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted">
            <strong className="font-display text-base text-navy">
              {results.length}
            </strong>{" "}
            {results.length === 1 ? "property" : "properties"}
            {activeCount > 0 ? " matching" : ""}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="inline-flex min-h-10 items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-xs font-semibold text-ink lg:hidden"
            >
              Filters
              {activeCount > 0 ? (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald px-1 text-[10px] text-white">
                  {activeCount}
                </span>
              ) : null}
            </button>
            <select
              aria-label="Sort properties"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortKey)}
              className="min-h-10 rounded-full border border-line bg-white px-4 py-2 text-xs font-semibold text-ink focus:border-emerald focus:outline-none"
            >
              {SORTS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {results.length > 0 ? (
          <m.div layout className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {results.map((property, index) => (
                <PropertyCard key={property.slug} property={property} index={index} />
              ))}
            </AnimatePresence>
          </m.div>
        ) : (
          <div className="mt-6 rounded-2xl border border-line bg-white px-6 py-16 text-center">
            <p className="font-display text-xl font-semibold text-navy">
              No properties match these filters.
            </p>
            <p className="mt-2 text-sm text-muted">
              Try widening the budget or clearing a filter.
            </p>
            <button
              type="button"
              onClick={clearAll}
              className="mt-6 min-h-11 rounded-full bg-emerald px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald/90"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {drawerOpen ? (
          <div className="fixed inset-0 z-[75] lg:hidden">
            <m.button
              type="button"
              aria-label="Close filters"
              onClick={() => setDrawerOpen(false)}
              className="absolute inset-0 bg-navy/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <m.aside
              role="dialog"
              aria-modal="true"
              aria-label="Filters"
              className="absolute right-0 top-0 h-full w-[92%] max-w-sm overflow-y-auto bg-paper p-5"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
            >
              <div className="mb-5 flex items-center justify-between">
                <p className="font-display text-lg font-semibold text-navy">Filters</p>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close filters"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="m6 6 12 12M18 6 6 18" />
                  </svg>
                </button>
              </div>
              {controls}
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-emerald px-6 py-3 text-sm font-semibold text-white"
              >
                Show {results.length} results
              </button>
            </m.aside>
          </div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
