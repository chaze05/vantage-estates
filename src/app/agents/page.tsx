import type { Metadata } from "next";
import Link from "next/link";
import { AGENTS } from "@/data/agents";
import { PageHeader } from "@/components/pages/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/home/HomeSections";

export const metadata: Metadata = {
  title: "Agents — Vantage Estates",
  description:
    "Meet the Vantage Estates advisors covering BGC, Makati, Alabang, Tagaytay, Cebu and Clark.",
};

export default function AgentsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our team"
        title={
          <>
            Advisors who know their <span className="text-emerald">cities</span>
          </>
        }
        lede="Four advisors, each covering the neighbourhoods they actually live and work in."
        crumbs={[{ label: "Agents" }]}
      />

      <section className="py-12 sm:py-16">
        <div className="mx-auto w-full max-w-page px-5">
          <div className="grid gap-5 sm:grid-cols-2">
            {AGENTS.map((agent, index) => (
              <Reveal key={agent.slug} delay={index * 70}>
                <article className="h-full rounded-2xl border border-line bg-white p-6">
                  <div className="flex items-center gap-4">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald text-lg font-semibold text-white">
                      {agent.initials}
                    </span>
                    <div>
                      <h2 className="font-display text-lg font-semibold text-navy">
                        {agent.name}
                      </h2>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                        {agent.role}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-muted">{agent.areas}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <a
                      href={`mailto:${agent.email}`}
                      className="min-h-10 rounded-full border border-line px-4 py-2 text-xs font-semibold text-ink transition-colors hover:border-emerald/50 hover:text-emerald"
                    >
                      Email
                    </a>
                    <a
                      href={`tel:${agent.phone.replace(/\s/g, "")}`}
                      className="min-h-10 rounded-full border border-line px-4 py-2 text-xs font-semibold text-ink transition-colors hover:border-emerald/50 hover:text-emerald"
                    >
                      {agent.phone}
                    </a>
                    <Link
                      href="/listings"
                      className="min-h-10 rounded-full bg-navy px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-navy-deep"
                    >
                      View listings
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
