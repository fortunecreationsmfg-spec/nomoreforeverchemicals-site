import { buildProductsJson } from "@/lib/feeds";
import { textResponse } from "@/lib/http";

export const dynamic = "force-static";

export function GET() {
  return textResponse(buildProductsJson(), "application/json; charset=utf-8");
}
