import Link from "next/link";
import { AffiliateButtons } from "@/components/AffiliateButtons";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Disclosure } from "@/components/Disclosure";
import { FaqList } from "@/components/FaqList";
import {
  BLACK_FRIDAY_FAQS,
  DEAL_GROUPS,
  DEAL_GUIDES,
  DEALS_CHECKED,
  DEALS_DESCRIPTION,
  DEALS_INTRO,
  DEALS_PATH,
  DEALS_TITLE,
  type DealRow,
} from "@/lib/blackFriday";
import { isSponsoredHref, SPONSORED_REL, trackBrandUrl } from "@/lib/brandAffiliates";
import { formatDate } from "@/lib/format";
import { getProduct, type Product } from "@/lib/products";
import { pageMetadata } from "@/lib/seo";

function sourceLink(row: DealRow) {
  if (!row.sourceUrl) return null;
  const href = trackBrandUrl(row.sourceUrl);
  return (
    <a
      href={href}
      target="_blank"
      rel={isSponsoredHref(href) ? SPONSORED_REL : "noopener noreferrer"}
      className="underline decoration-teal underline-offset-4"
    >
      {row.sourceLabel ?? "Source"}
    </a>
  );
}

function DealCopy({ row }: { row: DealRow }) {
  return (
    <>
      <p className="text-forest">{row.deal}</p>
      <p className="mt-2 leading-6 text-muted">{row.detail}</p>
      {row.sourceUrl ? <p className="mt-2">{sourceLink(row)}</p> : null}
    </>
  );
}

function rowsWithProducts(rows: DealRow[]) {
  return rows.flatMap((row) =>
    row.slugs.flatMap((slug) => {
      const product = getProduct(slug);
      return product ? [{ row, product }] : [];
    }),
  );
}

function ProductName({ product }: { product: Product }) {
  return (
    <>
      <Link href={`/products/${product.slug}`} className="font-semibold underline decoration-teal underline-offset-4">
        {product.name}
      </Link>
      {product.brand ? <p className="mt-1 text-muted">{product.brand}</p> : null}
    </>
  );
}

function DealCard({ product, row }: { product: Product; row: DealRow }) {
  return (
    <article className="rounded-3xl border border-line bg-white p-4">
      <ProductName product={product} />
      <div className="mt-3 text-sm">
        <DealCopy row={row} />
      </div>
      <div className="mt-4">
        <AffiliateButtons product={product} fallback stacked />
      </div>
    </article>
  );
}

export const metadata = pageMetadata({
  title: DEALS_TITLE,
  description: DEALS_DESCRIPTION,
  path: DEALS_PATH,
});

export default function BlackFridayDealsPage() {
  return (
    <article className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ name: DEALS_TITLE, href: DEALS_PATH }]} />
      <header className="mt-4 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">Holiday shopping 2026</p>
        <h1 className="mt-2 font-display text-4xl leading-tight text-forest sm:text-5xl">{DEALS_TITLE}</h1>
        <p className="mt-3 text-sm text-muted">
          Checked <time dateTime={DEALS_CHECKED}>{formatDate(DEALS_CHECKED)}</time>. Prices change. Check the store.
        </p>
        <div className="mt-4 space-y-3 leading-7 text-muted">
          {DEALS_INTRO.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
        <Disclosure className="mt-4" />
      </header>

      <nav className="mt-8" aria-label="Related guides">
        <h2 className="font-display text-2xl text-forest">Start with the guides</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {DEAL_GUIDES.map((guide) => (
            <li key={guide.href}>
              <Link href={guide.href} className="inline-flex rounded-full border border-line px-3 py-1.5 text-sm">
                {guide.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {DEAL_GROUPS.map((group) => {
        const items = rowsWithProducts(group.rows);
        return (
          <section key={group.category} className="mt-12">
            <h2 className="font-display text-3xl text-forest">{group.category}</h2>
            <div className="mt-4 grid gap-4 md:hidden">
              {items.map(({ row, product }) => (
                <DealCard key={product.slug} product={product} row={row} />
              ))}
            </div>
            <div className="mt-4 hidden overflow-x-auto rounded-3xl border border-line bg-white md:block">
              <table className="w-full min-w-[52rem] border-collapse text-left text-sm">
                <thead className="bg-beige text-forest">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Product
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Deal
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Shop
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(({ row, product }) => (
                    <tr key={product.slug} className="border-t border-line align-top">
                      <th scope="row" className="px-4 py-4 font-normal">
                        <ProductName product={product} />
                      </th>
                      <td className="px-4 py-4">
                        <DealCopy row={row} />
                      </td>
                      <td className="px-4 py-4">
                        <AffiliateButtons product={product} fallback stacked />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        );
      })}

      <p className="mt-8 max-w-3xl text-sm leading-6 text-muted">
        The rest of the directory is in{" "}
        <Link href="/non-toxic-products" className="underline decoration-teal underline-offset-4">
          non-toxic products
        </Link>
        . Those rows are omitted here because a current discount was not checked for them. Open the listing and check today&apos;s price.
      </p>

      <FaqList faqs={BLACK_FRIDAY_FAQS} title="Questions about these deals" />
    </article>
  );
}
