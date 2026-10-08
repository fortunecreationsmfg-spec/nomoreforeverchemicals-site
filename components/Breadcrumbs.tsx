import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/schema";

export function Breadcrumbs({ items }: { items: { name: string; href: string }[] }) {
  const all = [{ name: "Home", href: "/" }, ...items];

  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
          {all.map((item, index) => {
            const last = index === all.length - 1;
            return (
              <li key={`${item.href}-${item.name}`} className="flex items-center gap-2">
                {index > 0 ? <span aria-hidden="true">/</span> : null}
                {last ? (
                  <span className="text-forest">{item.name}</span>
                ) : (
                  <Link href={item.href} className="underline-offset-4 hover:underline">
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(all)} />
    </>
  );
}
