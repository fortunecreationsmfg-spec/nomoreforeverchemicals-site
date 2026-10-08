import { buyUrl } from "@/lib/amazon";
import {
  AUTHOR_NAME,
  BRAND,
  CONTACT_EMAIL,
  DEFAULT_OG_IMAGE,
  LEGAL_NAME,
  NEWSLETTER_URL,
  PINTEREST_URL,
  SITE_URL,
} from "@/lib/constants";
import type { Post } from "@/lib/posts";
import type { Product } from "@/lib/products";
import { absoluteUrl } from "@/lib/seo";
import type { Faq } from "@/lib/takeaways";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: BRAND,
        legalName: LEGAL_NAME,
        url: SITE_URL,
        email: CONTACT_EMAIL,
        logo: absoluteUrl("/icon.svg"),
        sameAs: [PINTEREST_URL, NEWSLETTER_URL],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: BRAND,
        url: SITE_URL,
        description:
          "Guides to PFAS, also called forever chemicals, and a directory of products that link to Amazon.",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export function faqJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function blogPostingJsonLd(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.updated,
    author: {
      "@type": "Organization",
      name: AUTHOR_NAME,
      url: SITE_URL,
    },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: absoluteUrl(`/post/${post.slug}`),
    url: absoluteUrl(`/post/${post.slug}`),
    image: absoluteUrl(post.cover || DEFAULT_OG_IMAGE),
    ...(post.category ? { articleSection: post.category } : {}),
  };
}

export function productJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: product.category,
    url: absoluteUrl(`/products/${product.slug}`),
    ...(product.brand ? { brand: { "@type": "Brand", name: product.brand } } : {}),
    ...(product.asin ? { sku: product.asin } : {}),
    ...(product.image ? { image: absoluteUrl(product.image) } : {}),
    offers: {
      "@type": "Offer",
      url: buyUrl(product),
      availability:
        product.availability === "in_stock"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: "Amazon" },
    },
  };
}

export function itemListJsonLd(products: Product[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Non-toxic products",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: product.name,
      url: absoluteUrl(`/products/${product.slug}`),
    })),
  };
}
