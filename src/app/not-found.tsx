import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70svh] items-center bg-navy-deep text-white">
      <div className="mx-auto w-full max-w-page px-5 py-24 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald">
          404 — Page not found
        </p>
        <h1 className="mt-4 font-display text-5xl font-semibold sm:text-6xl">
          Wrong turn.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm text-white/65">
          That page has moved or never existed. Let&apos;s get you back to the
          listings.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/listings"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-emerald px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald/90"
          >
            Browse listings
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/25 px-6 py-3 text-sm font-semibold transition-colors hover:border-emerald/70"
          >
            Back home
          </Link>
        </div>
      </div>
    </section>
  );
}
