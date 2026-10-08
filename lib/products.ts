import fs from "fs";
import path from "path";
import { cache } from "react";
import { slugify } from "@/lib/format";

export type Product = {
  slug: string;
  name: string;
  brand: string | null;
  category: string;
  subcategory: string | null;
  asin: string | null;
  listUrl: string | null;
  availability: "in_stock" | "unavailable";
  image: string | null;
  imageAlt: string | null;
  description: string;
  features: string[];
  labelNote: string | null;
  order: number;
};

export const CATEGORY_ORDER = [
  "Cookware",
  "Water Filtration",
  "Air Quality",
  "Personal Care",
  "Food Storage",
  "Textiles",
  "Cleaning",
];

export function categoryAnchor(category: string): string {
  return slugify(category);
}

export const getAllProducts = cache((): Product[] => {
  const dir = path.join(process.cwd(), "content/products");
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const product = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8")) as Product;
      return product;
    })
    .sort((a, b) => a.order - b.order);
});

export function getProduct(slug: string): Product | null {
  return getAllProducts().find((product) => product.slug === slug) ?? null;
}

export function productsByCategory(): { category: string; products: Product[] }[] {
  const groups = new Map<string, Product[]>();
  for (const product of getAllProducts()) {
    const list = groups.get(product.category) ?? [];
    list.push(product);
    groups.set(product.category, list);
  }

  const ordered = CATEGORY_ORDER.filter((category) => groups.has(category)).map((category) => ({
    category,
    products: groups.get(category) ?? [],
  }));

  for (const [category, products] of groups) {
    if (!CATEGORY_ORDER.includes(category)) ordered.push({ category, products });
  }

  return ordered;
}
