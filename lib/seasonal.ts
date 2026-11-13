/** Black Friday 2026 is Friday, November 27. Homepage, nav, and post links hide when December 1 begins in New York. The page itself stays up. */
export const BLACK_FRIDAY_PATH = "/black-friday-pfas-free-deals";
export const BLACK_FRIDAY_LINK_HIDES_AT = "2026-12-01T05:00:00.000Z";

export const BLACK_FRIDAY_POSTS = [
  "do-water-filters-remove-pfas-best-pfas-water-filters",
  "does-bottled-water-contain-pfas-spring-vs-purified",
  "the-no-more-forever-chemicals-newsletter",
  "best-pfas-free-cookware-nonstick-pan-alternatives-compared",
  "do-air-fryers-contain-pfas-pfas-free-air-fryer-options",
] as const;

export function showBlackFridayLink(now = new Date()): boolean {
  return now.getTime() < Date.parse(BLACK_FRIDAY_LINK_HIDES_AT);
}

export function isBlackFridayPost(slug: string): boolean {
  return (BLACK_FRIDAY_POSTS as readonly string[]).includes(slug);
}

/**
 * Site banner cutoff. November 30, 2026 is standard time in America/Denver (MST, UTC−7),
 * so 11:59 PM that night is 06:59 UTC on December 1. The banner stays up through that
 * minute and turns off at December 1, 12:00 AM Denver.
 * Cyber Monday is the Denver calendar day of November 30.
 */
export const ANNOUNCEMENT_ENDS_AT = "2026-12-01T07:00:00.000Z";
export const CYBER_MONDAY_STARTS_AT = "2026-11-30T07:00:00.000Z";
export const ANNOUNCEMENT_DISMISS_KEY = "nmfc-deals-banner";

export const BLACK_FRIDAY_BANNER_TEXT =
  "PFAS-Free Black Friday Deals are live: see this week's verified sales";
export const CYBER_MONDAY_BANNER_TEXT = "Cyber Monday: PFAS-Free deals end tonight";

export type AnnouncementPhase = "black-friday" | "cyber-monday" | "off";

export function announcementPhase(now = new Date()): AnnouncementPhase {
  const time = now.getTime();
  if (time >= Date.parse(ANNOUNCEMENT_ENDS_AT)) return "off";
  if (time >= Date.parse(CYBER_MONDAY_STARTS_AT)) return "cyber-monday";
  return "black-friday";
}

/** Runs before paint so a dismissed or expired banner does not take layout space. */
export function announcementBootScript(): string {
  const end = Date.parse(ANNOUNCEMENT_ENDS_AT);
  const cyber = Date.parse(CYBER_MONDAY_STARTS_AT);
  const key = JSON.stringify(ANNOUNCEMENT_DISMISS_KEY);
  return `(function(){try{var n=Date.now();var phase=n>=${end}?"off":n>=${cyber}?"cyber-monday":"black-friday";if(phase!=="off"){try{if(localStorage.getItem(${key})==="1")phase="off";}catch(e){}}document.documentElement.setAttribute("data-deals-banner",phase);}catch(e){}})();`;
}
