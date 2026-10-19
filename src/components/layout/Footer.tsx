import Link from "next/link";
import { SITE } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-navy-deep text-white">
      <div className="mx-auto w-full max-w-page px-5 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald font-display text-sm font-bold text-white">
                V
              </span>
              <span className="font-display text-sm font-semibold uppercase tracking-[0.18em]">
                Vantage <span className="text-emerald-light">Estates</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">
              {SITE.description}
            </p>
            <p className="mt-6 font-display text-sm uppercase tracking-[0.24em] text-emerald-light">
              {SITE.tagline}
            </p>
          </div>

          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/70">
              Explore
            </h3>
            <ul className="mt-5 flex flex-col gap-3 text-sm text-white/70">
              <li><Link className="transition-colors hover:text-emerald" href="/listings">All listings</Link></li>
              <li><Link className="transition-colors hover:text-emerald" href="/listings?saved=1">Saved homes</Link></li>
              <li><Link className="transition-colors hover:text-emerald" href="/agents">Our agents</Link></li>
              <li><Link className="transition-colors hover:text-emerald" href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/70">
              Visit
            </h3>
            <ul className="mt-5 flex flex-col gap-3 text-sm text-white/70">
              <li>{SITE.address}</li>
              <li><a className="transition-colors hover:text-emerald" href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a></li>
              <li><a className="transition-colors hover:text-emerald" href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li className="text-white/65">{SITE.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {SITE.name}. All rights reserved.</p>
          <p className="uppercase tracking-[0.22em]">BGC · Makati · Cebu · Tagaytay</p>
        </div>
      </div>
    </footer>
  );
}
