import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PostCard } from "@/components/PostCard";
import { formatDate } from "@/lib/format";
import { getAllPosts, getCategories } from "@/lib/posts";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Blog",
  description:
    "Guides on PFAS health risks, water filters, and how to remove forever chemicals from your home.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getCategories();
  const updated = posts.reduce((max, post) => (post.updated > max ? post.updated : max), posts[0]?.updated ?? "");

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ name: "Blog", href: "/blog" }]} />
      <h1 className="mt-4 font-display text-4xl text-forest sm:text-5xl">Blog</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
        Guides on forever chemicals, health research, and practical swaps for a home with fewer PFAS sources.
      </p>
      <p className="mt-3 text-sm text-muted">
        Last updated <time dateTime={updated}>{formatDate(updated)}</time>
      </p>
      <nav className="mt-6 flex flex-wrap gap-2" aria-label="Blog categories">
        <Link href="/blog" className="rounded-full bg-forest px-3 py-1.5 text-sm text-cream" aria-current="page">
          All posts
        </Link>
        {categories.map((category) => (
          <Link key={category.slug} href={`/blog/categories/${category.slug}`} className="rounded-full border border-line px-3 py-1.5 text-sm">
            {category.name}
          </Link>
        ))}
      </nav>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
