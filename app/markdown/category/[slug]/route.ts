import { buildCategoryMarkdown } from "@/lib/feeds";
import { markdownResponse } from "@/lib/http";
import { getCategories } from "@/lib/posts";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getCategories().map((category) => ({ slug: category.slug }));
}

export async function GET(_request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  const body = buildCategoryMarkdown(slug);
  if (!body) return new Response("Not found", { status: 404 });
  return markdownResponse(body, `/blog/categories/${slug}`);
}
