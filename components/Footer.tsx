import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { Disclosure } from "@/components/Disclosure";
import {
  BRAND,
  CONTACT_EMAIL,
  LEGAL_NAME,
  NAV,
  NEWSLETTER_URL,
  PINTEREST_URL,
  TAGLINE,
} from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-forest text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5 font-display text-xl">
            <BrandMark />
            {BRAND}
          </div>
          <p className="mt-3 max-w-sm text-sm leading-6 text-sage">{TAGLINE}</p>
          <Disclosure className="mt-4 text-sage" />
        </div>

        <div className="text-sm leading-7">
          <p className="font-semibold text-cream">Explore</p>
          {NAV.map((item) => (
            <p key={item.href}>
              <Link href={item.href} className="text-sage underline-offset-4 hover:text-white hover:underline">
                {item.label}
              </Link>
            </p>
          ))}
        </div>

        <div className="text-sm leading-7">
          <p className="font-semibold text-cream">Contact</p>
          <p className="text-sage">{LEGAL_NAME}</p>
          <p>
            <a className="text-sage underline-offset-4 hover:text-white hover:underline" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
          </p>
          <p>
            <a className="text-sage underline-offset-4 hover:text-white hover:underline" href={NEWSLETTER_URL} target="_blank" rel="noopener noreferrer">
              Newsletter
            </a>
          </p>
          <p>
            <a className="inline-flex items-center gap-2 text-sage underline-offset-4 hover:text-white hover:underline" href={PINTEREST_URL} target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.42 7.63 11.17-.1-.95-.2-2.4.04-3.44.22-.94 1.4-5.98 1.4-5.98s-.36-.72-.36-1.78c0-1.66.97-2.9 2.17-2.9 1.02 0 1.52.77 1.52 1.69 0 1.03-.66 2.57-.99 4-.28 1.2.6 2.17 1.78 2.17 2.13 0 3.77-2.25 3.77-5.49 0-2.87-2.06-4.88-5.01-4.88-3.41 0-5.41 2.56-5.41 5.2 0 1.03.4 2.13.89 2.73.1.12.11.22.08.34l-.33 1.36c-.05.22-.18.27-.4.16-1.5-.7-2.44-2.89-2.44-4.65 0-3.79 2.75-7.27 7.93-7.27 4.16 0 7.4 2.97 7.4 6.93 0 4.14-2.61 7.46-6.23 7.46-1.22 0-2.36-.63-2.75-1.38l-.75 2.85c-.27 1.04-1 2.35-1.49 3.15A12 12 0 0 0 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0z" />
              </svg>
              Pinterest
            </a>
          </p>
          <p>
            <Link href="/llms.txt" className="text-sage underline-offset-4 hover:text-white hover:underline">
              llms.txt
            </Link>
          </p>
          <p>
            <Link href="/products.json" className="text-sage underline-offset-4 hover:text-white hover:underline">
              Product feed
            </Link>
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-5 text-sm text-sage sm:px-6">
          <p>© 2026 No More Forever Chemicals. All rights reserved.</p>
          <p>{LEGAL_NAME}</p>
        </div>
      </div>
    </footer>
  );
}
