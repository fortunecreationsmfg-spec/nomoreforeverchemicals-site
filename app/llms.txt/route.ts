import { buildLlmsTxt } from "@/lib/feeds";
import { textResponse } from "@/lib/http";

export const dynamic = "force-static";

export function GET() {
  return textResponse(buildLlmsTxt(), "text/plain; charset=utf-8");
}
