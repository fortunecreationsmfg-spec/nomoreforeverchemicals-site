export const BRAND = "No More Forever Chemicals";
export const LEGAL_NAME = "FortuneCreations, LLC";
export const AUTHOR_NAME = "No More Forever Chemicals";
export const CONTACT_EMAIL = "nomoreforeverchemicals@gmail.com";
export const SITE_URL = "https://www.nomoreforeverchemicals.com";
export const NEWSLETTER_URL = "https://nomoreforeverchemicals.beehiiv.com";
export const PINTEREST_URL = "https://pin.it/7bryiRtjS";
export const SITE_UPDATED = "2026-10-08";
export const RSS_TITLE = "nomoreforeverchemicals.com";
export const RSS_DESCRIPTION = "Clean Living, No Forever Chemicals";
export const TAGLINE = "Empowering a PFAS-free future.";
export const AMAZON_DISCLOSURE = "As an Amazon Associate I earn from qualifying purchases.";

/** Default Associates tag. Override at build time with NEXT_PUBLIC_AMAZON_TAG. */
export const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG?.trim() || "nomoreforev05-20";

export const DEFAULT_OG_IMAGE = "/media/e97c8d_d38db8391b2647c4b6a706aff8b74210_mv2.webp";

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/non-toxic-products", label: "Non-Toxic Products" },
  { href: "/what-is-this-site-about", label: "What is this Site About?" },
  { href: "/privacy-policy", label: "Privacy Policy" },
] as const;
