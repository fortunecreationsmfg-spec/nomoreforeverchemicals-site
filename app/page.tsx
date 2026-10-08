import { HomeSections } from "@/components/sections/HomeSections";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "PFAS Awareness & Solutions | No More Forever Chemicals",
  description:
    "Protect your family from PFAS dangers. Discover PFAS-free cookware, water filters, and non-toxic products with No More Forever Chemicals.",
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return <HomeSections />;
}
