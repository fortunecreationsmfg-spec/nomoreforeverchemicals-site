import { AMAZON_DISCLOSURE } from "@/lib/constants";

export function Disclosure({ className = "" }: { className?: string }) {
  return <p className={`text-sm leading-6 text-muted ${className}`}>{AMAZON_DISCLOSURE}</p>;
}
