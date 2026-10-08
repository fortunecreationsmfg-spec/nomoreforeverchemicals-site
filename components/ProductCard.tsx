import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const unavailable = product.availability === "unavailable";

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white">
      <Link href={`/products/${product.slug}`} className="block bg-beige">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.imageAlt || product.name}
            width={640}
            height={640}
            className="aspect-square w-full object-contain"
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          />
        ) : (
          <div className="flex aspect-square items-center justify-center px-6 text-center text-sm text-muted">
            No product photo in the original catalog
          </div>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{product.category}</p>
        <h3 className="mt-1 font-display text-xl leading-tight text-forest">
          <Link href={`/products/${product.slug}`}>{product.name}</Link>
        </h3>
        {product.brand ? <p className="mt-1 text-sm text-muted">{product.brand}</p> : null}
        {unavailable ? (
          <p className="mt-3 inline-flex w-fit rounded-full bg-peach px-2.5 py-1 text-xs font-semibold text-forest">
            Currently unavailable
          </p>
        ) : null}
        <Link href={`/products/${product.slug}`} className="mt-4 text-sm font-semibold text-forest underline decoration-teal underline-offset-4">
          View details
        </Link>
      </div>
    </article>
  );
}
