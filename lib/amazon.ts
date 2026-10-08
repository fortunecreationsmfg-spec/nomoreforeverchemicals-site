import { AMAZON_TAG } from "@/lib/constants";

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

export function buyUrl(product: { asin: string | null; listUrl: string | null }): string {
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
