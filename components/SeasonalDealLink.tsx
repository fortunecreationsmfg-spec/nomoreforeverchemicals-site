"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BLACK_FRIDAY_PATH, showBlackFridayLink } from "@/lib/seasonal";

export function SeasonalDealLink({
  className = "",
  children = "Black Friday deals",
  onClick,
  asParagraph = false,
}: {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  asParagraph?: boolean;
}) {
  const [visible, setVisible] = useState(() => showBlackFridayLink());

  useEffect(() => {
    // A page built before December 1 still ships the link. Recheck on the client so it drops off that day.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- date gate has to run after hydration
    setVisible(showBlackFridayLink());
  }, []);

  if (!visible) return null;

  const link = (
    <Link href={BLACK_FRIDAY_PATH} className={className} onClick={onClick}>
      {children}
    </Link>
  );

  return asParagraph ? <p>{link}</p> : link;
}

export function SeasonalDealBanner() {
  const [visible, setVisible] = useState(() => showBlackFridayLink());

  useEffect(() => {
    // A page built before December 1 still ships the note. Recheck on the client so it drops off that day.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- date gate has to run after hydration
    setVisible(showBlackFridayLink());
  }, []);

  if (!visible) return null;

  return (
    <aside className="mt-6 rounded-2xl bg-peach px-4 py-3 text-sm leading-6">
      Black Friday is Friday, November 27, 2026.{" "}
      <Link href={BLACK_FRIDAY_PATH} className="font-semibold underline decoration-teal underline-offset-4">
        PFAS-free Black Friday deals
      </Link>{" "}
      lists the offers that were checked on brand sites, and it leaves the rest as &quot;Check today&apos;s price.&quot;
    </aside>
  );
}
