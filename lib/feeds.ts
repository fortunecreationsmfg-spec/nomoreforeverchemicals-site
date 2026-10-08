import { buyUrl } from "@/lib/amazon";
import {
  AMAZON_DISCLOSURE,
  AUTHOR_NAME,
  BRAND,
  NEWSLETTER_URL,
  RSS_DESCRIPTION,
  RSS_TITLE,
  SITE_UPDATED,
  SITE_URL,
} from "@/lib/constants";
import {
  ABOUT_FAQS,
  ABOUT_SECTIONS,
  CATALOG_FAQS,
  CATALOG_INTRO,
  HOME_FAQS,
  IMPACT,
  PRIVACY_SECTIONS,
  QUIZ_RESULTS,
  QUIZ_SCORING,
  WHERE_FOUND,
} from "@/lib/copy";
import { formatDate, xmlEscape } from "@/lib/format";
import { getAllPosts, getCategories, getPostsByCategory } from "@/lib/posts";
import { getAllProducts, getProduct } from "@/lib/products";
import { absoluteUrl, markdownPath } from "@/lib/seo";
import type { Faq } from "@/lib/takeaways";

function linkLine(label: string, path: string, note?: string): string {
  const url = absoluteUrl(path);
  return note ? `- [${label}](${url}): ${note}` : `- [${label}](${url})`;
}

export function buildRss(): string {
  const posts = getAllPosts();
  const items = posts
    .map((post) => {
      const url = absoluteUrl(`/post/${post.slug}`);
      return [
        "<item>",
        `<title>${xmlEscape(post.title)}</title>`,
        `<link>${xmlEscape(url)}</link>`,
        `<guid>${xmlEscape(url)}</guid>`,
        `<pubDate>${new Date(post.date).toUTCString()}</pubDate>`,
        `<description>${xmlEscape(post.excerpt)}</description>`,
        `<dc:creator>${xmlEscape(AUTHOR_NAME)}</dc:creator>`,
        post.category ? `<category>${xmlEscape(post.category)}</category>` : "",
        "</item>",
      ]
        .filter(Boolean)
        .join("");
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/">
<channel>
<title>${xmlEscape(RSS_TITLE)}</title>
<link>${xmlEscape(SITE_URL)}</link>
<description>${xmlEscape(RSS_DESCRIPTION)}</description>
<lastBuildDate>${new Date(posts[0]?.updated || SITE_UPDATED).toUTCString()}</lastBuildDate>
${items}
</channel>
</rss>`;
}

export function buildProductsJson(): string {
  const products = getAllProducts().map((product) => ({
    name: product.name,
    brand: product.brand,
    asin: product.asin,
    category: product.category,
    description: product.description,
    image: product.image ? absoluteUrl(product.image) : null,
    buyUrl: buyUrl(product),
    availability: product.availability,
    url: absoluteUrl(`/products/${product.slug}`),
  }));

  return JSON.stringify(
    {
      name: `${BRAND} product catalog`,
      site: SITE_URL,
      checkout: "Amazon",
      disclosure: AMAZON_DISCLOSURE,
      products,
    },
    null,
    2,
  );
}

export function buildProductsXml(): string {
  const items = getAllProducts()
    .map((product) => {
      return [
        "<product>",
        `<name>${xmlEscape(product.name)}</name>`,
        `<brand>${xmlEscape(product.brand ?? "")}</brand>`,
        `<asin>${xmlEscape(product.asin ?? "")}</asin>`,
        `<category>${xmlEscape(product.category)}</category>`,
        `<description>${xmlEscape(product.description)}</description>`,
        `<image>${xmlEscape(product.image ? absoluteUrl(product.image) : "")}</image>`,
        `<buyUrl>${xmlEscape(buyUrl(product))}</buyUrl>`,
        `<availability>${xmlEscape(product.availability)}</availability>`,
        `<url>${xmlEscape(absoluteUrl(`/products/${product.slug}`))}</url>`,
        "</product>",
      ].join("");
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<products>\n${items}\n</products>\n`;
}

function faqBlock(faqs: Faq[]): string {
  if (!faqs.length) return "";
  return ["## Questions", "", ...faqs.flatMap((faq) => [`### ${faq.question}`, "", faq.answer, ""])].join("\n");
}

export function buildHomeMarkdown(): string {
  const lines = [
    `# ${BRAND}`,
    "",
    `Last updated ${formatDate(SITE_UPDATED)}.`,
    "",
    "Protecting your home from forever chemicals.",
    "",
    "PFAS — known as forever chemicals — are hiding in everyday products. You can't see or smell them, but science shows they may be seriously affecting your health.",
    "",
    "## Quick risk snapshot",
    "",
    QUIZ_SCORING,
    "",
    ...QUIZ_RESULTS.flatMap((result) => [`### ${result.title} (${result.detail})`, "", result.body, ""]),
    `The newsletter is optional: ${NEWSLETTER_URL}`,
    "",
    "## Impact by the numbers",
    "",
    ...IMPACT.flatMap((item) => [`- **${item.figure}.** ${item.text}`]),
    "",
    "## What are forever chemicals and PFAS?",
    "",
    "PFAS (per- and polyfluoroalkyl substances) are a family of over 12,000 synthetic chemicals manufactured since the 1940s. Their carbon-fluorine bond is one of the strongest in chemistry, making them resistant to water, oil, and heat — and nearly impossible to break down. They persist in the environment for centuries and accumulate in the human body for years. That is why they are called forever chemicals.",
    "",
    "## Where are they found?",
    "",
    ...WHERE_FOUND.flatMap((item) => [`### ${item.title}`, "", item.text, ""]),
    faqBlock(HOME_FAQS),
    `Canonical page: ${absoluteUrl("/")}`,
    "",
  ];
  return lines.join("\n");
}

export function buildAboutMarkdown(): string {
  const lines = [
    "# What is this site about?",
    "",
    `Last updated ${formatDate(SITE_UPDATED)}.`,
    "",
  ];
  for (const section of ABOUT_SECTIONS) {
    if (section.heading) lines.push(`## ${section.heading}`, "");
    for (const paragraph of section.paragraphs) lines.push(paragraph, "");
  }
  lines.push(faqBlock(ABOUT_FAQS), `Canonical page: ${absoluteUrl("/what-is-this-site-about")}`, "");
  return lines.join("\n");
}

export function buildPrivacyMarkdown(): string {
  const lines = ["# Privacy Policy", "", `Last updated ${formatDate(SITE_UPDATED)}.`, ""];
  for (const section of PRIVACY_SECTIONS) {
    if (section.heading) lines.push(`## ${section.heading}`, "");
    for (const paragraph of section.paragraphs) lines.push(paragraph, "");
  }
  lines.push(`Canonical page: ${absoluteUrl("/privacy-policy")}`, "");
  return lines.join("\n");
}

export function buildCatalogMarkdown(): string {
  const lines = [
    "# Non-toxic products",
    "",
    `Last updated ${formatDate(SITE_UPDATED)}.`,
    "",
    ...CATALOG_INTRO.flatMap((paragraph) => [paragraph, ""]),
    "## Products",
    "",
  ];
  for (const product of getAllProducts()) {
    lines.push(
      `- [${product.name}](${absoluteUrl(`/products/${product.slug}`)}) — ${product.brand ?? "Brand not listed"}, ${product.category}, ${product.availability}. Buy: ${buyUrl(product)}. Markdown: ${absoluteUrl(markdownPath(`/products/${product.slug}`))}`,
    );
  }
  lines.push("", faqBlock(CATALOG_FAQS), `Canonical page: ${absoluteUrl("/non-toxic-products")}`, "");
  return lines.join("\n");
}

export function buildBlogMarkdown(): string {
  const lines = [
    "# Blog",
    "",
    "Guides on forever chemicals, health research, and practical swaps for a home with fewer PFAS sources.",
    "",
  ];
  for (const post of getAllPosts()) {
    lines.push(`- [${post.title}](${absoluteUrl(`/post/${post.slug}`)}) (${formatDate(post.date)}): ${post.excerpt}`);
    lines.push(`  - Markdown: ${absoluteUrl(markdownPath(`/post/${post.slug}`))}`);
  }
  lines.push("", `Canonical page: ${absoluteUrl("/blog")}`, "");
  return lines.join("\n");
}

export function buildCategoryMarkdown(slug: string): string | null {
  const category = getCategories().find((item) => item.slug === slug);
  if (!category) return null;
  const lines = [`# ${category.name}`, "", `Last updated ${formatDate(newestUpdate(getPostsByCategory(slug)))}.`, ""];
  for (const post of getPostsByCategory(slug)) {
    lines.push(`- [${post.title}](${absoluteUrl(`/post/${post.slug}`)}): ${post.excerpt}`);
  }
  lines.push("", `Canonical page: ${absoluteUrl(`/blog/categories/${slug}`)}`, "");
  return lines.join("\n");
}

export function buildPostMarkdown(slug: string): string | null {
  const post = getAllPosts().find((item) => item.slug === slug);
  if (!post) return null;
  const lines = [
    `# ${post.title}`,
    "",
    `- Author: ${post.author}`,
    `- Published: ${formatDate(post.date)}`,
    `- Last updated: ${formatDate(post.updated)}`,
    post.category ? `- Category: ${post.category}` : "",
    "",
    "## Key takeaways",
    "",
    ...post.takeaways.map((item) => `- ${item}`),
    "",
    post.body,
    "",
  ];
  if (post.faqs.length) {
    lines.push("## Questions from this guide", "");
    for (const faq of post.faqs) lines.push(`### ${faq.question}`, "", faq.answer, "");
  }
  if (post.hasAffiliateLinks) lines.push(AMAZON_DISCLOSURE, "");
  lines.push(`Canonical page: ${absoluteUrl(`/post/${post.slug}`)}`, "");
  return lines.filter((line) => line !== null).join("\n");
}

export function buildProductMarkdown(slug: string): string | null {
  const product = getProduct(slug);
  if (!product) return null;
  const lines = [
    `# ${product.name}`,
    "",
    `Last updated ${formatDate(SITE_UPDATED)}.`,
    "",
    `- Brand: ${product.brand ?? "Not listed"}`,
    `- Category: ${product.category}${product.subcategory ? ` / ${product.subcategory}` : ""}`,
    `- ASIN: ${product.asin ?? "None. This entry is an Amazon list, not a single product."}`,
    `- Availability: ${product.availability}`,
    `- Buy: ${buyUrl(product)}`,
    "",
    product.description,
    "",
  ];
  if (product.features.length) {
    lines.push("## Features", "");
    for (const feature of product.features) lines.push(`- ${feature}`);
    lines.push("");
  }
  lines.push(AMAZON_DISCLOSURE, "", `Canonical page: ${absoluteUrl(`/products/${product.slug}`)}`, "");
  return lines.join("\n");
}

function newestUpdate(posts: { updated: string }[]): string {
  return posts.reduce((latest, post) => (post.updated > latest ? post.updated : latest), SITE_UPDATED);
}

export function buildLlmsTxt(): string {
  const lines = [
    `# ${BRAND}`,
    "",
    "> Guides to PFAS (forever chemicals) and a directory of products that link to Amazon. Buyers check out on Amazon. As an Amazon Associate I earn from qualifying purchases.",
    "",
    `Operated by FortuneCreations, LLC. Contact: nomoreforeverchemicals@gmail.com`,
    "",
    "## Key pages",
    linkLine("Home", "/", "PFAS overview, household quiz, and where forever chemicals show up."),
    linkLine("Home markdown", "/index.md"),
    linkLine("Non-toxic products", "/non-toxic-products", "Amazon affiliate catalog."),
    linkLine("Non-toxic products markdown", markdownPath("/non-toxic-products")),
    linkLine("What is this site about?", "/what-is-this-site-about"),
    linkLine("About markdown", markdownPath("/what-is-this-site-about")),
    linkLine("Blog", "/blog"),
    linkLine("Blog markdown", "/blog.md"),
    linkLine("Privacy policy", "/privacy-policy"),
    linkLine("Privacy markdown", markdownPath("/privacy-policy")),
    "",
    "## Guides",
  ];

  for (const post of getAllPosts()) {
    lines.push(linkLine(post.title, `/post/${post.slug}`, post.excerpt));
    lines.push(linkLine(`${post.title} (markdown)`, markdownPath(`/post/${post.slug}`)));
  }

  lines.push("", "## Products");
  for (const product of getAllProducts()) {
    lines.push(
      linkLine(
        product.name,
        `/products/${product.slug}`,
        `${product.brand ?? "Brand not listed"}. ${product.category}. ${product.availability}. Buy: ${buyUrl(product)}`,
      ),
    );
    lines.push(linkLine(`${product.name} (markdown)`, markdownPath(`/products/${product.slug}`)));
  }

  lines.push(
    "",
    "## Feeds",
    linkLine("Product JSON feed", "/products.json"),
    linkLine("Product XML feed", "/feed/products.xml"),
    linkLine("Blog RSS", "/blog-feed.xml"),
    linkLine("Full site summary", "/llms-full.txt"),
    linkLine("Sitemap", "/sitemap.xml"),
    "",
  );
  return lines.join("\n");
}

export function buildLlmsFull(): string {
  const lines = [
    buildLlmsTxt(),
    "## Home summary",
    "",
    QUIZ_SCORING,
    "",
    ...HOME_FAQS.flatMap((faq) => [`### ${faq.question}`, "", faq.answer, ""]),
    "## About",
    "",
    ...ABOUT_SECTIONS.flatMap((section) => section.paragraphs.flatMap((paragraph) => [paragraph, ""])),
    "## Catalog notes",
    "",
    ...CATALOG_INTRO.flatMap((paragraph) => [paragraph, ""]),
    "## Guide takeaways",
    "",
  ];

  for (const post of getAllPosts()) {
    lines.push(`### ${post.title}`, "", `Published ${formatDate(post.date)}. Last updated ${formatDate(post.updated)}.`, "");
    for (const takeaway of post.takeaways) lines.push(`- ${takeaway}`);
    lines.push("", post.excerpt, "");
  }

  lines.push("## Product details", "");
  for (const product of getAllProducts()) {
    lines.push(`### ${product.name}`, "", product.description, "");
    for (const feature of product.features.slice(0, 4)) lines.push(`- ${feature}`);
    lines.push("");
  }

  return lines.join("\n");
}
