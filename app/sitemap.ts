import type { MetadataRoute } from "next";
import { SITE_UPDATED, SITE_URL } from "@/lib/constants";
import { getCategories, getAllPosts } from "@/lib/posts";
import { getAllProducts } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const products = getAllProducts();
  const latest = posts.reduce((max, post) => (post.updated > max ? post.updated : max), SITE_UPDATED);

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: SITE_UPDATED, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/blog`, lastModified: latest, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/non-toxic-products`, lastModified: SITE_UPDATED, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/what-is-this-site-about`, lastModified: SITE_UPDATED, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE_URL}/privacy-policy`, lastModified: SITE_UPDATED, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/blog-feed.xml`, lastModified: latest, changeFrequency: "weekly", priority: 0.4 },
    { url: `${SITE_URL}/products.json`, lastModified: SITE_UPDATED, changeFrequency: "weekly", priority: 0.5 },
    { url: `${SITE_URL}/feed/products.xml`, lastModified: SITE_UPDATED, changeFrequency: "weekly", priority: 0.4 },
    { url: `${SITE_URL}/llms.txt`, lastModified: SITE_UPDATED, changeFrequency: "weekly", priority: 0.4 },
    { url: `${SITE_URL}/llms-full.txt`, lastModified: SITE_UPDATED, changeFrequency: "weekly", priority: 0.3 },
  ];

  const categories = getCategories().map((category) => {
    const inCategory = posts.filter((post) => post.category === category.name);
    const lastModified = inCategory.reduce((max, post) => (post.updated > max ? post.updated : max), SITE_UPDATED);
    return {
      url: `${SITE_URL}/blog/categories/${category.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    };
  });

  const postEntries = posts.map((post) => ({
    url: `${SITE_URL}/post/${post.slug}`,
    lastModified: post.updated,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const productEntries = products.map((product) => ({
    url: `${SITE_URL}/products/${product.slug}`,
    lastModified: SITE_UPDATED,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...categories, ...postEntries, ...productEntries];
}
