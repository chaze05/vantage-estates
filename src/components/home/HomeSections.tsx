import Link from "next/link";
import { CITIES, PROPERTIES } from "@/data/properties";
import { PropertyCard } from "@/components/property/PropertyCard";
import { Reveal } from "@/components/ui/Reveal";

export function FeaturedProperties() {
  const featured = PROPERTIES.filter((property) => property.featured).slice(0, 4);

  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto w-full max-w-page px-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald">
              Featured
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-navy sm:text-4xl">
              Handpicked this month
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <Link
              href="/listings"
              className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald transition-opacity hover:opacity-80"
            >
              View all listings →
            </Link>
          </Reveal>
        </div>

        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((property, index) => (
            <PropertyCard key={property.slug} property={property} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function LocationsStrip() {
  return (
    <section className="border-y border-line bg-white py-12">
      <div className="mx-auto w-full max-w-page px-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="mr-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
            Browse by city
          </span>
          {CITIES.map((city) => (
            <Link
              key={city}
              href={`/listings?location=${encodeURIComponent(city)}`}
              className="min-h-10 rounded-full border border-line px-4 py-2 text-xs font-semibold text-ink transition-colors hover:border-emerald/50 hover:text-emerald"
            >
              {city}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps = [
    {
      title: "Browse honestly",
      text: "Every listing shows the real price, size and status — no teaser pricing.",
    },
    {
      title: "Tour with an advisor",
      text: "Book a viewing in-site or online; our advisors cover their own cities.",
    },
    {
      title: "Close with clarity",
      text: "Documentation, dues and handover handled with one point of contact.",
    },
  ];

  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto w-full max-w-page px-5">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald">
            How it works
          </p>
          <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold text-navy sm:text-4xl">
            Three steps, no runaround.
          </h2>
        </Reveal>
        <div className="mt-9 grid gap-5 sm:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 80}>
              <div className="h-full rounded-2xl border border-line bg-white p-6">
                <span className="font-display text-2xl font-semibold text-emerald/60">
                  0{index + 1}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold text-navy">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="pb-20 sm:pb-24">
      <div className="mx-auto w-full max-w-page px-5">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-navy px-6 py-14 text-center text-white sm:px-16">
            <div aria-hidden="true" className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-emerald/30 blur-[90px]" />
            <div aria-hidden="true" className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-emerald/20 blur-[90px]" />
            <p className="relative text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald">
              Selling or leasing?
            </p>
            <h2 className="relative mt-4 font-display text-3xl font-semibold sm:text-4xl">
              Let&apos;s put your property in front of the right people.
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-sm text-white/70">
              Tell us about the property and we&apos;ll come back with a pricing
              opinion, photos plan and listing timeline.
            </p>
            <div className="relative mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-emerald px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald/90"
              >
                List your property
              </Link>
              <Link
                href="/listings"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-emerald/70"
              >
                Browse listings
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
