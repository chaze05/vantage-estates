import type { Metadata } from "next";
import { PageHeader } from "@/components/pages/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { InquiryForm } from "@/components/property/InquiryForm";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact — Vantage Estates",
  description:
    "Talk to Vantage Estates about buying, selling or leasing property in the Philippines.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Let&apos;s find your <span className="text-emerald">vantage</span>
          </>
        }
        lede="Buying, selling or just exploring — tell us what you have in mind and an advisor will reply within one business day."
        crumbs={[{ label: "Contact" }]}
      />

      <section className="py-12 sm:py-16">
        <div className="mx-auto grid w-full max-w-page gap-10 px-5 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div className="rounded-2xl border border-line bg-white p-6 sm:p-8">
              <h2 className="font-display text-2xl font-semibold text-navy">
                Send us a message
              </h2>
              <InquiryForm />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="space-y-4">
              <div className="rounded-2xl border border-line bg-paper p-6">
                <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
                  Visit
                </h3>
                <p className="mt-2 text-sm text-ink/75">{SITE.address}</p>
                <h3 className="mt-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
                  Talk to us
                </h3>
                <p className="mt-2 text-sm">
                  <a className="text-ink/75 transition-colors hover:text-emerald" href={`tel:${SITE.phone.replace(/\s/g, "")}`}>
                    {SITE.phone}
                  </a>
                  <span className="mx-2 text-line">·</span>
                  <a className="text-ink/75 transition-colors hover:text-emerald" href={`mailto:${SITE.email}`}>
                    {SITE.email}
                  </a>
                </p>
                <h3 className="mt-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
                  Hours
                </h3>
                <p className="mt-2 text-sm text-ink/75">{SITE.hours}</p>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-line bg-navy-deep p-6 text-white">
                <div aria-hidden="true" className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald/30 blur-[70px]" />
                <p className="relative font-display text-lg font-semibold">
                  Visiting the office?
                </p>
                <p className="relative mt-2 text-sm text-white/70">
                  We&apos;re on the 12th floor of One Ayala East Tower — steps
                  from the MRT and Ayala Museum.
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative mt-4 inline-flex min-h-10 items-center justify-center rounded-full border border-white/25 px-4 py-2 text-xs font-semibold transition-colors hover:border-emerald/70"
                >
                  Get directions
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
