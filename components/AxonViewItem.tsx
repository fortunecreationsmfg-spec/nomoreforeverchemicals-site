"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { trackAxon, viewItemParamsFromElement } from "@/lib/axon";

function cardIsVisible(entry: IntersectionObserverEntry): boolean {
  if (!entry.isIntersecting) return false;
  if (entry.intersectionRatio >= 0.4) return true;
  // A tall card can fill the viewport without reaching a 40% ratio.
  return entry.intersectionRect.height >= 120 && entry.intersectionRect.width >= 80;
}

/**
 * view_item once per product card that scrolls into view.
 * Product directory cards and the Black Friday deal rows opt in with
 * data-axon-view-item. page_view stays on the pixel and AxonPageView.
 */
export function AxonViewItem() {
  const pathname = usePathname();

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-axon-view-item]");
    if (!nodes.length || typeof IntersectionObserver === "undefined") return;

    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!cardIsVisible(entry)) continue;
          const element = entry.target;
          if (!(element instanceof HTMLElement)) continue;
          const params = viewItemParamsFromElement(element);
          const itemId = params?.items?.[0]?.item_id;
          if (!params || !itemId || seen.has(itemId)) {
            observer.unobserve(element);
            continue;
          }
          seen.add(itemId);
          observer.unobserve(element);
          trackAxon("view_item", params);
        }
      },
      { threshold: [0, 0.4] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
