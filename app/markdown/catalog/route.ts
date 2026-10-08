import { buildCatalogMarkdown } from "@/lib/feeds";
import { markdownResponse } from "@/lib/http";

export const dynamic = "force-static";

export function GET() {
  return markdownResponse(buildCatalogMarkdown(), "/non-toxic-products");
}
