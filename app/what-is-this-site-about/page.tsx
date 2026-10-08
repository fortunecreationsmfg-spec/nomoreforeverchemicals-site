import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqList } from "@/components/FaqList";
import { RichText } from "@/components/RichText";
import { SITE_UPDATED } from "@/lib/constants";
import { ABOUT_FAQS, ABOUT_SECTIONS } from "@/lib/copy";
import { formatDate } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "What is this site about?",
  description:
    "No More Forever Chemicals explains PFAS, where they show up at home, and which Amazon listings the guides recommend. Operated by FortuneCreations, LLC.",
  path: "/what-is-this-site-about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ name: "What is this site about?", href: "/what-is-this-site-about" }]} />
      <h1 className="mt-4 font-display text-4xl text-forest sm:text-5xl">What is this site about?</h1>
      <p className="mt-3 text-sm text-muted">
        Last updated <time dateTime={SITE_UPDATED}>{formatDate(SITE_UPDATED)}</time>
      </p>
      <div className="mt-6 space-y-8 leading-8 text-muted">
        {ABOUT_SECTIONS.map((section) => (
          <section key={section.heading ?? section.paragraphs[0]?.slice(0, 24)}>
            {section.heading ? <h2 className="font-display text-2xl text-forest">{section.heading}</h2> : null}
            <div className="mt-3 space-y-3">
              {section.paragraphs.map((paragraph) => (
                <RichText key={paragraph.slice(0, 40)} text={paragraph} />
              ))}
            </div>
          </section>
        ))}
      </div>
      <FaqList faqs={ABOUT_FAQS} />
    </div>
  );
}
