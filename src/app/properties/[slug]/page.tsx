import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROPERTIES, getProperty } from "@/data/properties";
import { getAgent } from "@/data/agents";
import { formatPeso } from "@/lib/format";
import { PageHeader } from "@/components/pages/PageHeader";
import { PropertyGallery } from "@/components/property/PropertyGallery";
import { InquiryForm } from "@/components/property/InquiryForm";
import { PropertyCard } from "@/components/property/PropertyCard";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PROPERTIES.map((property) => ({ slug: property.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) return { title: "Property not found — Vantage Estates" };
  return {
    title: `${property.title} — Vantage Estates`,
    description: property.description,
    openGraph: {
      title: `${property.title} — ${formatPeso(property.price)}`,
      description: property.description,
      images: [property.images[0]],
    },
  };
}

export default async function PropertyPage({ params }: PageProps) {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) notFound();

  const agent = getAgent(property.agentSlug);
  const similar = PROPERTIES.filter(
    (item) => item.slug !== property.slug && (item.city === property.city || item.type === property.type)
  ).slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow={property.type}
        title={property.title}
        lede={property.location}
        crumbs={[{ label: "Listings", href: "/listings" }, { label: property.title }]}
      />

      <section className="py-10 sm:py-14">
        <div className="mx-auto w-full max-w-page px-5">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <PropertyGallery images={property.images} title={property.title} />

            <aside className="h-fit rounded-2xl border border-line bg-white p-6 lg:sticky lg:top-24">
              <p className="font-display text-3xl font-semibold text-emerald">
                {formatPeso(property.price)}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted">
                {property.type} · {property.year}
              </p>

              <dl className="mt-5 grid grid-cols-2 gap-3 border-y border-line py-4 text-sm">
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.16em] text-muted">Bedrooms</dt>
                  <dd className="mt-1 font-display text-lg text-navy">{property.beds || "—"}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.16em] text-muted">Bathrooms</dt>
                  <dd className="mt-1 font-display text-lg text-navy">{property.baths || "—"}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.16em] text-muted">Floor area</dt>
                  <dd className="mt-1 font-display text-lg text-navy">{property.sqm} sqm</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.16em] text-muted">Lot</dt>
                  <dd className="mt-1 font-display text-lg text-navy">{property.lot ?? "—"}</dd>
                </div>
              </dl>

              {agent ? (
                <div className="mt-5 flex items-center gap-3 rounded-xl bg-paper p-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald font-display text-sm font-semibold text-white">
                    {agent.initials}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-navy">{agent.name}</p>
                    <p className="text-[10px] uppercase tracking-[0.14em] text-muted">{agent.areas}</p>
                  </div>
                </div>
              ) : null}

              <Link
                href={`mailto:${agent?.email ?? "hello@vantageestates.ph"}?subject=${encodeURIComponent(property.title)}`}
                className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-deep"
              >
                Email the advisor
              </Link>
            </aside>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h2 className="font-display text-2xl font-semibold text-navy">About this property</h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                {property.description}
              </p>
              <h3 className="mt-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
                Features
              </h3>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {property.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-ink/75">
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-0.5 shrink-0 text-emerald">
                      <path d="m5 12 5 5L20 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="h-fit rounded-2xl border border-line bg-paper p-6">
              <h3 className="font-display text-xl font-semibold text-navy">Arrange a viewing</h3>
              <p className="mt-1 text-sm text-muted">We reply within one business day.</p>
              <div className="mt-4">
                <InquiryForm fixedInterest={property.title} compact />
              </div>
            </div>
          </div>

          {similar.length > 0 ? (
            <div className="mt-16">
              <h2 className="font-display text-2xl font-semibold text-navy">Similar properties</h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {similar.map((item, index) => (
                  <PropertyCard key={item.slug} property={item} index={index} />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
