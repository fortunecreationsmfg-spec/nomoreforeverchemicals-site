import { BLACK_FRIDAY_PATH } from "@/lib/seasonal";
import type { Faq } from "@/lib/takeaways";

export const DEALS_CHECKED = "2026-11-13";
export const DEALS_PATH = BLACK_FRIDAY_PATH;
export const DEALS_TITLE = "PFAS-Free Black Friday Deals 2026";
export const DEALS_DESCRIPTION =
  "Black Friday is Friday, November 27, 2026. Verified iSpring, Purewell, and other offers on PFAS-conscious filters, air purifiers, and cookware already in this directory. Unverified rows say Check today's price.";

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
  "$60 off orders of $300 or more, $120 off $600 or more, and $200 off $1,000 or more through November 30, 2026. New customers can take 10% off a first filtration system with code REFISPRING (new account, one order, cannot be combined with other promotions).";

const ISPRING_DETAIL =
  "Verified on ispringfilter.com on November 13, 2026. The sitewide banner read “Up to $200 Off Sitewide,” and the holiday sale page lists those three order totals plus 30-day price protection, from November 9 through November 30, 2026. Prices change. Check the store.";

const LODGE_DEAL = "Lodge's site: 20% off orders of $100 or more. Amazon: Check today's price.";

const LODGE_DETAIL =
  "lodgecastiron.com showed a holiday-sale banner on November 13, 2026: 20% off orders of $100 or more. That offer is on Lodge's site. The shop button on this row is the existing Amazon listing, so confirm the Amazon price separately. Prices change. Check the store.";

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
        deal: "20% off Purewell Home countertop filtration systems, 15% off a first order for new customers, and $60 off orders of $300 or more, through December 31, 2026.",
        detail:
          "These are Purewell's published affiliate offers. Codes are on Purewell's site, and this page does not list a code. On November 13, 2026, purewell.com had no Black Friday banner, and the SF Series 2.25-gallon page was marked 0% off. Prices change. Check the store.",
      },
      {
        slugs: ["clearly-filtered"],
        deal: "Check today's price",
        detail:
          "Clearly Filtered's homepage banner on November 13, 2026 said “BLACK FRIDAY: 15% off Filtration Systems.” This directory lists the 10-cup pitcher. Confirm the pitcher is included before counting on 15%. The banner did not show a code. Prices change. Check the store.",
        sourceLabel: "Clearly Filtered homepage",
        sourceUrl: "https://clearlyfiltered.com/",
      },
      {
        slugs: ["aquatru-countertop-ro-system"],
        deal: "Check today's price",
        detail:
          "AquaTru's homepage on November 13, 2026 advertised a Black Friday sale of up to 35% off. That figure is a maximum, and this page did not confirm it on the Carafe. The shop button stays the Amazon listing. The AquaTru affiliate application is still pending, so there is no direct brand button.",
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
          "AirDoctor's homepage on November 13, 2026 said the Black Friday sale covers every AirDoctor air purifier, plus bundle deals, and did not state a percentage. The shop button stays the Amazon listing for the AD2000. The AirDoctor affiliate application is still pending, so there is no direct brand button.",
      },
    ],
  },
  {
    category: "Cookware",
    rows: [
      {
        slugs: ["greenpan"],
        deal: "Check today's price",
        detail:
          "greenpan.us on November 13, 2026 showed Black Friday early access with cookware sets up to 45% off and up to 75% off sitewide. Those are maximums. This page did not confirm a price for the Valencia Pro 11-piece set. Prices change. Check the store.",
        sourceLabel: "GreenPan homepage",
        sourceUrl: "https://www.greenpan.us/",
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
        deal: "Check today's price",
        detail:
          "all-clad.com on November 13, 2026 promoted ceramic nonstick on sale and did not show a percentage for the D5 stainless soup pot. Prices change. Check the store.",
        sourceLabel: "All-Clad homepage",
        sourceUrl: "https://www.all-clad.com/",
      },
      {
        slugs: ["stainless-steel-set"],
        deal: "Check today's price",
        detail: "No Legend Cookware discount was confirmed for this set on November 13, 2026. Prices change. Check the store.",
      },
      {
        slugs: ["homichef-stainless-steel-steamer-set"],
        deal: "Check today's price",
        detail: "No HOMICHEF discount was confirmed for this steamer set on November 13, 2026. Prices change. Check the store.",
      },
    ],
  },
  {
    category: "Food storage",
    rows: [
      {
        slugs: ["beeswax-wraps"],
        deal: "15% off a first purchase through Bee's Wrap email signup. Amazon: Check today's price.",
        detail:
          "beeswrap.com on November 13, 2026 offered 15% off a first purchase for people who sign up for email. That is a first-order signup offer, not a separate Black Friday percentage on this wrap. The shop button is the Amazon listing. Prices change. Check the store.",
        sourceLabel: "Bee's Wrap homepage",
        sourceUrl: "https://www.beeswrap.com/",
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
      "Black Friday is Friday, November 27, 2026. iSpring's holiday sale page, checked November 13, 2026, says its event runs November 9 through November 30, 2026, which covers Thanksgiving, Black Friday, and Cyber Monday. Purewell's affiliate offers listed on this page run through December 31, 2026.",
  },
  {
    question: "Which discounts on this page were actually verified?",
    answer:
      "iSpring's order discounts ($60 off $300 or more, $120 off $600 or more, $200 off $1,000 or more, through November 30, 2026) and the new-customer code REFISPRING. Purewell's three offers through December 31, 2026, with codes left on Purewell's site. Lodge's own site advertised 20% off orders of $100 or more. Clearly Filtered's homepage said 15% off filtration systems; the pitcher still says Check today's price until that banner is confirmed for it. Bee's Wrap advertised 15% off a first purchase via email signup. AirDoctor advertised a sale on every purifier without a percentage. AquaTru advertised up to 35% off, which is a maximum, not a confirmed Carafe price. Other rows say Check today's price. Prices change.",
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
