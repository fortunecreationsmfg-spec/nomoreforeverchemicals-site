"use client";

import { useEffect } from "react";
import { isNewsletterSignupHref, trackNewsletterClickLead } from "@/lib/axon";

/**
 * Signup finishes on Beehiiv, which opens in a new tab. Record generate_lead
 * in this click, before that tab opens, at most once per tab session.
 */
export function AxonNewsletterClick() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      const node = event.target;
      if (!(node instanceof Element)) return;
      const anchor = node.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (!isNewsletterSignupHref(anchor.href, window.location.href)) return;
      trackNewsletterClickLead();
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
