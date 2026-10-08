import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Disclosure } from "@/components/Disclosure";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { Markdown } from "@/components/Markdown";
import { NEWSLETTER_URL } from "@/lib/constants";
import { formatDate, readingMinutes } from "@/lib/format";
import { categorySlug, getAllPosts, getPost } from "@/lib/posts";
import { blogPostingJsonLd } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/post/${post.slug}`,
    image: post.cover,
    type: "article",
  });
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const minutes = readingMinutes(post.body);
  const crumbs = [
    { name: "Blog", href: "/blog" },
    ...(post.category
      ? [{ name: post.category, href: `/blog/categories/${categorySlug(post.category)}` }]
      : []),
    { name: post.title, href: `/post/${post.slug}` },
  ];

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={crumbs} />
      <header className="mt-5">
        {post.category ? (
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">
            <Link href={`/blog/categories/${categorySlug(post.category)}`}>{post.category}</Link>
          </p>
        ) : null}
        <h1 className="mt-2 font-display text-4xl leading-tight text-forest sm:text-5xl">{post.title}</h1>
        <p className="mt-4 text-sm text-muted">
          {post.author}
          {" · "}
          <time dateTime={post.date}>Published {formatDate(post.date)}</time>
          {" · "}
          <time dateTime={post.updated}>Last updated {formatDate(post.updated)}</time>
          {" · "}
          {minutes} min read
        </p>
      </header>

      {post.cover ? (
        <Image
          src={post.cover}
          alt=""
          width={1200}
          height={675}
          priority
          className="mt-6 aspect-[16/9] w-full rounded-3xl object-cover"
        />
      ) : null}

      {post.hasAffiliateLinks ? <Disclosure className="mt-6 rounded-2xl bg-beige p-4" /> : null}

      {post.takeaways.length ? (
        <section className="mt-6 rounded-3xl border border-line bg-white p-5">
          <h2 className="font-display text-2xl text-forest">Key takeaways</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-muted">
            {post.takeaways.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="mt-8">
        <Markdown source={post.body} />
      </div>

      <FaqList faqs={post.faqs} title="Questions from this guide" />

      <aside className="mt-10 rounded-3xl bg-beige p-5">
        <h2 className="font-display text-2xl text-forest">Keep reading</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          The product directory links out to Amazon. The newsletter is optional.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/non-toxic-products" className="btn-primary">
            Non-toxic products
          </Link>
          <Link href="/blog" className="btn-secondary">
            All guides
          </Link>
          <a href={NEWSLETTER_URL} className="btn-secondary" target="_blank" rel="noopener noreferrer">
            Newsletter
          </a>
        </div>
      </aside>
      <JsonLd data={blogPostingJsonLd(post)} />
    </article>
  );
}
