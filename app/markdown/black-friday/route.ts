import { buildBlackFridayMarkdown } from "@/lib/feeds";
import { markdownResponse } from "@/lib/http";
import { DEALS_PATH } from "@/lib/blackFriday";

export const dynamic = "force-static";

export function GET() {
  return markdownResponse(buildBlackFridayMarkdown(), DEALS_PATH);
}
