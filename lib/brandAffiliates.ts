/**
 * Brand affiliate programs.
 *
 * iSpring and Purewell are approved. AquaTru and AirDoctor stay off until
 * those applications are approved — set `enabled` to true to turn a brand on.
 * While a brand is disabled, product pages keep the existing Amazon link only.
 *
 * Deep links:
 * - iSpring: add `ref=JERAMIAHFORTUNE` (`?` or `&`, via URLSearchParams).
 * - Purewell: PartnerBoost `url=` set to the purewell.com destination.
 * - AquaTru / AirDoctor: homepage fallback until a tracking template exists.
 *   Paste that template into `buildDeepLink` when the program approves it.
 *   Add a product path under `products` to deep-link a catalog item.
 */

export const SPONSORED_REL = "sponsored nofollow noopener";

const ISPRING_REF = "JERAMIAHFORTUNE";
const ISPRING_HOME = "https://www.ispringfilter.com/";
const PUREWELL_HOME = "https://purewell.com";
const PUREWELL_TRACK =
  "https://app.partnerboost.com/track/804aqeaHwmho3g1nLU9otFVbhEBOF7PDkl25DNAlSOm_bt_bUf9M43PUMW84tGHudJkd2W35zRCm9r8D68XioA";

export type BrandProductLink = {
  /** Absolute URL on the brand site. The builder adds tracking. */
  url: string;
  /** Case-insensitive phrases that mean this catalog item is the one in a post. */
  hints: string[];
};

export type BrandAffiliate = {
  key: string;
  label: string;
  enabled: boolean;
  aliases: string[];
  baseUrl: string;
  /** Full note for product pages and posts. */
  promo: string | null;
  /** One line for product cards. */
  cardNote: string | null;
  products: Record<string, BrandProductLink>;
  buildDeepLink: (destination?: string) => string;
};

export type DirectOffer = {
  key: string;
  label: string;
  href: string;
  promo: string | null;
  cardNote: string | null;
};

export type TextOffer = DirectOffer & {
  productSlug: string | null;
};

function withIspringRef(destination?: string): string {
  const url = new URL(destination || ISPRING_HOME);
  url.searchParams.set("ref", ISPRING_REF);
  return url.toString();
}

function withPurewellTrack(destination?: string): string {
  let target = destination || PUREWELL_HOME;
  try {
    const existing = new URL(target);
    const host = existing.hostname.replace(/^www\./, "");
    if (host === "app.partnerboost.com") return target;
    // The approved homepage link is https://purewell.com with no trailing slash.
    if (host === "purewell.com" && (existing.pathname === "/" || existing.pathname === "") && !existing.search) {
      target = PUREWELL_HOME;
    }
  } catch {
    // Fall through and wrap the raw destination.
  }
  const url = new URL(PUREWELL_TRACK);
  url.searchParams.set("url", target);
  return url.toString();
}

function plainBrandUrl(baseUrl: string, destination?: string): string {
  return destination || baseUrl;
}

export const brandAffiliates: Record<string, BrandAffiliate> = {
  ispring: {
    key: "ispring",
    label: "iSpring",
    enabled: true,
    aliases: ["iSpring", "ispring"],
    baseUrl: ISPRING_HOME,
    cardNote: "New customers: 10% off a first system with code REFISPRING.",
    promo:
      "New customers can take 10% off a first iSpring filtration system with code REFISPRING. It requires a new-customer account, works on one order, and cannot be combined with other promotions. iSpring's site, checked November 13, 2026, also runs a holiday sale through November 30, 2026: $60 off orders of $300 or more, $120 off orders of $600 or more, and $200 off orders of $1,000 or more, plus 30-day price protection. Prices change. Check the store.",
    products: {
      "under-sink-reverse-osmosis-filter": {
        url: "https://www.ispringfilter.com/products/ispring-6-stage-75-gpd-high-capacity-under-sink-reverse-osmosis-drinking-water-filter-system-with-alkaline-remineralization",
        hints: ["RCC7AK", "B005LJ8EXU", "under-sink-reverse-osmosis-filter"],
      },
      "whole-house-sediment-filter": {
        url: "https://www.ispringfilter.com/products/ispring-pfas-reducing-whole-house-water-filter-system-also-removes-chlorine-sediment-rust-and-odor-sgs-tested-reducing-up-to-99-of-pfas-1-inletoutlet-model-wgb22b-pf",
        hints: ["WGB22B", "B0FXC4K927", "whole-house-sediment-filter"],
      },
    },
    buildDeepLink: withIspringRef,
  },
  purewell: {
    key: "purewell",
    label: "Purewell",
    enabled: true,
    aliases: ["Purewell", "purewell"],
    baseUrl: PUREWELL_HOME,
    cardNote: "Offers through December 31, 2026 are on Purewell's site. No code is published here.",
    promo:
      "Through December 31, 2026, Purewell offers 20% off Purewell Home countertop filtration systems, 15% off a first order for new customers, and $60 off orders of $300 or more. The offers are on Purewell's site. This site does not publish a code. On November 13, 2026, purewell.com showed no Black Friday banner, and the SF Series product page was marked 0% off. Prices change. Check the store.",
    products: {
      "countertop-gravity-filter": {
        url: "https://www.purewell.com/en-us/products/sf-series-countertop-gravity-water-filter-system-2-25-gallons-us",
        hints: ["SF-CT-2.25G", "B0GG8N1JN6", "countertop-gravity-filter"],
      },
    },
    buildDeepLink: withPurewellTrack,
  },
  // Application pending. `enabled: true` is the switch that adds buttons.
  aquatru: {
    key: "aquatru",
    label: "AquaTru",
    enabled: false,
    aliases: ["AquaTru", "AQUA TRU", "aquatru"],
    baseUrl: "https://aquatru.com/",
    promo: null,
    cardNote: null,
    products: {},
    buildDeepLink: (destination?: string) => plainBrandUrl("https://aquatru.com/", destination),
  },
  // Application pending. `enabled: true` is the switch that adds buttons.
  airdoctor: {
    key: "airdoctor",
    label: "AirDoctor",
    enabled: false,
    aliases: ["AirDoctor", "AIRDOCTOR", "air doctor"],
    baseUrl: "https://airdoctor.com/",
    promo: null,
    cardNote: null,
    products: {},
    buildDeepLink: (destination?: string) => plainBrandUrl("https://airdoctor.com/", destination),
  },
};

function compact(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function findBrandAffiliate(brandName: string | null): BrandAffiliate | null {
  if (!brandName) return null;
  const token = compact(brandName);
  return (
    Object.values(brandAffiliates).find(
      (brand) =>
        compact(brand.key) === token ||
        compact(brand.label) === token ||
        brand.aliases.some((alias) => compact(alias) === token),
    ) ?? null
  );
}

export function directOfferForProduct(product: { slug: string; brand: string | null }): DirectOffer | null {
  const brand = findBrandAffiliate(product.brand);
  if (!brand?.enabled) return null;
  const specific = brand.products[product.slug];
  return {
    key: brand.key,
    label: brand.label,
    href: brand.buildDeepLink(specific?.url ?? brand.baseUrl),
    promo: brand.promo,
    cardNote: brand.cardNote,
  };
}

function mentionsBrand(text: string, brand: BrandAffiliate): boolean {
  return brand.aliases.some((alias) => new RegExp(`\\b${escapeRegex(alias)}\\b`, "i").test(text));
}

function productMentioned(
  text: string,
  product: { slug: string; asin: string | null },
  brand: BrandAffiliate,
): boolean {
  const haystack = text.toLowerCase();
  if (haystack.includes(`/products/${product.slug}`)) return true;
  if (product.asin && text.includes(product.asin)) return true;
  const hints = brand.products[product.slug]?.hints ?? [];
  return hints.some((hint) => haystack.includes(hint.toLowerCase()));
}

export function directOffersInText(
  text: string,
  products: { slug: string; brand: string | null; asin: string | null }[],
): TextOffer[] {
  const offers: TextOffer[] = [];
  for (const brand of Object.values(brandAffiliates)) {
    if (!brand.enabled || !mentionsBrand(text, brand)) continue;
    const matched = products.filter(
      (product) => findBrandAffiliate(product.brand)?.key === brand.key && productMentioned(text, product, brand),
    );
    if (!matched.length) {
      offers.push({
        key: brand.key,
        label: brand.label,
        href: brand.buildDeepLink(brand.baseUrl),
        promo: brand.promo,
        cardNote: brand.cardNote,
        productSlug: null,
      });
      continue;
    }
    for (const product of matched) {
      const offer = directOfferForProduct(product);
      if (offer) offers.push({ ...offer, productSlug: product.slug });
    }
  }
  return offers;
}

export function trackBrandUrl(href: string): string {
  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return href;
  }
  const host = url.hostname.replace(/^www\./, "");
  if (host === "ispringfilter.com") {
    return brandAffiliates.ispring.enabled ? withIspringRef(url.toString()) : href;
  }
  if (host === "purewell.com") {
    return brandAffiliates.purewell.enabled ? withPurewellTrack(url.toString()) : href;
  }
  return href;
}

export function isSponsoredHref(href: string): boolean {
  return /amazon\.com|amzn\.to|ispringfilter\.com|purewell\.com|partnerboost\.com/i.test(href);
}
