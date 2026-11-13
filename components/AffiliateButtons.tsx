import { buyUrl } from "@/lib/amazon";
import { directOfferForProduct, SPONSORED_REL } from "@/lib/brandAffiliates";
import type { Product } from "@/lib/products";

export function AffiliateButtons({
  product,
  fallback = false,
  stacked = false,
}: {
  product: Product;
  /** When there is no brand link, still render the Amazon button. Product pages use this. Cards do not. */
  fallback?: boolean;
  stacked?: boolean;
}) {
  const direct = directOfferForProduct(product);
  if (!direct && !fallback) return null;

  const unavailable = product.availability === "unavailable";
  const amazonLabel = direct
    ? "Also on Amazon"
    : product.asin
      ? unavailable
        ? "Check on Amazon"
        : "Buy on Amazon"
      : "View the list on Amazon";
  const width = stacked ? "w-full" : "";

  return (
    <div className={stacked ? "flex flex-col gap-2" : "flex flex-wrap gap-3"}>
      {direct ? (
        <a
          href={direct.href}
          className={`btn-primary ${width}`}
          target="_blank"
          rel={SPONSORED_REL}
        >
          Buy direct from {direct.label}
        </a>
      ) : null}
      <a
        href={buyUrl(product)}
        className={`${direct ? "btn-secondary" : "btn-primary"} ${width}`}
        target="_blank"
        rel={SPONSORED_REL}
      >
        {amazonLabel}
      </a>
    </div>
  );
}
