import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Onest } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { JsonLd } from "@/components/JsonLd";
import { SiteShell } from "@/components/SiteShell";
import { BRAND, CONTACT_EMAIL, DEFAULT_OG_IMAGE, LEGAL_NAME, SITE_URL } from "@/lib/constants";
import { organizationJsonLd } from "@/lib/schema";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const body = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "PFAS Awareness & Solutions | No More Forever Chemicals",
    template: `%s | ${BRAND}`,
  },
  description:
    "Protect your family from PFAS. Guides to forever chemicals, plus a directory of cookware, water filters, and other products that link to Amazon.",
  applicationName: BRAND,
  authors: [{ name: LEGAL_NAME, url: SITE_URL }],
  openGraph: {
    title: "PFAS Awareness & Solutions | No More Forever Chemicals",
    description:
      "Protect your family from PFAS. Guides to forever chemicals and a directory of products that link to Amazon.",
    url: SITE_URL,
    siteName: BRAND,
    locale: "en_US",
    type: "website",
    images: [{ url: DEFAULT_OG_IMAGE, alt: BRAND }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PFAS Awareness & Solutions | No More Forever Chemicals",
    description:
      "Protect your family from PFAS. Guides to forever chemicals and a directory of products that link to Amazon.",
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: {
    canonical: SITE_URL,
    types: {
      "application/rss+xml": "/blog-feed.xml",
      "text/markdown": "/index.md",
    },
  },
  other: {
    "contact:email": CONTACT_EMAIL,
  },
};

export const viewport: Viewport = {
  themeColor: "#1A2E26",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-cream font-sans text-forest">
        <JsonLd data={organizationJsonLd()} />
        <SiteShell>{children}</SiteShell>
        <Analytics />
      </body>
    </html>
  );
}
