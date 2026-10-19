"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import { useFavorites } from "@/components/providers/FavoritesProvider";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Listings", href: "/listings" },
  { label: "Agents", href: "/agents" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const { count } = useFavorites();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/85 backdrop-blur-xl transition-shadow duration-300 ${
        scrolled ? "border-line shadow-[0_16px_40px_-34px_rgba(11,18,32,0.5)]" : "border-line/70"
      }`}
    >
      <div className="mx-auto flex min-h-[72px] w-full max-w-page items-center justify-between gap-4 px-5">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald font-display text-sm font-bold text-white">
            V
          </span>
          <span className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-navy">
            Vantage <span className="text-emerald">Estates</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {LINKS.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13px] font-medium transition-colors ${
                  active ? "text-emerald" : "text-ink/65 hover:text-navy"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          <Link
            href="/listings?saved=1"
            aria-label={`Saved properties (${count})`}
            className="relative flex h-10 items-center gap-2 rounded-full border border-line px-3.5 text-ink transition-colors hover:border-emerald/50 hover:text-emerald"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 20s-7-4.4-7-9.2A3.8 3.8 0 0 1 12 8a3.8 3.8 0 0 1 7 2.8C19 15.6 12 20 12 20Z" />
            </svg>
            <span className="hidden text-xs font-semibold sm:inline">Saved</span>
            {count > 0 ? (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald px-1 font-display text-[10px] text-white">
                {count}
              </span>
            ) : null}
          </Link>

          <Link
            href="/contact"
            className="hidden min-h-10 items-center justify-center rounded-full bg-navy px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-emerald sm:inline-flex"
          >
            List your property
          </Link>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-line lg:hidden"
          >
            <span className={`h-px w-4 bg-ink transition-transform duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`h-px w-4 bg-ink transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
            <span className={`h-px w-4 bg-ink transition-transform duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <m.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-white lg:hidden"
          >
            <nav aria-label="Mobile" className="mx-auto flex max-w-page flex-col px-5 py-4">
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-line/70 py-3 text-base font-medium text-ink last:border-0"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white"
              >
                List your property
              </Link>
            </nav>
          </m.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
