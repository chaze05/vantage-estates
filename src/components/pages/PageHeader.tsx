import Link from "next/link";

type Crumb = { label: string; href?: string };

export function PageHeader({
  eyebrow,
  title,
  lede,
  crumbs,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: string;
  crumbs: Crumb[];
}) {
  return (
    <section className="border-b border-line bg-white">
      <div className="mx-auto w-full max-w-page px-5 pb-12 pt-10">
        <nav aria-label="Breadcrumb" className="text-[10px] uppercase tracking-[0.18em] text-muted">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="transition-colors hover:text-ink">
                Home
              </Link>
            </li>
            {crumbs.map((crumb, index) => (
              <li key={`${crumb.label}-${index}`} className="flex items-center gap-2">
                <span aria-hidden="true" className="text-line">/</span>
                {crumb.href ? (
                  <Link href={crumb.href} className="transition-colors hover:text-ink">
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-ink/70">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <p className="mt-7 text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald">
          {eyebrow}
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-[clamp(2.2rem,4.6vw,3.6rem)] font-semibold leading-[1.06] text-navy">
          {title}
        </h1>
        {lede ? <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">{lede}</p> : null}
      </div>
    </section>
  );
}
