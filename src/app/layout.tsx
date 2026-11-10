import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Phudu } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { siteConfig } from "@/data/site";
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

const defaultTitle = `${siteConfig.name} | Your Phygital marketing partner in ${siteConfig.city}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: defaultTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
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
    description: siteConfig.description,
    locale: "en_PK",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

/** Structured data so search engines understand the business. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  logo: `${siteConfig.url}/images/logo.png`,
  image: `${siteConfig.url}/opengraph-image.jpg`,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  areaServed: siteConfig.city,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.city,
    addressCountry: "PK",
  },
  makesOffer: [
    "Newsletters",
    "Pamphlets & Flyers",
    "Flex & Standees",
    "Social Media Marketing",
  ].map((name) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name },
  })),
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
