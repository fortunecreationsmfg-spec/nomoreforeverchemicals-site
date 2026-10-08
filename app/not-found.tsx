import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <Breadcrumbs items={[{ name: "Page not found", href: "/404" }]} />
      <p className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-teal">404</p>
      <h1 className="mt-3 font-display text-4xl text-forest">Page not found</h1>
      <p className="mt-4 text-muted">That address is not on No More Forever Chemicals.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">
          Back home
        </Link>
        <Link href="/blog" className="btn-secondary">
          Read the blog
        </Link>
        <Link href="/non-toxic-products" className="btn-secondary">
          Browse products
        </Link>
      </div>
    </div>
  );
}
