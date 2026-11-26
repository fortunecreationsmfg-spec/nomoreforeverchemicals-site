"use client";

import { useEffect } from "react";
import { AXON_LEAD_STORAGE_KEY, trackGenerateLead } from "@/lib/axon";

let leadSent = false;

/**
 * Direct visits still send generate_lead once per tab.
 * Beehiiv does not redirect subscribers here, so signup clicks are tracked separately.
 */
export function AxonGenerateLead() {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (leadSent) return;
      try {
        if (sessionStorage.getItem(AXON_LEAD_STORAGE_KEY) === "1") {
          leadSent = true;
          return;
        }
        sessionStorage.setItem(AXON_LEAD_STORAGE_KEY, "1");
      } catch {
        // Storage can be blocked. The module flag still limits this page load.
      }
      leadSent = true;
      trackGenerateLead();
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
