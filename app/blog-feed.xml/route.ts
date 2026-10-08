import { buildRss } from "@/lib/feeds";
import { textResponse } from "@/lib/http";

export const dynamic = "force-static";

export function GET() {
  return textResponse(buildRss(), "application/rss+xml; charset=utf-8");
}
