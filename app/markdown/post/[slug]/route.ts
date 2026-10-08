import { buildPostMarkdown } from "@/lib/feeds";
import { markdownResponse } from "@/lib/http";
import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function GET(_request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  const body = buildPostMarkdown(slug);
  if (!body) return new Response("Not found", { status: 404 });
  return markdownResponse(body, `/post/${slug}`);
}
