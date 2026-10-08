import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Disclosure } from "@/components/Disclosure";
import { JsonLd } from "@/components/JsonLd";
import { buyUrl } from "@/lib/amazon";
import { SITE_UPDATED } from "@/lib/constants";
import { formatDate } from "@/lib/format";
import { categoryAnchor, getAllProducts, getProduct } from "@/lib/products";
import { productJsonLd } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return pageMetadata({
    title: product.name,
    description: product.description.slice(0, 180),
    path: `/products/${product.slug}`,
    image: product.image,
  });
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const href = buyUrl(product);
  const unavailable = product.availability === "unavailable";

  return (
    <article className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Breadcrumbs
        items={[
          { name: "Non-Toxic Products", href: "/non-toxic-products" },
          { name: product.name, href: `/products/${product.slug}` },
        ]}
      />
      <div className="mt-6 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="overflow-hidden rounded-3xl border border-line bg-beige">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.imageAlt || product.name}
              width={900}
              height={900}
              priority
              className="aspect-square w-full object-contain"
            />
          ) : (
            <div className="flex aspect-square items-center justify-center px-8 text-center text-muted">
              No product photo in the original catalog
            </div>
          )}
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">
            <Link href={`/non-toxic-products#${categoryAnchor(product.category)}`}>{product.category}</Link>
            {product.subcategory ? ` · ${product.subcategory}` : ""}
          </p>
          <h1 className="mt-2 font-display text-4xl leading-tight text-forest">{product.name}</h1>
          <p className="mt-3 text-sm text-muted">
            Last updated <time dateTime={SITE_UPDATED}>{formatDate(SITE_UPDATED)}</time>
          </p>
          <dl className="mt-5 grid gap-2 text-sm">
            <div className="flex gap-3">
              <dt className="w-28 text-muted">Brand</dt>
              <dd>{product.brand ?? "Not listed"}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-28 text-muted">Category</dt>
              <dd>{product.category}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-28 text-muted">{product.asin ? "ASIN" : "Listing"}</dt>
              <dd>{product.asin ?? "Amazon list, not a single ASIN"}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-28 text-muted">Availability</dt>
              <dd>
                {unavailable
                  ? "Currently unavailable on Amazon"
                  : product.asin
                    ? "In stock when last checked"
                    : "Amazon list"}
              </dd>
            </div>
          </dl>
          {unavailable ? (
            <p className="mt-4 rounded-2xl bg-peach px-4 py-3 text-sm leading-6">
              Marked unavailable on Amazon when this catalog was compiled on October 7, 2026. The button still opens Amazon so you can check the live listing.
            </p>
          ) : null}
          {product.labelNote ? <p className="mt-4 text-sm leading-6 text-muted">{product.labelNote}</p> : null}
          <p className="mt-4 leading-7">{product.description}</p>
          <a href={href} className="btn-primary mt-6" target="_blank" rel="sponsored nofollow noopener">
            {product.asin ? (unavailable ? "Check on Amazon" : "Buy on Amazon") : "View the list on Amazon"}
          </a>
          <Disclosure className="mt-4" />
          <p className="mt-2 text-sm text-muted">You check out on Amazon. This site does not take payment.</p>
        </div>
      </div>
      {product.features.length ? (
        <section className="mt-10">
          <h2 className="font-display text-2xl text-forest">Features</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-muted">
            {product.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </section>
      ) : null}
      <JsonLd data={productJsonLd(product)} />
    </article>
  );
}
