import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { FavoritesProvider } from "@/components/providers/FavoritesProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sora",
  display: "optional",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "optional",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vantage-estates.vercel.app"),
  title: "Vantage Estates — Find your vantage",
  description:
    "Browse condos, house-and-lot, townhouses, lots and commercial spaces across the Philippines.",
  openGraph: {
    title: "Vantage Estates — Find your vantage",
    description:
      "A modern Philippine property marketplace across BGC, Makati, Alabang, Tagaytay, Cebu, Quezon City, Batangas and Pampanga.",
    type: "website",
    locale: "en_PH",
    images: ["/images/p2.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable}`}>
      <body>
        <MotionProvider>
          <FavoritesProvider>
            <a
              href="#main"
              className="sr-only rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100]"
            >
              Skip to content
            </a>
            <Header />
            <main id="main" className="min-h-[60svh]">
              {children}
            </main>
            <Footer />
          </FavoritesProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
