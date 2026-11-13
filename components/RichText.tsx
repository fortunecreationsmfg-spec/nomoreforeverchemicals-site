import { isSponsoredHref, trackBrandUrl } from "@/lib/brandAffiliates";

export function RichText({ text }: { text: string }) {
  const parts = text.split(/(https?:\/\/[^\s]+|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/gi);
  return (
    <p>
      {parts.map((part, index) => {
        if (part.startsWith("http")) {
          const bare = part.replace(/[.,)]$/, "");
          const href = trackBrandUrl(bare);
          const sponsored = isSponsoredHref(href);
          return (
            <span key={`${href}-${index}`}>
              <a
                href={href}
                className="underline decoration-teal underline-offset-4"
                target="_blank"
                rel={sponsored ? "sponsored nofollow noopener" : "noopener noreferrer"}
              >
                {bare}
              </a>
              {part.slice(bare.length)}
            </span>
          );
        }
        if (part.includes("@")) {
          return (
            <a key={`${part}-${index}`} href={`mailto:${part}`} className="underline decoration-teal underline-offset-4">
              {part}
            </a>
          );
        }
        return <span key={`${part.slice(0, 12)}-${index}`}>{part}</span>;
      })}
    </p>
  );
}
