import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Disclosure } from "@/components/Disclosure";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { ProductCard } from "@/components/ProductCard";
import { RichText } from "@/components/RichText";
import { SITE_UPDATED } from "@/lib/constants";
import { CATALOG_FAQS, CATALOG_INTRO } from "@/lib/copy";
import { formatDate } from "@/lib/format";
import { categoryAnchor, getAllProducts, productsByCategory } from "@/lib/products";
import { itemListJsonLd } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Non-Toxic Products",
  description:
    "PFAS-conscious cookware, water filters, personal care, food storage, and cleaning products. Each item links to Amazon, where you check out.",
  path: "/non-toxic-products",
});

export default function CatalogPage() {
  const groups = productsByCategory();
  const products = getAllProducts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ name: "Non-Toxic Products", href: "/non-toxic-products" }]} />
      <header id="Hero" className="mt-4 max-w-3xl">
        <h1 className="font-display text-4xl text-forest sm:text-5xl">Non-toxic products</h1>
        <p className="mt-3 text-lg text-muted">Shop safer. Live healthier.</p>
        <div className="mt-4 space-y-3 leading-7 text-muted">
          {CATALOG_INTRO.map((paragraph) => (
            <RichText key={paragraph.slice(0, 32)} text={paragraph} />
          ))}
        </div>
        <p className="mt-3 text-sm text-muted">
          Last updated <time dateTime={SITE_UPDATED}>{formatDate(SITE_UPDATED)}</time>
        </p>
        <Disclosure className="mt-4" />
      </header>

      <nav className="mt-8 flex flex-wrap gap-2" aria-label="Product categories">
        {groups.map((group) => (
          <a key={group.category} href={`#${categoryAnchor(group.category)}`} className="rounded-full border border-line px-3 py-1.5 text-sm">
            {group.category}
          </a>
        ))}
      </nav>

      {groups.map((group) => (
        <section key={group.category} id={categoryAnchor(group.category)} className="mt-12 scroll-mt-24">
          <h2 className="font-display text-3xl text-forest">{group.category}</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {group.products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>
      ))}

      <FaqList faqs={CATALOG_FAQS} />
      <JsonLd data={itemListJsonLd(products)} />
    </div>
  );
}
