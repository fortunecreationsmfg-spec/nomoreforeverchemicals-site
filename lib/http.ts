import { absoluteUrl } from "@/lib/seo";

export function markdownResponse(body: string, canonicalPath: string): Response {
  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
      "X-Content-Type-Options": "nosniff",
      Link: `<${absoluteUrl(canonicalPath)}>; rel="canonical"`,
    },
  });
}

export function textResponse(body: string, contentType: string): Response {
  return new Response(body, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=3600",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
