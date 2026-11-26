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

/** Required generate_lead fields: currency (ISO 4217) and value (number). */
export const AXON_LEAD_PARAMS = { currency: "USD", value: 1 } as const;

/** Once per browser-tab visit, so a refresh is not a second lead. */
export const AXON_LEAD_STORAGE_KEY = "nmfc-axon-generate-lead";

type AxonFn = {
  (command: "init"): void;
  (command: "init", params: { historyObserver: false }): void;
  (command: "track", eventName: "page_view"): void;
  (command: "track", eventName: "generate_lead", params: { currency: string; value: number }): void;
};

declare global {
  interface Window {
    axon?: AxonFn;
  }
}

export function trackPageView(): void {
  window.axon?.("track", "page_view");
}

export function trackGenerateLead(): void {
  window.axon?.("track", "generate_lead", {
    currency: AXON_LEAD_PARAMS.currency,
    value: AXON_LEAD_PARAMS.value,
  });
}
