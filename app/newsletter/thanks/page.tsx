import type { Metadata } from "next";
import Link from "next/link";
import { AxonGenerateLead } from "@/components/AxonGenerateLead";
import { BRAND, DEFAULT_OG_IMAGE } from "@/lib/constants";
import { BLACK_FRIDAY_PATH } from "@/lib/seasonal";

const title = "Thanks for subscribing";
const description = "Thanks for subscribing to the No More Forever Chemicals newsletter.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: false, follow: true },
  alternates: { canonical: "/newsletter/thanks" },
  openGraph: {
    title,
    description,
    url: "/newsletter/thanks",
    siteName: BRAND,
    locale: "en_US",
    type: "website",
    images: [{ url: DEFAULT_OG_IMAGE, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function NewsletterThanksPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center sm:py-20">
      <AxonGenerateLead />
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">Newsletter</p>
      <h1 className="mt-3 font-display text-4xl text-forest">Thanks for subscribing</h1>
      <p className="mt-4 leading-7 text-muted">Check your inbox for the next note from No More Forever Chemicals.</p>
      <div className="mt-8">
        <Link href={BLACK_FRIDAY_PATH} className="btn-primary">
          See the Black Friday deals
        </Link>
      </div>
    </div>
  );
}
