import { JsonLd } from "@/components/JsonLd";
import { faqJsonLd } from "@/lib/schema";
import type { Faq } from "@/lib/takeaways";

export function FaqList({ faqs, title = "Questions" }: { faqs: Faq[]; title?: string }) {
  if (!faqs.length) return null;

  return (
    <section className="mt-12">
      <h2 className="font-display text-3xl text-forest">{title}</h2>
      <div className="mt-5 grid gap-4">
        {faqs.map((faq) => (
          <article key={faq.question} className="rounded-2xl border border-line bg-white p-5">
            <h3 className="font-display text-xl text-forest">{faq.question}</h3>
            <p className="mt-2 leading-7 text-muted">{faq.answer}</p>
          </article>
        ))}
      </div>
      <JsonLd data={faqJsonLd(faqs)} />
    </section>
  );
}
