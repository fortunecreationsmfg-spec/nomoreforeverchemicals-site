import type { Faq } from "@/lib/takeaways";

export type CopySection = {
  heading?: string;
  paragraphs: string[];
};

export const IMPACT = [
  {
    figure: "Nearly everyone",
    text: "Recent studies show PFAS detected in the blood of nearly every person tested globally.",
  },
  {
    figure: "1,000+ years",
    text: "Estimated time for most PFAS variants to degrade in typical landfill conditions.",
  },
  {
    figure: "Global reach",
    text: "Contamination has been found in remote Arctic ice cap samples and deep-sea life.",
  },
] as const;

export const WHERE_FOUND = [
  {
    title: "Kitchen and food",
    text: "Non-stick cookware, parchment paper, and air fryers. Grease-resistant food packaging and fast food wrappers.",
  },
  {
    title: "Water and food supply",
    text: "Tap water near military bases, airports, and industrial sites. Freshwater fish and produce grown near contaminated land.",
  },
  {
    title: "Home and clothing",
    text: "Stain-resistant carpet, furniture, and mattress coatings. Water-repellent jackets, rain gear, and athletic wear.",
  },
  {
    title: "Baby and children's products",
    text: "Disposable diapers, stain-resistant clothing, and crib mattresses.",
  },
  {
    title: "Personal care",
    text: "Waterproof cosmetics, shampoos, and PTFE-based dental floss.",
  },
] as const;

export const GUIDE_CARDS = [
  {
    title: "Kitchen essentials",
    text: "Switch to high-grade stainless steel and cast iron cookware collections described on this site as free from forever-chemical coatings.",
    href: "/non-toxic-products#cookware",
    cta: "View products",
    image: "/media/e97c8d_d38db8391b2647c4b6a706aff8b74210_mv2.webp",
    alt: "Kitchen counter with cookware",
  },
  {
    title: "Textiles and bedding",
    text: "The original home page points to organic textiles as a swap for moisture-wicking synthetic coatings.",
    href: "/non-toxic-products#textiles",
    cta: "Shop textiles",
    image: "/media/e97c8d_0027208790a54c21b2880feaf12c7d59_mv2.webp",
    alt: "Folded neutral textiles and bedding",
  },
  {
    title: "Personal care",
    text: "Cosmetics and skincare the site describes as audited for PFAS-free formulations.",
    href: "/non-toxic-products#personal-care",
    cta: "Explore personal care",
    image: "/media/e97c8d_0719d40b0ab94c8f99e57a1d29c40e00_mv2.webp",
    alt: "Personal care bottles on a bathroom shelf",
  },
] as const;

export const GALLERY = [
  {
    title: "Understanding PFAS in tap water",
    image: "/media/e97c8d_cd3e46238a1345839851f2222fc376d9_mv2.webp",
    href: "/post/the-no-more-forever-chemicals-newsletter",
  },
  {
    title: "PFAS-free kitchen essentials",
    image: "/media/e97c8d_d3b4c7aee41946b1acfd637933aa69c5_mv2.webp",
    href: "/post/your-room-by-room-guide-to-removing-forever-chemicals-from-your-home",
  },
  {
    title: "The future of environmental regulation",
    image: "/media/e97c8d_ba4c09bc0b2043c285d15b938eeb93cd_mv2.webp",
    href: "/post/the-health-risks-of-pfas-exposure-recent-studies",
  },
] as const;

export const QUIZ_QUESTIONS = {
  pans: {
    prompt:
      "Do you use non-stick pans? Count how many items you select to read your PFAS risk level in the results.",
    options: ["Yes", "No", "Sometimes"],
  },
  items: {
    prompt: "Which of these do you have?",
    options: ["Stain-resistant furniture", "Waterproof makeup", "Raincoats", "Water filters"],
  },
  baby: {
    prompt: "Are there baby products with moisture-wicking fabric in the home?",
    options: ["Yes", "No"],
  },
} as const;

export const QUIZ_SCORING =
  "Yes to non-stick pans counts as 2 points and Sometimes counts as 1. Stain-resistant furniture, waterproof makeup, and raincoats count as 1 point each. A water filter is not counted, because this site treats filtration as a way to reduce exposure rather than a source. Yes to moisture-wicking baby products counts as 2 points. 0–1 is a lower snapshot, 2–3 is mixed, and 4 or more is higher. This is a household-source snapshot, not a medical test.";

export const QUIZ_RESULTS = [
  {
    id: "lower",
    title: "Lower snapshot",
    detail: "0–1 points",
    body: "Few of the household sources in this quiz turned up: non-stick pans, stain-resistant furniture, waterproof makeup, raincoats, and moisture-wicking baby fabrics. The guides on this site still describe PFAS as widespread in drinking water and food packaging, so the water and kitchen articles are the next place to read.",
  },
  {
    id: "mixed",
    title: "Mixed snapshot",
    detail: "2–3 points",
    body: "A few of those common sources showed up. The practical swaps described across the guides start with cookware — stainless steel or cast iron instead of non-stick — and with drinking water.",
  },
  {
    id: "higher",
    title: "Higher snapshot",
    detail: "4 or more points",
    body: "Several answers match products this site calls out as common PFAS sources: non-stick pans, stain-resistant or water-repellent textiles, waterproof makeup, or moisture-wicking baby fabrics. The room-by-room guide suggests swapping gradually, starting with cookware and water, then textiles and personal care.",
  },
] as const;

export const HOME_FAQS: Faq[] = [
  {
    question: "What are PFAS and forever chemicals?",
    answer:
      "PFAS (per- and polyfluoroalkyl substances) are a family of over 12,000 synthetic chemicals manufactured since the 1940s. Their carbon-fluorine bond is one of the strongest in chemistry, which makes them resistant to water, oil, and heat, and nearly impossible to break down. They persist in the environment for centuries and accumulate in the human body for years. That is why they are called forever chemicals.",
  },
  {
    question: "Where do forever chemicals show up at home?",
    answer:
      "The home guide lists the kitchen (non-stick cookware, parchment paper, air fryers, and grease-resistant food packaging), tap water near military bases, airports, and industrial sites, stain-resistant carpet, furniture, and mattress coatings, water-repellent jackets and athletic wear, some baby products such as disposable diapers, stain-resistant clothing, and crib mattresses, and personal care such as waterproof cosmetics, shampoos, and PTFE-based dental floss.",
  },
  {
    question: "How long do PFAS last?",
    answer:
      "The impact notes on this page estimate that most PFAS variants take 1,000+ years to degrade in typical landfill conditions. The chemistry section also says they persist in the environment for centuries and accumulate in the human body for years.",
  },
  {
    question: "Does the home quiz require an email?",
    answer:
      "No. The Quick Risk Snapshot shows a lower, mixed, or higher result on this page without an email. The newsletter signup is optional.",
  },
];

export const ABOUT_SECTIONS: CopySection[] = [
  {
    paragraphs: [
      "No More Forever Chemicals explains what PFAS are, where they show up around a house, and which everyday swaps the guides recommend. PFAS, often called forever chemicals, are synthetic substances used since the 1940s for water, oil, and heat resistance. The carbon-fluorine bond makes them hard to break down, so they persist in the environment and can accumulate in people.",
      "The blog is a set of plain-language guides: what the chemicals are, what health agencies and studies discussed in those articles have reported, how to read product claims, and how to work through a home room by room. One category, PFAS & Health, collects the room-by-room removal guide. The other articles sit on the main blog index.",
    ],
  },
  {
    heading: "What you can do with this site",
    paragraphs: [
      "Read the research roundups and the practical articles on drinking water, cookware, food packaging, textiles, and personal care. Then use the non-toxic products directory to open the Amazon listing behind each recommendation. The directory covers cookware, water filtration, an air purifier, personal care, food storage, textiles, and cleaning.",
      "The original about page was only a list of search phrases. This page keeps those topics — forever chemicals, PFAS in drinking water, cookware, dental floss, parchment paper, laundry, food storage, and children's products — as the subjects the articles and product directory actually cover.",
    ],
  },
  {
    heading: "Products, newsletter, and contact",
    paragraphs: [
      "This site does not sell products and does not run a cart. Each product page links to Amazon, where checkout and delivery happen. As an Amazon Associate I earn from qualifying purchases.",
      "The newsletter is optional and is hosted on beehiiv at https://nomoreforeverchemicals.beehiiv.com. It is described on the original site as twice a month. Questions can be sent to nomoreforeverchemicals@gmail.com.",
      "The site is operated by FortuneCreations, LLC.",
    ],
  },
];

export const ABOUT_FAQS: Faq[] = [
  {
    question: "What is this site about?",
    answer:
      "It is a guide to PFAS, also called forever chemicals: what they are, where they show up in a home, what the articles report from health research, and which Amazon listings the directory links to as swaps.",
  },
  {
    question: "Does this site sell the products it lists?",
    answer:
      "No. Product pages send you to Amazon, where you check out. As an Amazon Associate I earn from qualifying purchases.",
  },
  {
    question: "Who operates No More Forever Chemicals?",
    answer:
      "FortuneCreations, LLC. The public contact email is nomoreforeverchemicals@gmail.com. The newsletter is optional and lives on beehiiv.",
  },
];

export const CATALOG_INTRO = [
  "A directory of cookware, water filters, personal care, food storage, textiles, and cleaning products gathered from the original non-toxic products page and from product links inside the guides.",
  "Nothing is sold on this website. Buy on Amazon opens the listing, and you check out there. As an Amazon Associate I earn from qualifying purchases. Prices are not listed here because they change on Amazon.",
  "Three listings were unavailable on Amazon when the catalog was compiled on October 7, 2026. They stay in the directory with a clear unavailable label so you can check whether they have returned. An off-topic watch band and a leftover template block from the old page are not included.",
];

export const CATALOG_FAQS: Faq[] = [
  {
    question: "Where do I buy these products?",
    answer:
      "On Amazon. Each product page has a Buy on Amazon link. This website does not take payment or ship orders.",
  },
  {
    question: "Why are there no prices?",
    answer:
      "Amazon prices change, and the Associates program discourages publishing a fixed price. Open the Amazon listing to see the current price.",
  },
  {
    question: "What does currently unavailable mean?",
    answer:
      "Those three items showed as currently unavailable on Amazon when the catalog was compiled on October 7, 2026. The link is still there so you can check the live listing. Shipping limits seen from outside the United States during research were not treated as out of stock.",
  },
  {
    question: "How do the affiliate links work?",
    answer:
      "Links use the Amazon Associates tag nomoreforev05-20 unless a different tag is set when the site is built. As an Amazon Associate I earn from qualifying purchases.",
  },
];

export const PRIVACY_SECTIONS: CopySection[] = [
  {
    paragraphs: [
      "No More Forever Chemicals is a website operated by FortuneCreations, LLC (\"we\"). The site publishes guides about PFAS and links to products on Amazon. It also points to an optional newsletter hosted by beehiiv. This policy explains what happens when you read the site, email us, or follow those links.",
      "Last updated October 8, 2026.",
    ],
  },
  {
    heading: "Information we collect",
    paragraphs: [
      "You can read the site without creating an account. We do not run a checkout, so we do not collect payment card numbers or shipping addresses.",
      "If you email nomoreforeverchemicals@gmail.com, we receive the address you write from and whatever you include in the message.",
      "The newsletter signup is not a form on this site. It opens https://nomoreforeverchemicals.beehiiv.com, where beehiiv collects the email address you submit under beehiiv's own policy.",
      "Vercel Analytics records aggregated visit data such as pages viewed, referring pages, and browser type. We use it to see which guides are useful. We do not use it to build a profile of you, and the site does not show a cookie wall or an interstitial.",
    ],
  },
  {
    heading: "Amazon Associates",
    paragraphs: [
      "Some links go to Amazon with our Associates tag. As an Amazon Associate I earn from qualifying purchases. When you follow a product link, Amazon receives the fact that you came from this site. Anything you do after that, including browsing, signing in, and paying, is handled by Amazon under Amazon's privacy policy at https://www.amazon.com/privacy. We do not see your Amazon account or your order details.",
    ],
  },
  {
    heading: "How we use information",
    paragraphs: [
      "We use messages you send in order to reply. We use aggregated analytics to understand which pages are read. We do not sell personal information. We do not use your information for automated profiling.",
    ],
  },
  {
    heading: "Sharing",
    paragraphs: [
      "We share information only with the services that make the site work, and only for that purpose: Vercel hosts the site and provides analytics (https://vercel.com/legal/privacy-policy), Amazon receives affiliate click-throughs, and beehiiv receives newsletter signups that you submit on the beehiiv site. We may also share information if the law requires it, or if FortuneCreations, LLC is sold and the website transfers with it.",
    ],
  },
  {
    heading: "Cookies",
    paragraphs: [
      "This site does not set advertising cookies and does not ask you to accept a cookie banner before you can read. Your browser, Vercel Analytics, and the third-party sites you choose to open (Amazon and beehiiv) may store their own technical data. You can block cookies in your browser.",
    ],
  },
  {
    heading: "Retention and security",
    paragraphs: [
      "Email is kept long enough to answer you and for ordinary records. Analytics retention follows Vercel's settings. No method of sending information on the internet is perfectly secure. Please do not email passwords, payment numbers, or other highly sensitive data.",
    ],
  },
  {
    heading: "Your choices",
    paragraphs: [
      "You can skip the newsletter. If you subscribed on beehiiv, unsubscribe there. You can email nomoreforeverchemicals@gmail.com to ask about a message you sent us. You can stop analytics cookies by blocking them in your browser or by using a private-browsing mode.",
    ],
  },
  {
    heading: "Children",
    paragraphs: [
      "The site is a general audience guide. It is not directed at children under 13, and we do not knowingly collect personal information from them. If you believe a child has emailed us personal information, write to nomoreforeverchemicals@gmail.com and we will delete it.",
    ],
  },
  {
    heading: "Changes",
    paragraphs: [
      "If this policy changes, the date at the top of the page will change. The current version is the one published at /privacy-policy.",
    ],
  },
  {
    heading: "Contact",
    paragraphs: [
      "FortuneCreations, LLC",
      "Email: nomoreforeverchemicals@gmail.com",
    ],
  },
];
