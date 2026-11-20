import { BLACK_FRIDAY_PATH } from "@/lib/seasonal";
import type { Faq } from "@/lib/takeaways";

export const DEALS_CHECKED = "2026-11-20";
export const DEALS_PATH = BLACK_FRIDAY_PATH;
export const DEALS_TITLE = "PFAS-Free Black Friday Deals 2026";
export const DEALS_DESCRIPTION =
  "Black Friday is Friday, November 27, 2026. Verified iSpring, Lodge, Clearly Filtered, GreenPan, and All-Clad offers on products already in this directory. Rows without a confirmed price say Check today's price.";

export type DealRow = {
  slugs: string[];
  /** Short cell. Use "Check today's price" when a percentage was not confirmed for the item. */
  deal: string;
  detail: string;
  sourceLabel?: string;
  sourceUrl?: string;
};

export type DealGroup = {
  category: string;
  rows: DealRow[];
};

const ISPRING_DEAL =
  "$60 off orders of $300 or more, $120 off $600 or more, and $200 off $1,000 or more through November 30, 2026. No code needed.";

const ISPRING_DETAIL =
  "Verified Nov 20, 2026 on ispringfilter.com. The sitewide banner read “iSpring's Biggest Deals is Here! | Up to $200 Off Sitewide.” The holiday sale page lists those three order totals plus 30-day price protection, from November 9 through November 30, 2026, covering Thanksgiving, Black Friday, and Cyber Monday. The Black Friday sale page said “Sitewide Black Friday Sale – Up to $200 OFF | No Code Needed!” A new-customer code was not on the site. Prices change. Check the store.";

const LODGE_DEAL = "Lodge's site: 20% off orders of $100 or more with code CYBERSALE. Amazon: Check today's price.";

const LODGE_DETAIL =
  "Verified Nov 20, 2026 on lodgecastiron.com. The announcement bar read “The Holiday Sale is on! Get 20% off orders $100+!” The homepage hero on the same slide read “Get 20% off orders $100+” and the button read “Code: CYBERSALE.” That offer is on Lodge's site. The shop button on this row is the existing Amazon listing, so confirm the Amazon price separately. Prices change. Check the store.";

export const DEAL_GROUPS: DealGroup[] = [
  {
    category: "Water filters",
    rows: [
      {
        slugs: ["under-sink-reverse-osmosis-filter"],
        deal: ISPRING_DEAL,
        detail: ISPRING_DETAIL,
        sourceLabel: "iSpring holiday sale page",
        sourceUrl: "https://www.ispringfilter.com/pages/thanksgiving-black-friday-cyber-monday-sale",
      },
      {
        slugs: ["whole-house-sediment-filter"],
        deal: ISPRING_DEAL,
        detail: ISPRING_DETAIL,
        sourceLabel: "iSpring holiday sale page",
        sourceUrl: "https://www.ispringfilter.com/pages/thanksgiving-black-friday-cyber-monday-sale",
      },
      {
        slugs: ["countertop-gravity-filter"],
        deal: "Check today's price",
        detail:
          "Verified Nov 20, 2026. purewell.com had no Black Friday or Cyber Monday banner. The SF Series 2.25-gallon page listed $179.99, and the compare-at price was the same $179.99. This page does not list a Purewell percentage or code. Prices change. Check the store.",
        sourceLabel: "Purewell SF Series page",
        sourceUrl: "https://www.purewell.com/en-us/products/sf-series-countertop-gravity-water-filter-system-2-25-gallons-us",
      },
      {
        slugs: ["clearly-filtered"],
        deal: "15% off the Filtered Water Pitcher. Sale price $84.15, regular price $99. No code. Offer dates on the site: November 12 through November 23, 2026.",
        detail:
          "Verified Nov 20, 2026. The homepage banner read “BLACK FRIDAY: 15% off Filtration Systems.” The Black Friday page listed the Filtered Water Pitcher at a sale price of $84.15 and a regular price of $99, labeled 15% off. The pitcher product page shows the same prices and says the capacity is 80 oz or 10 cups. Promotion details say the discount is only on clearlyfiltered.com, runs from November 12, 2026 through November 23, 2026, applies automatically at checkout, and needs no code. Prices change. Check the store.",
        sourceLabel: "Clearly Filtered Black Friday page",
        sourceUrl: "https://clearlyfiltered.com/pages/black-friday",
      },
      {
        slugs: ["aquatru-countertop-ro-system"],
        deal: "Check today's price",
        detail:
          "Verified Nov 20, 2026. AquaTru's Black Friday page said “Get up to 35% Off during our biggest sale of the year!” That figure is a maximum. The same page listed the AquaTru Carafe from $375.00 and did not show a compare-at price for it. The Carafe product page listed $375 for the VOC filter and $395 for the alkaline mineral-boost filter, with no sale markdown. The shop button stays the Amazon listing. The AquaTru affiliate application is still pending, so there is no direct brand button. Prices change. Check the store.",
        sourceLabel: "AquaTru Black Friday page",
        sourceUrl: "https://aquatru.com/pages/black-friday",
      },
    ],
  },
  {
    category: "Air purifiers",
    rows: [
      {
        slugs: ["air-purifier"],
        deal: "Check today's price",
        detail:
          "Verified Nov 20, 2026. AirDoctor's homepage said “The Black Friday Sale is now! Our lowest prices of the year on every AirDoctor air purifier, plus special bundle deals.” The Black Friday page said air purifiers are up to $380 off and special bundles are up to $700 off, and that the sale ends on November 30. Those figures are maximums. The AD2000 on that page showed a sale price of $399.00 and a regular price of $399.00, so this page does not state a dollar discount for the AD2000. The shop button stays the Amazon listing. The AirDoctor affiliate application is still pending, so there is no direct brand button. Prices change. Check the store.",
        sourceLabel: "AirDoctor Black Friday page",
        sourceUrl: "https://airdoctor.com/pages/black-friday-sale",
      },
    ],
  },
  {
    category: "Cookware",
    rows: [
      {
        slugs: ["greenpan"],
        deal: "$50 off the Valencia Pro Ceramic Nonstick 11-Piece Cookware Set. Suggested price $449.99, sale price $399.99. No code on the product page.",
        detail:
          "Verified Nov 20, 2026. The greenpan.us banner read “BLACK FRIDAY EARLY ACCESS: UP TO 75% OFF SITEWIDE.” The Black Friday page also said cookware sets are up to 45% off, and that the event runs from November 7, 2026 to December 18, 2026. Those “up to” figures are maximums. The Gray 11-piece set page showed “$50 OFF,” suggested price $449.99, and sale price $399.99. The page said discounts apply automatically at checkout unless a code is listed with the product, and no code was listed there. That page also said the set was temporarily out of stock. Prices change. Check the store.",
        sourceLabel: "GreenPan Valencia Pro 11-piece page",
        sourceUrl: "https://www.greenpan.us/products/valencia-pro-ceramic-nonstick-11-piece-cookware-set-gray",
      },
      {
        slugs: ["dutch-oven"],
        deal: LODGE_DEAL,
        detail: LODGE_DETAIL,
        sourceLabel: "Lodge homepage",
        sourceUrl: "https://www.lodgecastiron.com/",
      },
      {
        slugs: ["lodge-essential-enamel-cast-iron-dutch-oven-6-quart-oyster"],
        deal: LODGE_DEAL,
        detail: LODGE_DETAIL,
        sourceLabel: "Lodge homepage",
        sourceUrl: "https://www.lodgecastiron.com/",
      },
      {
        slugs: ["lodge-cast-iron-square-grill-pan"],
        deal: LODGE_DEAL,
        detail: LODGE_DETAIL,
        sourceLabel: "Lodge homepage",
        sourceUrl: "https://www.lodgecastiron.com/",
      },
      {
        slugs: ["lodge-pre-seasoned-cast-iron-grill-pan-10-25-inches"],
        deal: LODGE_DEAL,
        detail: LODGE_DETAIL,
        sourceLabel: "Lodge homepage",
        sourceUrl: "https://www.lodgecastiron.com/",
      },
      {
        slugs: ["stainless-steel-pot"],
        deal: "Special price $199.99. Regular price shown $299.99. All-Clad labels that regular price as MSRP.",
        detail:
          "Verified Nov 20, 2026. all-clad.com said “Pre Black Friday is Here!” The brushed and polished D5 4-quart soup pot pages each showed a special price of $199.99 and a regular price of $299.99. All-Clad's own note says the strikethrough price is MSRP and may not be the prevailing price, so this page states those two prices and does not turn them into a percentage. The Cyber Monday page said the Cyber Monday event is coming. No code was shown on the soup pot page. Prices change. Check the store.",
        sourceLabel: "All-Clad D5 4-quart soup pot",
        sourceUrl: "https://www.all-clad.com/d5-stainless-brushed-5-ply-bonded-cookware-soup-pot-with-lid-4-quart.html",
      },
      {
        slugs: ["stainless-steel-set"],
        deal: "Check today's price",
        detail:
          "Verified Nov 20, 2026. legendcookware.com listed the 14-piece 5-ply set at $549.99 with a $687.00 value and “SAVE $137.01.” The homepage did not mention Black Friday or Cyber Monday, so this page does not treat that value price as a holiday discount. Prices change. Check the store.",
        sourceLabel: "Legend Cookware 14-piece set",
        sourceUrl: "https://legendcookware.com/products/legend-stainless-steel-5-ply-multiply-superstainless-14-piece-cookware-set",
      },
      {
        slugs: ["homichef-stainless-steel-steamer-set"],
        deal: "Check today's price",
        detail:
          "Verified Nov 20, 2026. homichef.com listed the 3-piece steamer at a price of $74.99 and a sale price of $51.99. The site did not mention Black Friday or Cyber Monday, so this page does not treat that sale price as a holiday discount. The shop button is the Amazon listing. Prices change. Check the store.",
        sourceLabel: "HOMICHEF steamer page",
        sourceUrl: "https://www.homichef.com/p/13.html?sku=17",
      },
    ],
  },
  {
    category: "Food storage",
    rows: [
      {
        slugs: ["beeswax-wraps"],
        deal: "Email signup: 15% off a first purchase. The 14×53 roll page showed sale price $24.99 and regular price $24.99. Amazon: Check today's price.",
        detail:
          "Verified Nov 20, 2026 on beeswrap.com. The site still offers 15% off a first purchase for people who sign up with email. The Black Friday line on the roll page read “The Black Friday Sale is On. Save up to 25% off bestsellers and up to 66% off bundles.” Those are maximums. The Cut-to-Size XL Roll, which is the 14×53 inch wrap in this directory, showed a 25% Off badge with the sale price and the regular price both at $24.99, so this page does not treat 25% as a confirmed roll price. The shop button is the Amazon listing. Prices change. Check the store.",
        sourceLabel: "Bee's Wrap XL roll",
        sourceUrl: "https://www.beeswrap.com/products/roll",
      },
    ],
  },
];

export const DEAL_GUIDES = [
  {
    href: "/post/do-water-filters-remove-pfas-best-pfas-water-filters",
    label: "Do water filters remove PFAS?",
  },
  {
    href: "/post/does-bottled-water-contain-pfas-spring-vs-purified",
    label: "PFAS in bottled water",
  },
  {
    href: "/post/the-no-more-forever-chemicals-newsletter",
    label: "Best PFAS-free water filters 2026",
  },
  {
    href: "/post/best-pfas-free-cookware-nonstick-pan-alternatives-compared",
    label: "PFAS-free cookware compared",
  },
  {
    href: "/post/do-air-fryers-contain-pfas-pfas-free-air-fryer-options",
    label: "Do air fryers contain PFAS?",
  },
  {
    href: "/non-toxic-products",
    label: "Full non-toxic product directory",
  },
] as const;

export const BLACK_FRIDAY_FAQS: Faq[] = [
  {
    question: "When is Black Friday 2026?",
    answer:
      "Black Friday is Friday, November 27, 2026. iSpring's holiday sale page, verified Nov 20, 2026, says its event runs November 9 through November 30, 2026, which covers Thanksgiving, Black Friday, and Cyber Monday. Clearly Filtered's promotion details say its 15% filtration-system offer runs November 12 through November 23, 2026. GreenPan's Black Friday page says its event runs November 7 through December 18, 2026. AirDoctor's Black Friday page says its sale ends on November 30.",
  },
  {
    question: "Which discounts on this page were actually verified?",
    answer:
      "Verified Nov 20, 2026. iSpring: $60 off orders of $300 or more, $120 off $600 or more, and $200 off $1,000 or more through November 30, 2026, with no code on the sale page. Lodge's site: 20% off orders of $100 or more with code CYBERSALE. Clearly Filtered: 15% off filtration systems, and the 10-cup pitcher shown at $84.15 from $99, with no code, through November 23, 2026. GreenPan: $50 off the Valencia Pro 11-piece set, sale price $399.99 and suggested price $449.99, with no code on that page. All-Clad: the D5 4-quart soup pot at a special price of $199.99, with a regular price of $299.99 that All-Clad labels as MSRP. Bee's Wrap: 15% off a first purchase through email signup. AirDoctor's “up to $380 off” and AquaTru's “up to 35% off” are maximums, and those rows say Check today's price. Purewell, Legend Cookware, and HOMICHEF also say Check today's price. Prices change.",
  },
  {
    question: "Does a sale price mean the filter removes PFAS down to EPA limits?",
    answer:
      "A sale price is a price. It is not a performance test. The water filters guide explains the certificates and studies, including the gap between a certification line around 20 parts per trillion and EPA's 4.0 parts-per-trillion limits for PFOA and PFOS. Read that guide before treating a lower price as cleaner water.",
  },
  {
    question: "Does this site earn a commission if I use these buttons?",
    answer:
      "Yes. We earn commissions from Amazon and from brand partners such as iSpring and Purewell at no extra cost to you. As an Amazon Associate I earn from qualifying purchases. AquaTru and AirDoctor buttons on this page are Amazon links. Direct brand buttons for those two stay off while the applications are pending.",
  },
];

export const DEALS_INTRO = [
  "Black Friday 2026 falls on Friday, November 27. A long weekend is when a lot of households replace a filter, a pan, or a small appliance. A real discount can make a PFAS-conscious swap easier to budget. A cheaper nonstick pan is still the wrong swap if the coating is PTFE.",
  "Every product below is already in this directory. A discount is named only when it was checked. Rows that could not be tied to a confirmed offer say Check today's price. There is no countdown and no invented percentage.",
];
