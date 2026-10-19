import type { Metadata } from "next";
import { SearchHero } from "@/components/home/SearchHero";
import {
  FeaturedProperties,
  LocationsStrip,
  HowItWorks,
  CtaBand,
} from "@/components/home/HomeSections";

export const metadata: Metadata = {
  title: "Vantage Estates — Find your vantage",
  description:
    "Browse condos, house-and-lot, townhouses, lots and commercial spaces across the Philippines.",
};

export default function HomePage() {
  return (
    <>
      <SearchHero />
      <FeaturedProperties />
      <LocationsStrip />
      <HowItWorks />
      <CtaBand />
    </>
  );
}
