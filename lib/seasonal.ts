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
