# No More Forever Chemicals

Next.js site for [nomoreforeverchemicals.com](https://www.nomoreforeverchemicals.com). Guides live in the repo as MDX. Products are Amazon affiliate listings. Checkout happens on Amazon.

## Add a blog post

1. Create `content/posts/your-slug.mdx`. The slug is the filename. The public URL is `/post/your-slug`.
2. Start the file with frontmatter:

```mdx
---
title: "Your title"
date: "2026-10-08T12:00:00.000Z"
updated: "2026-10-08T12:00:00.000Z"
excerpt: "One or two sentences."
category: "PFAS & Health"
cover: "/media/your-image.webp"
author: "No More Forever Chemicals"
---
```

`category` and `cover` are optional. Keep the author as **No More Forever Chemicals**. `date` is the original publish date. Change `updated` when you edit the article.

3. Put images in `public/media` and reference them as `/media/file.webp`.
4. For an Amazon product, link to `https://www.amazon.com/dp/ASIN` with no tag. The site adds the Associates tag when it renders the page. Use `rel` handling built into the markdown renderer. Do not paste `amzn.to` short links.
5. Question-style headings (`## What is …?`) are kept as written. The page builds a Key takeaways block from the post's own lists or opening sentences. To set them yourself, add a `takeaways` list of 2–4 strings in the frontmatter.
6. A markdown mirror is served at `/post/your-slug.md`.

The blog index, category pages, RSS feed (`/blog-feed.xml`), sitemap, and `llms.txt` pick up the new file on the next build.

## Add or edit a product

1. Add `content/products/your-slug.json`:

```json
{
  "slug": "your-slug",
  "name": "Product name",
  "brand": "Brand",
  "category": "Cookware",
  "subcategory": null,
  "asin": "B0XXXXXXXX",
  "listUrl": null,
  "availability": "in_stock",
  "image": "/media/your-image.webp",
  "imageAlt": "Product name",
  "description": "What the listing actually is.",
  "features": ["Feature from the listing."],
  "labelNote": null,
  "order": 100
}
```

2. `availability` is `in_stock` or `unavailable`. Unavailable items stay in the catalog with a label.
3. Leave `asin` as `null` and set `listUrl` only for an Amazon list rather than a single product. Do not put a price in the file.
4. The page is `/products/your-slug`, with a markdown mirror at `/products/your-slug.md`. The catalog, `/products.json`, `/feed/products.xml`, sitemap, and `llms.txt` include it on the next build.

## Change the Amazon affiliate tag

Every Amazon link is built from `AMAZON_TAG` in `lib/constants.ts`. The default is `nomoreforev05-20`.

To override it without editing code, set `NEXT_PUBLIC_AMAZON_TAG` in the Vercel project and redeploy. No environment variable is required for the default tag.

## Deploy on Vercel

1. Import this GitHub repository in Vercel.
2. Framework preset: **Next.js**. Production branch: **main**. Root directory: the repo root.
3. Leave environment variables empty unless you are changing the Amazon tag.
4. Deploy. The Hobby plan is enough. The site is statically generated.
5. Add the domain `www.nomoreforeverchemicals.com` when you are ready to cut over from Wix.

The canonical URL is `https://www.nomoreforeverchemicals.com`. Preview deployments still navigate with relative links.

## Getting found by AI

After the production domain is serving this site:

1. Verify the property in [Google Search Console](https://search.google.com/search-console) and [Bing Webmaster Tools](https://www.bing.com/webmasters). ChatGPT search uses Bing's index, so the Bing verification matters.
2. Submit `https://www.nomoreforeverchemicals.com/sitemap.xml` in both tools. The sitemap includes `lastmod` on every URL.
3. Ping IndexNow so Bing and Yandex can pick up the URL list. The key file is `public/a44745c87ef94f6eb9f33d91d4362eca.txt` (the file name and the file contents are the key). It must be reachable at `https://www.nomoreforeverchemicals.com/a44745c87ef94f6eb9f33d91d4362eca.txt` before the ping.

```bash
npm run indexnow -- --dry-run
npm run indexnow
```

Run the real command only after the production deploy is live. The script posts the canonical HTML URLs, feeds, and sitemap to `https://api.indexnow.org/indexnow`.

Other discovery files, all static HTML or plain text:

- `/llms.txt` and `/llms-full.txt` summarize the site, guides, and catalog, including markdown mirror links.
- Every post and key page has a markdown mirror at the same path plus `.md` (the homepage is `/index.md`), linked with `<link rel="alternate" type="text/markdown">`.
- `/products.json` and `/feed/products.xml` list every product with name, brand, ASIN, category, description, image, buy URL, and availability.
- `/blog-feed.xml` is the blog RSS feed.
- `robots.txt` allows major AI crawlers (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, and others).

Quiz questions and result guides are in the HTML. Nothing sits behind a cookie wall or a required email.
