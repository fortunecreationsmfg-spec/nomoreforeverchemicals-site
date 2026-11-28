import { NEWSLETTER_URL } from "@/lib/constants";

/**
 * AppLovin Axon pixel (native JS).
 * Snippet: https://support.applovin.com/en/growth/promoting-your-websites/track-and-optimize/axon-pixel-native-js
 * Events: https://support.applovin.com/en/growth/promoting-your-websites/track-and-optimize/events-and-objects
 *
 * This event key's pixel config enables autoSpaPageView, which also sends
 * page_view when history.pushState or replaceState runs. Next.js client
 * navigations use that API, and the events guide says to fire page_view on
 * every navigation — including the first load, which the auto listener does
 * not cover. The second init turns the history listener off so a route
 * change is counted once, from AxonPageView.
 */
export const AXON_EVENT_KEY = "b6e79b4e-d22e-40d5-b1b5-38332ecd7c76";

export const AXON_PIXEL_BOOT = `
var AXON_EVENT_KEY=${JSON.stringify(AXON_EVENT_KEY)};
!function(e,r){var t=["https://s.axon.ai/pixel.js"];if(!e.axon){var a=e.axon=function(){a.performOperation?a.performOperation.apply(a,arguments):a.operationQueue.push(arguments)};a.operationQueue=[],a.ts=Date.now(),a.eventKey=AXON_EVENT_KEY;for(var n=r.getElementsByTagName("script")[0],o=0;o<t.length;o++){var i=r.createElement("script");i.async=!0,i.src=t[o],n.parentNode.insertBefore(i,n)}}}(window,document);

axon("init");
axon("init",{historyObserver:false});
`.trim();

/**
 * Required generate_lead fields: currency (ISO 4217) and value (number).
 * https://support.applovin.com/en/growth/promoting-your-websites/track-and-optimize/events-and-objects
 */
export const AXON_LEAD_PARAMS = { currency: "USD", value: 1 } as const;

/** Outbound retailer and affiliate hosts. Match the host or a subdomain, not a lookalike. */
const AFFILIATE_HOSTS = ["amazon.com", "amzn.to", "ispringfilter.com", "partnerboost.com", "purewell.com"] as const;

export type AxonItem = {
  item_id: string;
  item_name?: string;
  item_brand?: string;
  quantity?: number;
};

export type AxonTrackParams = {
  currency?: string;
  value?: number;
  items?: AxonItem[];
};

/** Once per browser-tab visit on /newsletter/thanks, so a refresh is not a second lead. */
export const AXON_LEAD_STORAGE_KEY = "nmfc-axon-generate-lead";

/** Once per tab session for a click that opens the Beehiiv signup. Separate from the thank-you page. */
export const AXON_CLICK_LEAD_STORAGE_KEY = "nmfc-axon-newsletter-click-lead";

const newsletterHost = new URL(NEWSLETTER_URL).hostname;

/** True for the Beehiiv signup URL, including a trailing slash. */
export function isNewsletterSignupHref(href: string, base: string): boolean {
  try {
    const url = new URL(href, base);
    return url.hostname === newsletterHost && (url.pathname === "/" || url.pathname === "");
  } catch {
    return false;
  }
}

let clickLeadSent = false;

/** Call from the click handler, before the browser follows the link. */
export function trackNewsletterClickLead(): void {
  if (clickLeadSent) return;
  try {
    if (sessionStorage.getItem(AXON_CLICK_LEAD_STORAGE_KEY) === "1") {
      clickLeadSent = true;
      return;
    }
    sessionStorage.setItem(AXON_CLICK_LEAD_STORAGE_KEY, "1");
  } catch {
    // Storage can be blocked. The module flag still limits this page load.
  }
  clickLeadSent = true;
  trackGenerateLead();
}

type AxonFn = {
  (command: "init"): void;
  (command: "init", params: { historyObserver: false }): void;
  (command: "track", eventName: "page_view"): void;
  (command: "track", eventName: string, params?: AxonTrackParams): void;
};

declare global {
  interface Window {
    axon?: AxonFn;
  }
}

/**
 * Sends one Axon event. No-ops when the pixel has not loaded or is blocked,
 * and never throws into the caller (a click handler must not delay navigation).
 */
export function trackAxon(event: string, params?: AxonTrackParams): void {
  if (typeof window === "undefined") return;
  try {
    if (params === undefined) window.axon?.("track", event);
    else window.axon?.("track", event, params);
  } catch {
    // A blocked or broken pixel must not surface as a page error.
  }
}

export function trackPageView(): void {
  trackAxon("page_view");
}

export function trackGenerateLead(params: AxonTrackParams = AXON_LEAD_PARAMS): void {
  trackAxon("generate_lead", params);
}

function bareHost(hostname: string): string {
  return hostname.toLowerCase().replace(/^www\./, "");
}

function hostIs(hostname: string, root: string): boolean {
  const host = bareHost(hostname);
  return host === root || host.endsWith(`.${root}`);
}

function parseHttpUrl(href: string, base: string): URL | null {
  try {
    const url = new URL(href, base);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url;
  } catch {
    return null;
  }
}

/** True when rel's token list contains "sponsored". */
export function relHasSponsored(rel: string): boolean {
  return rel.toLowerCase().split(/\s+/).includes("sponsored");
}

export function isKnownAffiliateUrl(href: string, base: string): boolean {
  const url = parseHttpUrl(href, base);
  if (!url) return false;
  return AFFILIATE_HOSTS.some((root) => hostIs(url.hostname, root));
}

/**
 * An outbound shop or affiliate click: external http(s) link to a known
 * retailer/affiliate host, or any external link whose rel contains sponsored.
 */
export function shouldTrackOutboundLead(anchor: { href: string; rel: string }, pageHref: string): boolean {
  const url = parseHttpUrl(anchor.href, pageHref);
  if (!url) return false;
  const page = parseHttpUrl(pageHref, pageHref);
  if (!page || bareHost(url.hostname) === bareHost(page.hostname)) return false;
  return isKnownAffiliateUrl(url.href, pageHref) || relHasSponsored(anchor.rel);
}

const ASIN_PATH = /\/(?:dp|gp\/product|gp\/aw\/d)\/([A-Z0-9]{10})(?:[/?]|$)/i;

function itemIdFromUrl(url: URL): string {
  const asin = url.pathname.match(ASIN_PATH)?.[1];
  if (asin) return asin.toUpperCase();
  const queryAsin = url.searchParams.get("asin");
  if (queryAsin && /^[A-Z0-9]{10}$/i.test(queryAsin)) return queryAsin.toUpperCase();
  const search = url.searchParams.get("k")?.trim();
  if (search) return search.slice(0, 80);
  const last = url.pathname.split("/").filter(Boolean).pop();
  if (last) {
    try {
      return decodeURIComponent(last).slice(0, 80);
    } catch {
      return last.slice(0, 80);
    }
  }
  return bareHost(url.hostname);
}

function brandFromUrl(url: URL): string | undefined {
  if (hostIs(url.hostname, "ispringfilter.com")) return "iSpring";
  if (hostIs(url.hostname, "purewell.com")) return "Purewell";
  if (hostIs(url.hostname, "partnerboost.com")) {
    const destination = url.searchParams.get("url") ?? "";
    if (/purewell\.com/i.test(destination)) return "Purewell";
    if (/ispringfilter\.com/i.test(destination)) return "iSpring";
  }
  return undefined;
}

function cleanText(value: string | null | undefined): string {
  return (value ?? "").replace(/\s+/g, " ").trim();
}

/** generate_lead payload for one outbound anchor. currency and value are required. */
export function leadParamsForAnchor(anchor: HTMLAnchorElement): AxonTrackParams {
  let url: URL | null = null;
  try {
    url = new URL(anchor.href);
  } catch {
    url = null;
  }
  const itemName = (
    cleanText(anchor.getAttribute("data-axon-item-name")) ||
    cleanText(anchor.textContent) ||
    "Product"
  ).slice(0, 160);
  const itemBrand = cleanText(anchor.getAttribute("data-axon-item-brand")) || (url ? brandFromUrl(url) : undefined);
  const itemId =
    cleanText(anchor.getAttribute("data-axon-item-id")) || (url ? itemIdFromUrl(url) : "") || itemName;
  const item: AxonItem = { item_id: itemId, item_name: itemName, quantity: 1 };
  if (itemBrand) item.item_brand = itemBrand;
  return {
    currency: AXON_LEAD_PARAMS.currency,
    value: AXON_LEAD_PARAMS.value,
    items: [item],
  };
}

export function axonItemDataset(product: {
  asin: string | null;
  slug: string;
  name: string;
  brand: string | null;
}): Record<string, string> {
  return {
    "data-axon-item-id": product.asin ?? product.slug,
    "data-axon-item-name": product.name,
    ...(product.brand ? { "data-axon-item-brand": product.brand } : {}),
  };
}

/** view_item payload for a visible product card. Null when the card has no id and name. */
export function viewItemParamsFromElement(element: HTMLElement): AxonTrackParams | null {
  const itemId = cleanText(element.getAttribute("data-axon-item-id"));
  const itemName = cleanText(element.getAttribute("data-axon-item-name"));
  if (!itemId || !itemName) return null;
  const itemBrand = cleanText(element.getAttribute("data-axon-item-brand"));
  const item: AxonItem = { item_id: itemId, item_name: itemName, quantity: 1 };
  if (itemBrand) item.item_brand = itemBrand;
  return { currency: "USD", items: [item] };
}
