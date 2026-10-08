import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/home-1", destination: "/privacy-policy", permanent: true },
      { source: "/pfas-awareness", destination: "/blog", permanent: true },
      { source: "/pfas-blog", destination: "/blog", permanent: true },
      { source: "/about-pfas-resource", destination: "/what-is-this-site-about", permanent: true },
      { source: "/blog-posts-sitemap.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/blog-categories-sitemap.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/pages-sitemap.xml", destination: "/sitemap.xml", permanent: true },
    ];
  },
  async rewrites() {
    return [
      { source: "/index.md", destination: "/markdown/home" },
      { source: "/post/:slug.md", destination: "/markdown/post/:slug" },
      { source: "/products/:slug.md", destination: "/markdown/product/:slug" },
      { source: "/blog.md", destination: "/markdown/blog" },
      { source: "/blog/categories/:slug.md", destination: "/markdown/category/:slug" },
      { source: "/non-toxic-products.md", destination: "/markdown/catalog" },
      { source: "/what-is-this-site-about.md", destination: "/markdown/about" },
      { source: "/privacy-policy.md", destination: "/markdown/privacy" },
    ];
  },
};

export default nextConfig;
