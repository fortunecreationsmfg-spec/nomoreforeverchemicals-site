import Link from "next/link";
import { AffiliateButtons } from "@/components/AffiliateButtons";
import { directOffersInText, SPONSORED_REL } from "@/lib/brandAffiliates";
import { getAllProducts, type Product } from "@/lib/products";

export function PostBrandOffers({ text }: { text: string }) {
  const products = getAllProducts();
  const offers = directOffersInText(text, products);
  if (!offers.length) return null;

  const promosShown = new Set<string>();

  return (
    <aside className="mt-6 rounded-3xl border border-line bg-white p-5">
      <h2 className="font-display text-2xl text-forest">Buy direct from the brand</h2>
      <p className="mt-2 text-sm leading-6 text-muted">
        iSpring and Purewell buttons use our brand affiliate links. Each listing still has its Amazon button.
      </p>
      <div className="mt-4 grid gap-5">
        {offers.map((offer) => {
          const product = offer.productSlug
            ? products.find((item) => item.slug === offer.productSlug) ?? null
            : null;
          const showPromo = Boolean(offer.promo) && !promosShown.has(offer.key);
          if (showPromo) promosShown.add(offer.key);
          return (
            <div key={offer.productSlug ?? offer.key}>
              {product ? (
                <ProductOffer product={product} />
              ) : (
                <a href={offer.href} className="btn-primary" target="_blank" rel={SPONSORED_REL}>
                  Buy direct from {offer.label}
                </a>
              )}
              {showPromo ? <p className="mt-3 text-sm leading-6 text-muted">{offer.promo}</p> : null}
            </div>
          );
        })}
      </div>
    </aside>
  );
}

function ProductOffer({ product }: { product: Product }) {
  return (
    <div>
      <p className="font-semibold">
        <Link href={`/products/${product.slug}`} className="underline decoration-teal underline-offset-4">
          {product.name}
        </Link>
      </p>
      <div className="mt-3">
        <AffiliateButtons product={product} />
      </div>
    </div>
  );
}
