"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import type { Property } from "@/data/properties";
import { formatPrice } from "@/lib/format";
import { useFavorites } from "@/components/providers/FavoritesProvider";

export function PropertyCard({
  property,
  index = 0,
}: {
  property: Property;
  index?: number;
}) {
  const { has, toggle } = useFavorites();
  const favorite = has(property.slug);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <m.article
      layout
      initial={mounted ? { opacity: 0, y: 18 } : false}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.18), ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-2xl border border-line bg-white"
    >
      <Link href={`/properties/${property.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            quality={62}
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 92vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute left-3 top-3 rounded-full bg-white/92 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-navy backdrop-blur">
            {property.type}
          </span>
          {property.featured ? (
            <span className="absolute left-3 top-11 rounded-full bg-emerald px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-white">
              Featured
            </span>
          ) : null}
        </div>

        <div className="p-5">
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted">
            {property.location}
          </p>
          <h3 className="mt-1.5 font-display text-lg font-semibold leading-snug text-navy">
            {property.title}
          </h3>
          <p className="mt-2 font-display text-xl font-semibold text-emerald">
            {formatPrice(property.price)}
          </p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
            {property.beds > 0 ? <span>{property.beds} beds</span> : null}
            {property.baths > 0 ? <span>{property.baths} baths</span> : null}
            <span>{property.sqm} sqm</span>
            {property.lot ? <span>{property.lot}</span> : null}
          </div>
        </div>
      </Link>

      <button
        type="button"
        onClick={() => toggle(property.slug)}
        aria-label={favorite ? "Remove from saved" : "Save property"}
        aria-pressed={favorite}
        className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur transition-colors ${
          favorite ? "bg-emerald text-white" : "bg-white/92 text-ink hover:bg-white"
        }`}
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill={favorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 20s-7-4.4-7-9.2A3.8 3.8 0 0 1 12 8a3.8 3.8 0 0 1 7 2.8C19 15.6 12 20 12 20Z" />
        </svg>
      </button>
    </m.article>
  );
}
