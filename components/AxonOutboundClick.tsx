"use client";

import { useEffect } from "react";
import { isNewsletterSignupHref, leadParamsForAnchor, shouldTrackOutboundLead, trackAxon } from "@/lib/axon";

const trackedClicks = new WeakSet<Event>();

/**
 * One generate_lead per outbound retailer or affiliate click.
 * Delegation covers Amazon, iSpring, PartnerBoost, and any other external
 * link with rel="sponsored", including shop buttons rendered later.
 * The handler does not call preventDefault, so the new tab opens immediately.
 */
export function AxonOutboundClick() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (trackedClicks.has(event) || event.defaultPrevented || event.button !== 0) return;
      const node = event.target;
      if (!(node instanceof Element)) return;
      const anchor = node.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (isNewsletterSignupHref(anchor.href, window.location.href)) return;
      if (!shouldTrackOutboundLead(anchor, window.location.href)) return;
      trackedClicks.add(event);
      trackAxon("generate_lead", leadParamsForAnchor(anchor));
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
