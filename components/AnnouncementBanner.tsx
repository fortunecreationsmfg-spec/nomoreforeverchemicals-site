"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import {
  ANNOUNCEMENT_DISMISS_KEY,
  ANNOUNCEMENT_ENDS_AT,
  BLACK_FRIDAY_BANNER_TEXT,
  BLACK_FRIDAY_PATH,
  CYBER_MONDAY_BANNER_TEXT,
  CYBER_MONDAY_STARTS_AT,
  type AnnouncementPhase,
} from "@/lib/seasonal";

const MAX_TIMEOUT = 2_147_483_647;

function readDismissed(): boolean {
  try {
    return localStorage.getItem(ANNOUNCEMENT_DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}

function dismissAnnouncement() {
  try {
    localStorage.setItem(ANNOUNCEMENT_DISMISS_KEY, "1");
  } catch {
    // Private mode can block storage. Closing still applies for this page view.
  }
  document.documentElement.setAttribute("data-deals-banner", "off");
}

export function AnnouncementBanner({ phase }: { phase: Exclude<AnnouncementPhase, "off"> }) {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    const timers: number[] = [];

    const applyPhase = () => {
      const now = Date.now();
      const next =
        readDismissed() || now >= Date.parse(ANNOUNCEMENT_ENDS_AT)
          ? "off"
          : now >= Date.parse(CYBER_MONDAY_STARTS_AT)
            ? "cyber-monday"
            : "black-friday";
      document.documentElement.setAttribute("data-deals-banner", next);
    };

    const schedule = (at: number) => {
      if (cancelled) return;
      const delay = at - Date.now();
      if (delay <= 0) {
        applyPhase();
        return;
      }
      const id = window.setTimeout(() => schedule(at), Math.min(delay, MAX_TIMEOUT));
      timers.push(id);
    };

    schedule(Date.parse(CYBER_MONDAY_STARTS_AT));
    schedule(Date.parse(ANNOUNCEMENT_ENDS_AT));

    const onStorage = (event: StorageEvent) => {
      if (event.key === ANNOUNCEMENT_DISMISS_KEY && event.newValue === "1") dismissAnnouncement();
    };
    window.addEventListener("storage", onStorage);

    return () => {
      cancelled = true;
      for (const id of timers) window.clearTimeout(id);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  if (pathname === BLACK_FRIDAY_PATH) return null;

  return (
    <div className="deals-banner bg-forest text-cream" data-phase={phase} role="region" aria-label="Announcement">
      <div className="mx-auto flex min-h-[3.25rem] max-w-6xl items-center gap-2 px-4 sm:px-6">
        <Link
          href={BLACK_FRIDAY_PATH}
          prefetch={false}
          className="min-w-0 flex-1 py-2 text-center text-sm font-medium leading-5 text-cream underline decoration-teal decoration-2 underline-offset-2 hover:text-white visited:text-cream"
        >
          <span className="banner-copy-default">{BLACK_FRIDAY_BANNER_TEXT}</span>
          <span className="banner-copy-cyber">{CYBER_MONDAY_BANNER_TEXT}</span>
        </Link>
        <button
          type="button"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-cream hover:bg-white/10"
          aria-label="Dismiss announcement"
          onClick={dismissAnnouncement}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            <path
              d="M4.2 4.2 11.8 11.8M11.8 4.2 4.2 11.8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
