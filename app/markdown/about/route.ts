import { buildAboutMarkdown } from "@/lib/feeds";
import { markdownResponse } from "@/lib/http";

export const dynamic = "force-static";

export function GET() {
  return markdownResponse(buildAboutMarkdown(), "/what-is-this-site-about");
}
