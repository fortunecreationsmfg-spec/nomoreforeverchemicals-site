import { AMAZON_TAG } from "@/lib/constants";

/**
 * These listings were unavailable. The buy button searches by the catalog
 * name instead of opening the dead product page. The ASIN stays on the product.
 */
const UNAVAILABLE_LISTING_ASINS = new Set([
  "B0CZ5T6L64", // Tease Tea Infuser Tumbler
  "B0B4BPZHMM", // Truvani Organic Deodorant
]);

export function amazonSearchUrl(query: string): string {
  const url = new URL("https://www.amazon.com/s");
  url.searchParams.set("k", query);
  url.searchParams.set("tag", AMAZON_TAG);
  return url.toString();
}

export function withAmazonTag(href: string): string {
  try {
    const url = new URL(href);
    const host = url.hostname.replace(/^www\./, "");
    if (host === "amazon.com" || host.endsWith(".amazon.com")) {
      url.searchParams.set("tag", AMAZON_TAG);
      return url.toString();
    }
  } catch {
    return href;
  }
  return href;
}

export function buyUrl(product: { asin: string | null; listUrl: string | null; name?: string }): string {
  if (product.asin && product.name && UNAVAILABLE_LISTING_ASINS.has(product.asin)) {
    return amazonSearchUrl(product.name);
  }
  if (product.asin) {
    return `https://www.amazon.com/dp/${product.asin}?tag=${AMAZON_TAG}`;
  }
  if (product.listUrl) {
    const url = new URL(product.listUrl);
    url.searchParams.set("tag", AMAZON_TAG);
    return url.toString();
  }
  return `https://www.amazon.com/?tag=${AMAZON_TAG}`;
}
