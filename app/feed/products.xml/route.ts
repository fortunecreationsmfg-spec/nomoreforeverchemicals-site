import { buildProductsXml } from "@/lib/feeds";
import { textResponse } from "@/lib/http";

export const dynamic = "force-static";

export function GET() {
  return textResponse(buildProductsXml(), "application/xml; charset=utf-8");
}
