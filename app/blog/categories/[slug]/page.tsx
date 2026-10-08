import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PostCard } from "@/components/PostCard";
import { formatDate } from "@/lib/format";
import { getCategories, getPostsByCategory } from "@/lib/posts";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getCategories().map((category) => ({ slug: category.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategories().find((item) => item.slug === slug);
  if (!category) return {};
  return pageMetadata({
    title: category.name,
    description: `Articles filed under ${category.name} on No More Forever Chemicals.`,
    path: `/blog/categories/${category.slug}`,
  });
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategories().find((item) => item.slug === slug);
  if (!category) notFound();
  const posts = getPostsByCategory(slug);
  const updated = posts.reduce((max, post) => (post.updated > max ? post.updated : max), posts[0]?.updated ?? "");

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Breadcrumbs
        items={[
          { name: "Blog", href: "/blog" },
          { name: category.name, href: `/blog/categories/${category.slug}` },
        ]}
      />
      <h1 className="mt-4 font-display text-4xl text-forest sm:text-5xl">{category.name}</h1>
      <p className="mt-3 text-sm text-muted">
        Last updated <time dateTime={updated}>{formatDate(updated)}</time>
      </p>
      <nav className="mt-6 flex flex-wrap gap-2" aria-label="Blog categories">
        <Link href="/blog" className="rounded-full border border-line px-3 py-1.5 text-sm">
          All posts
        </Link>
        <span className="rounded-full bg-forest px-3 py-1.5 text-sm text-cream">{category.name}</span>
      </nav>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
