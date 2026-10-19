import type { Metadata } from "next";
import { PageHeader } from "@/components/pages/PageHeader";
import { ListingsExplorer } from "@/components/listings/ListingsExplorer";
import type { SortKey } from "@/lib/filters";

export const metadata: Metadata = {
  title: "Listings — Vantage Estates",
  description:
    "Search condos, house-and-lot, townhouses, lots and commercial properties across the Philippines.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const get = (key: string) => {
    const value = params[key];
    return (Array.isArray(value) ? value[0] : value) ?? "";
  };

  const initial = {
    query: get("q"),
    type: get("type"),
    location: get("location"),
    beds: Number(get("beds") || 0),
    maxPrice: Number(get("maxPrice") || 0),
    sort: (get("sort") as SortKey) || "featured",
    savedOnly: get("saved") === "1",
  };

  return (
    <>
      <PageHeader
        eyebrow="Listings"
        title={
          <>
            Properties for every <span className="text-emerald">vantage</span>
          </>
        }
        lede="Filter by city, type, bedrooms and budget — everything shown at its real price and size."
        crumbs={[{ label: "Listings" }]}
      />
      <section className="py-10 sm:py-14">
        <div className="mx-auto w-full max-w-page px-5">
          <ListingsExplorer initial={initial} />
        </div>
      </section>
    </>
  );
}
