import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RichText } from "@/components/RichText";
import { PRIVACY_UPDATED } from "@/lib/constants";
import { PRIVACY_SECTIONS } from "@/lib/copy";
import { formatDate } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "Privacy policy for No More Forever Chemicals, operated by FortuneCreations, LLC. The site links to Amazon and to brand partners such as iSpring and Purewell, with an optional beehiiv newsletter and Vercel Analytics.",
  path: "/privacy-policy",
});

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ name: "Privacy Policy", href: "/privacy-policy" }]} />
      <h1 className="mt-4 font-display text-4xl text-forest sm:text-5xl">Privacy Policy</h1>
      <p className="mt-3 text-sm text-muted">
        Last updated <time dateTime={PRIVACY_UPDATED}>{formatDate(PRIVACY_UPDATED)}</time>
      </p>
      <div className="mt-6 space-y-8 leading-8 text-muted">
        {PRIVACY_SECTIONS.map((section) => (
          <section key={section.heading ?? section.paragraphs[0]?.slice(0, 24)}>
            {section.heading ? <h2 className="font-display text-2xl text-forest">{section.heading}</h2> : null}
            <div className="mt-3 space-y-3">
              {section.paragraphs.map((paragraph) => (
                <RichText key={paragraph.slice(0, 48)} text={paragraph} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
