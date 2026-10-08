import type { Metadata } from "next";
import { BRAND, DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/constants";

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return new URL(path, SITE_URL).toString();
}

export function markdownPath(path: string): string {
  if (path === "/") return "/index.md";
  return `${path}.md`;
}

export function pageMetadata(options: {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  absoluteTitle?: boolean;
  type?: "website" | "article";
}): Metadata {
  const image = options.image || DEFAULT_OG_IMAGE;
  return {
    title: options.absoluteTitle ? { absolute: options.title } : options.title,
    description: options.description,
    alternates: {
      canonical: options.path,
      types: {
        "text/markdown": markdownPath(options.path),
        "application/rss+xml": "/blog-feed.xml",
      },
    },
    openGraph: {
      title: options.title,
      description: options.description,
      url: options.path,
      siteName: BRAND,
      locale: "en_US",
      type: options.type ?? "website",
      images: [{ url: image, alt: options.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: options.title,
      description: options.description,
      images: [image],
    },
  };
}
