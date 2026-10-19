"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { m } from "framer-motion";
import { CITIES, PROPERTY_TYPES } from "@/data/properties";
import { Reveal } from "@/components/ui/Reveal";

const BUDGETS = [
  { label: "Any budget", value: "" },
  { label: "Up to ₱10M", value: "10000000" },
  { label: "Up to ₱20M", value: "20000000" },
  { label: "Up to ₱30M", value: "30000000" },
  { label: "Up to ₱50M", value: "50000000" },
];

const selectClasses =
  "w-full rounded-xl border border-line bg-white px-3 py-3 text-sm text-ink focus:border-emerald focus:outline-none";

export function SearchHero() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (type) params.set("type", type);
    if (maxPrice) params.set("maxPrice", maxPrice);
    router.push(`/listings${params.size ? `?${params.toString()}` : ""}`);
  };

  return (
    <section className="relative overflow-hidden bg-paper">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[520px] bg-gradient-to-b from-emerald-soft/70 to-transparent"
      />
      <div className="relative mx-auto grid w-full max-w-page items-center gap-14 px-5 pb-16 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24 lg:pt-20">
        <div>
          <m.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald"
          >
            Philippine property marketplace
          </m.p>
          <m.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 font-display text-[clamp(2.6rem,5.6vw,4.4rem)] font-semibold leading-[1.04] text-navy"
          >
            Find your <span className="text-emerald">vantage.</span>
          </m.h1>
          <m.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-lg text-base leading-relaxed text-muted"
          >
            Condos, house-and-lot, townhouses, lots and commercial spaces across
            the Philippines — with real prices, real sizes and advisors who
            answer.
          </m.p>

          <m.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 rounded-2xl border border-line bg-white p-4 shadow-[0_30px_60px_-45px_rgba(11,18,32,0.55)]"
          >
            <div className="grid gap-3 sm:grid-cols-[1fr_1fr_1fr_auto]">
              <label className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                Location
                <select
                  aria-label="Location"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  className={`${selectClasses} mt-1`}
                >
                  <option value="">All locations</option>
                  {CITIES.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                Property type
                <select
                  aria-label="Property type"
                  value={type}
                  onChange={(event) => setType(event.target.value)}
                  className={`${selectClasses} mt-1`}
                >
                  <option value="">Any type</option>
                  {PROPERTY_TYPES.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                Budget
                <select
                  aria-label="Budget"
                  value={maxPrice}
                  onChange={(event) => setMaxPrice(event.target.value)}
                  className={`${selectClasses} mt-1`}
                >
                  {BUDGETS.map((budget) => (
                    <option key={budget.label} value={budget.value}>
                      {budget.label}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="submit"
                className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl bg-emerald px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald/90 sm:mt-[22px]"
              >
                Search
              </button>
            </div>
          </m.form>

          <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-muted">
            <span><strong className="font-display text-base text-navy">8</strong> curated listings</span>
            <span><strong className="font-display text-base text-navy">8</strong> cities</span>
            <span><strong className="font-display text-base text-navy">4</strong> advisors</span>
          </div>
        </div>

        <Reveal delay={150} className="relative hidden lg:block">
          <div className="relative ml-auto aspect-[4/5] w-full max-w-[440px] overflow-hidden rounded-3xl border border-line">
            <Image
              src="/images/p2.jpg"
              alt="Modern Philippine home with a pool"
              fill
              quality={60}
              sizes="440px"
              className="object-cover"
            />
          </div>
          <div className="absolute -left-6 bottom-10 w-56 overflow-hidden rounded-2xl border border-line bg-white p-3 shadow-[0_24px_50px_-30px_rgba(11,18,32,0.5)]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src="/images/g1.jpg"
                alt="Warm modern interior"
                fill
                quality={60}
                sizes="224px"
                className="object-cover"
              />
            </div>
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald">
              8 handpicked listings
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
