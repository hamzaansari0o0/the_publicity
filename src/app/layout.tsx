import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Phudu } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/data/site";
import { siteSchema } from "@/lib/schema";
import { defaultTitle, homeDescription } from "@/lib/seo";
import "./globals.css";

const phudu = Phudu({
  subsets: ["latin"],
  variable: "--font-phudu",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: defaultTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: homeDescription,
  applicationName: siteConfig.name,
  keywords: [
    "marketing agency Lahore",
    "flyer printing Lahore",
    "newsletter printing",
    "flex and standee printing",
    "QR code marketing",
    "social media marketing",
    "print and digital marketing",
  ],
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: defaultTitle,
    description: homeDescription,
    locale: "en_PK",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: homeDescription,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${phudu.variable} ${instrumentSans.variable}`}>
      <body className="flex min-h-dvh flex-col bg-page font-sans text-fg antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brand-button focus:text-white focus:px-5 focus:py-3 focus:font-heading focus:font-bold focus:uppercase"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <JsonLd data={siteSchema()} />
      </body>
    </html>
  );
}
