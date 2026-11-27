import { BLACK_FRIDAY_PATH } from "@/lib/seasonal";
import type { Faq } from "@/lib/takeaways";

export const DEALS_CHECKED = "2026-11-27";
export const DEALS_PATH = BLACK_FRIDAY_PATH;
export const DEALS_TITLE = "PFAS-Free Black Friday Deals 2026";
export const DEALS_DESCRIPTION =
  "Black Friday is Friday, November 27, 2026. Verified iSpring, Lodge, Clearly Filtered, GreenPan, All-Clad, Legend, and Bee's Wrap offers on products already in this directory. Rows without a confirmed price say Check today's price.";

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
  "Verified Nov 27, 2026 on ispringfilter.com. The sitewide banner read “iSpring's Biggest Deals is Here! | Up to $200 Off Sitewide.” The holiday sale page header read “Nov.9 — Nov.30 Save Up to $200 + 30-Day Price Protection” and listed “Save $60 on $300+,” “Save $120 on $600+,” and “Save $200 on $1,000+.” The FAQ says the event starts November 9 and runs through November 30, 2026, including Thanksgiving, Black Friday, and Cyber Monday. That page does not show a promo code for those order totals. Prices change. Check the store.";

const LODGE_DEAL =
  "Lodge's site: 25% off orders of $100 or more with code CYBERSALE. The homepage hero says this weekend only. The announcement bar also says through November 30. Amazon: Check today's price.";

const LODGE_DETAIL =
  "Verified Nov 27, 2026 on lodgecastiron.com. The homepage hero read “This weekend only: 25% off orders $100+” and the button read “Code: CYBERSALE.” The announcement bar also read “Get 25% off orders $100+ through 11/30!” The same bar still included “The Holiday Sale is on! Get 20% off orders $100+!” and “20% off our Blacklock collection, ends 11/30!” The code printed next to CYBERSALE is the 25% offer. These rows are not the Blacklock collection. The 7-quart dutch oven page and the 6-quart Essential Enamel page did not show 25% already taken off the listed price. The shop button is the existing Amazon listing, so confirm the Amazon price separately. Prices change. Check the store.";

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
          "Verified Nov 27, 2026. purewell.com had no Black Friday or Cyber Monday banner. The SF Series 2.25-gallon page listed $179.99, with the same $179.99 beside it, and it was marked 0% off and sold out. This page does not list a Purewell percentage or code. Prices change. Check the store.",
        sourceLabel: "Purewell SF Series page",
        sourceUrl: "https://www.purewell.com/en-us/products/sf-series-countertop-gravity-water-filter-system-2-25-gallons-us",
      },
      {
        slugs: ["clearly-filtered"],
        deal: "25% off filtration systems. No code. Black Friday page: pitcher $74.25, regular $99. The pitcher page also lists a one-time price of $82.50, regular $110. Through December 1, 2026, 11:59 PM PST.",
        detail:
          "Verified Nov 27, 2026. The banner read “BIGGEST SALE OF THE YEAR: 25% off Filtration Systems.” The Black Friday page heading read “25% OFF All Filtration Systems” and listed the Filtered Water Pitcher at a sale price of $74.25 and a regular price of $99, labeled 25% off. The FAQ on that page says the sale runs from November 24, 2026 at 12:00 AM PST through December 1, 2026 at 11:59 PM PST, that no code is needed, and that the 25% discount is applied automatically at checkout. It also says the discount cannot be combined with other promo codes and can be combined with discounted subscription pricing. The pitcher product page shows $74.25, regular $99, on the autoship option, next to “25% OFF + FREE US SHIPPING,” and a one-time price of $82.50, regular $110, also labeled 25% off. The earlier 15% offer, $84.15 from $99 through November 23, is not on the page. Prices change. Check the store.",
        sourceLabel: "Clearly Filtered Black Friday page",
        sourceUrl: "https://clearlyfiltered.com/pages/black-friday",
      },
      {
        slugs: ["aquatru-countertop-ro-system"],
        deal: "Check today's price",
        detail:
          "Verified Nov 27, 2026. AquaTru's banner read “Black Friday Sale is Here! Get up to 35% Off during our biggest sale of the year!” That figure is a maximum. The Black Friday page listed the AquaTru Carafe from $375.00 and did not show a compare-at price for it. The Carafe product page listed $375 for the VOC filter and $395 for the alkaline mineral-boost filter, with no sale markdown. No promo code and no end date were on that Black Friday page. The shop button stays the Amazon listing. The AquaTru affiliate application is still pending, so there is no direct brand button. Prices change. Check the store.",
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
          "Verified Nov 27, 2026. The Black Friday page said “The Black Friday Sale is now” and “Our lowest prices of the year, plus special bundle deals.” It also said air purifiers are up to $380 off and special bundles are up to $700 off. The FAQ says the sale ends on November 30. Those “up to” figures are maximums. The AD2000 on that page showed a sale price of $399.00 and a regular price of $399.00, so this page does not state a dollar discount for the AD2000. The homepage said free shipping on all purifiers, called that shipping “This week ONLY,” and said that with any purifier purchase GO! can be added for $149 or Humidify for $119. A separate homepage line said save $100 on GO! with any AirDoctor air purifier purchase. The shop button stays the Amazon listing. The AirDoctor affiliate application is still pending, so there is no direct brand button. Prices change. Check the store.",
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
        deal: "$100 off the Valencia Pro Ceramic Nonstick 11-Piece Cookware Set, labeled a Black Friday doorbuster. Suggested price $449.99, sale price $349.99. No code on the product page. Temporarily out of stock.",
        detail:
          "Verified Nov 27, 2026. The greenpan.us banner read “Black Friday Sale Up to 75% Off Sitewide” and “TODAY ONLY! DOORBUSTER DEALS.” “Up to 75%” is a maximum. The Gray 11-piece set page showed “$100 Off Black Friday Doorbuster,” suggested price $449.99, and sale price $349.99. No code was listed on that page, and the page did not list an end date. The page also said the set was temporarily out of stock. The earlier $50 off price, $399.99, was not on the page. Prices change. Check the store.",
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
          "Verified Nov 27, 2026. all-clad.com said “Black Friday Deals Are On!” The same homepage said a gift with purchase applies to any 10-piece or larger cookware set, and that exclusions may apply. That gift was not stated for this 4-quart pot. The brushed and polished D5 4-quart soup pot pages each showed a special price of $199.99 and a regular price of $299.99. All-Clad's own note says the strikethrough price is MSRP and may not be the prevailing price, so this page states those two prices and does not turn them into a percentage. No code and no end date were shown on the soup pot page. Prices change. Check the store.",
        sourceLabel: "All-Clad D5 4-quart soup pot",
        sourceUrl: "https://www.all-clad.com/d5-stainless-brushed-5-ply-bonded-cookware-soup-pot-with-lid-4-quart.html",
      },
      {
        slugs: ["stainless-steel-set"],
        deal: "The 14-piece set page shows $442.49 and a $687.00 value, labeled Save $244.51. The homepage says the Black Friday sale is up to 43% off. No code shown.",
        detail:
          "Verified Nov 27, 2026. The legendcookware.com homepage hero read “Black Friday Sale: Up to 43% Off.” That figure is a maximum. The 14-piece 5-ply set page showed $442.49, a $687.00 value, and “Save $244.51.” No code and no end date were on the homepage hero or the set page. This page states those prices and does not turn the value into a percentage. Prices change. Check the store.",
        sourceLabel: "Legend Cookware 14-piece set",
        sourceUrl: "https://legendcookware.com/products/legend-stainless-steel-5-ply-multiply-superstainless-14-piece-cookware-set",
      },
      {
        slugs: ["homichef-stainless-steel-steamer-set"],
        deal: "Check today's price",
        detail:
          "Verified Nov 27, 2026. homichef.com listed the 3-piece steamer at a price of $74.99 and a sale price of $51.99. The homepage and that product page did not mention Black Friday or Cyber Monday, so this page does not treat that sale price as a holiday discount. The shop button is the Amazon listing. Prices change. Check the store.",
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
        deal: "Site: free shipping on orders of $40 or more after discounts. Email signup: 15% off a first purchase. The 14×53 roll page showed $24.99 and $24.99. Amazon: Check today's price.",
        detail:
          "Verified Nov 27, 2026 on beeswrap.com. The announcement bar read “BFCM sale is on! Save on bestsellers + free shipping on orders $40+ after discounts.” The homepage read “Shop Up to 66% Off for Black Friday” and “Final discount reflected at checkout.” The roll page read “The Black Friday Sale is On. Save up to 25% off bestsellers and up to 66% off bundles.” Those “up to” figures are maximums. The footer still offers 15% off a first purchase for people who sign up with email. The Cut-to-Size XL Roll, which is the 14×53 inch wrap in this directory, showed a 25% Off badge with the sale price and the regular price both at $24.99, so this page does not treat 25% as a confirmed roll price. No end date and no promo code for the Black Friday discount were on those pages. The shop button is the Amazon listing. Prices change. Check the store.",
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
      "Black Friday is Friday, November 27, 2026. iSpring's holiday sale page, verified Nov 27, 2026, says its event runs November 9 through November 30, 2026, which covers Thanksgiving, Black Friday, and Cyber Monday. Clearly Filtered's Black Friday FAQ says its 25% filtration-system offer runs from November 24, 2026 at 12:00 AM PST through December 1, 2026 at 11:59 PM PST. Lodge's announcement bar says 25% off orders of $100 or more through November 30, and the homepage hero says that offer, with code CYBERSALE, is this weekend only. AirDoctor's Black Friday page says its sale ends on November 30. GreenPan's Gray 11-piece page did not list an end date.",
  },
  {
    question: "Which discounts on this page were actually verified?",
    answer:
      "Verified Nov 27, 2026. iSpring: $60 off orders of $300 or more, $120 off $600 or more, and $200 off $1,000 or more through November 30, 2026. The holiday sale page does not show a promo code for those totals. Lodge's site: 25% off orders of $100 or more with code CYBERSALE. The hero says this weekend only, and the announcement bar also says through November 30. Clearly Filtered: 25% off filtration systems, no code, through December 1, 2026 at 11:59 PM PST. The Black Friday page lists the pitcher at $74.25 from $99. The pitcher page also lists a one-time price of $82.50 from $110. GreenPan: $100 off the Valencia Pro 11-piece set, sale price $349.99 and suggested price $449.99, labeled a Black Friday doorbuster, with no code on that page. The set was temporarily out of stock. All-Clad: the D5 4-quart soup pot at a special price of $199.99, with a regular price of $299.99 that All-Clad labels as MSRP. Legend: the 14-piece set at $442.49, with a $687.00 value labeled Save $244.51. The homepage says up to 43% off, which is a maximum. Bee's Wrap: free shipping on orders of $40 or more after discounts, and 15% off a first purchase through email signup. The roll page showed $24.99 and $24.99. AirDoctor's “up to $380 off” and AquaTru's “up to 35% off” are maximums, and those rows say Check today's price. Purewell and HOMICHEF also say Check today's price. Prices change.",
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
