import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";
import { AUTHOR_NAME } from "@/lib/constants";
import { slugify } from "@/lib/format";
import { deriveTakeaways, extractFaqs, type Faq } from "@/lib/takeaways";

export type Post = {
  slug: string;
  title: string;
  date: string;
  updated: string;
  excerpt: string;
  category: string | null;
  cover: string | null;
  author: string;
  body: string;
  takeaways: string[];
  faqs: Faq[];
  hasAffiliateLinks: boolean;
};

export type Category = {
  name: string;
  slug: string;
  count: number;
};

function readPost(file: string): Post {
  const raw = fs.readFileSync(path.join(process.cwd(), "content/posts", file), "utf8");
  const parsed = matter(raw);
  const body = parsed.content.trim();
  const frontmatterTakeaways = Array.isArray(parsed.data.takeaways)
    ? parsed.data.takeaways.map(String).filter(Boolean).slice(0, 4)
    : [];

  return {
    slug: file.replace(/\.mdx$/, ""),
    title: String(parsed.data.title ?? ""),
    date: String(parsed.data.date ?? ""),
    updated: String(parsed.data.updated ?? parsed.data.date ?? ""),
    excerpt: String(parsed.data.excerpt ?? ""),
    category: parsed.data.category ? String(parsed.data.category) : null,
    cover: parsed.data.cover ? String(parsed.data.cover) : null,
    author: AUTHOR_NAME,
    body,
    takeaways: frontmatterTakeaways.length >= 2 ? frontmatterTakeaways : deriveTakeaways(body),
    faqs: extractFaqs(body),
    hasAffiliateLinks: /amazon\.com|amzn\.to/i.test(body),
  };
}

export const getAllPosts = cache((): Post[] => {
  const dir = path.join(process.cwd(), "content/posts");
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map(readPost)
    .sort((a, b) => {
      if (a.date === b.date) return a.slug.localeCompare(b.slug);
      return a.date < b.date ? 1 : -1;
    });
});

export function getPost(slug: string): Post | null {
  return getAllPosts().find((post) => post.slug === slug) ?? null;
}

export function categorySlug(name: string): string {
  return slugify(name);
}

export function getCategories(): Category[] {
  const map = new Map<string, Category>();
  for (const post of getAllPosts()) {
    if (!post.category) continue;
    const slug = categorySlug(post.category);
    const existing = map.get(slug);
    if (existing) existing.count += 1;
    else map.set(slug, { name: post.category, slug, count: 1 });
  }
  return [...map.values()];
}

export function getPostsByCategory(slug: string): Post[] {
  return getAllPosts().filter((post) => post.category && categorySlug(post.category) === slug);
}
