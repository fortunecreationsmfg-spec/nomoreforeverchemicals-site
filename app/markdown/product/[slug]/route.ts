import { buildProductMarkdown } from "@/lib/feeds";
import { markdownResponse } from "@/lib/http";
import { getAllProducts } from "@/lib/products";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}

export async function GET(_request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  const body = buildProductMarkdown(slug);
  if (!body) return new Response("Not found", { status: 404 });
  return markdownResponse(body, `/products/${slug}`);
}
