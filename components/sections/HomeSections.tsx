import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqList } from "@/components/FaqList";
import { PostCard } from "@/components/PostCard";
import { Quiz } from "@/components/Quiz";
import { CONTACT_EMAIL, NEWSLETTER_URL, SITE_UPDATED } from "@/lib/constants";
import { GALLERY, GUIDE_CARDS, HOME_FAQS, IMPACT, WHERE_FOUND } from "@/lib/copy";
import { formatDate } from "@/lib/format";
import { getAllPosts } from "@/lib/posts";

export function HomeSections() {
  const latest = getAllPosts().slice(0, 3);

  return (
    <>
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
        <div>
          <Breadcrumbs items={[]} />
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-teal">No More Forever Chemicals</p>
          <h1 className="mt-3 font-display text-4xl leading-tight text-forest sm:text-6xl">
            Protecting your home from forever chemicals
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-8 text-muted">
            PFAS — known as forever chemicals — are hiding in everyday products. You can&apos;t see or smell them, but science shows they may be seriously affecting your health.
          </p>
          <p className="mt-3 text-sm text-muted">
            Last updated <time dateTime={SITE_UPDATED}>{formatDate(SITE_UPDATED)}</time>
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/non-toxic-products" className="btn-primary">
              Explore PFAS-free products
            </Link>
            <Link href="/blog" className="btn-secondary">
              Read the research
            </Link>
            <a href={NEWSLETTER_URL} className="btn-secondary" target="_blank" rel="noopener noreferrer">
              Newsletter
            </a>
          </div>
        </div>
        <Quiz />
      </section>

      <section className="bg-beige">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="font-display text-3xl text-forest sm:text-4xl">They&apos;re in your food. Your water. Your home.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {IMPACT.map((item) => (
              <article key={item.figure} className="rounded-3xl bg-cream p-5">
                <p className="font-display text-3xl text-forest">{item.figure}</p>
                <p className="mt-2 leading-7 text-muted">{item.text}</p>
              </article>
            ))}
          </div>
          <p className="mt-6">
            <a href="#latest-research" className="font-semibold underline decoration-teal underline-offset-4">
              Dive into the research
            </a>
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-3xl text-forest sm:text-4xl">What are forever chemicals and PFAS?</h2>
        <p className="mt-4 max-w-3xl leading-8 text-muted">
          PFAS (per- and polyfluoroalkyl substances) are a family of over 12,000 synthetic chemicals manufactured since the 1940s. Their carbon-fluorine bond is one of the strongest in chemistry, making them resistant to water, oil, and heat — and nearly impossible to break down. They persist in the environment for centuries and accumulate in the human body for years. That is why they are called forever chemicals.
        </p>
        <h3 className="mt-8 font-display text-2xl text-forest">Where are they found?</h3>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {WHERE_FOUND.map((item) => (
            <article key={item.title} className="rounded-3xl border border-line bg-white p-5">
              <h4 className="font-display text-xl text-forest">{item.title}</h4>
              <p className="mt-2 leading-7 text-muted">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-forest text-cream">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="font-display text-3xl sm:text-4xl">Curated PFAS-free guide</h2>
          <p className="mt-3 max-w-2xl text-sage">
            Discover alternatives the site highlights for a less toxic kitchen, home textiles, and personal care.
          </p>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {GUIDE_CARDS.map((card) => (
              <article key={card.title} className="overflow-hidden rounded-3xl bg-cream text-forest">
                <Image src={card.image} alt={card.alt} width={900} height={600} className="aspect-[3/2] w-full object-cover" />
                <div className="p-5">
                  <h3 className="font-display text-2xl">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{card.text}</p>
                  <Link href={card.href} className="mt-4 inline-flex font-semibold underline decoration-teal underline-offset-4">
                    {card.cta}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="latest-research" className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <Image
            src="/media/e97c8d_a22dc5a99c66464c8a252a84a788de2f_mv2.webp"
            alt="Illustration from the research section"
            width={800}
            height={800}
            className="w-full rounded-3xl bg-beige object-cover"
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">Empirical data 2026</p>
            <h2 className="mt-2 font-display text-3xl text-forest sm:text-4xl">The latest science on PFAS persistence</h2>
            <h3 className="mt-5 font-display text-xl">Bioaccumulation in water systems</h3>
            <p className="mt-2 leading-7 text-muted">
              Recent longitudinal studies demonstrate how forever chemicals infiltrate local aquifers, persisting for decades without natural degradation. Understanding these cycles is the first step toward effective filtration and community protection.
            </p>
            <h3 className="mt-5 font-display text-xl">Advances in non-toxic materials</h3>
            <p className="mt-2 leading-7 text-muted">
              Emerging research highlights biodegradable alternatives that rival the performance of PFAS-based coatings in cookware and textiles. The blog tracks the swaps you can make now.
            </p>
            <Link href="/blog" className="btn-primary mt-6">
              Read all articles
            </Link>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="font-display text-3xl text-forest">Deep dives into PFAS research</h2>
          <p className="mt-2 text-muted">The latest updates, research breakthroughs, and community guides on living with fewer forever chemicals.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {GALLERY.map((item, index) => (
              <Link key={item.href} href={item.href} className="group overflow-hidden rounded-3xl border border-line bg-white">
                <Image src={item.image} alt={item.title} width={800} height={520} className="aspect-[4/3] w-full object-cover" />
                <p className="p-4 font-display text-xl group-hover:underline">
                  {String(index + 1).padStart(2, "0")} — {item.title}
                </p>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h2 className="font-display text-3xl text-forest">From the blog</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {latest.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>

        <FaqList faqs={HOME_FAQS} title="Common questions" />
      </section>

      <section className="bg-beige">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-14 sm:px-6 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl text-forest">Get in touch</h2>
            <p className="mt-3 leading-7 text-muted">
              Have questions about PFAS or want to share your journey toward a non-toxic lifestyle? We&apos;d love to hear about it.
            </p>
            <p className="mt-4">
              <a className="font-semibold underline decoration-teal underline-offset-4" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
          <div className="rounded-3xl bg-white p-6">
            <h2 className="font-display text-2xl text-forest">Twice-a-month newsletter</h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              The signup lives on beehiiv. It is optional, and you can read every guide on this site without it.
            </p>
            <a href={NEWSLETTER_URL} className="btn-primary mt-5" target="_blank" rel="noopener noreferrer">
              Sign up for the newsletter
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
