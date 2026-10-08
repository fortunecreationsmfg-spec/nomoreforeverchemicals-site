"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { NEWSLETTER_URL } from "@/lib/constants";
import { QUIZ_QUESTIONS, QUIZ_RESULTS, QUIZ_SCORING } from "@/lib/copy";

export function Quiz() {
  const [pans, setPans] = useState("");
  const [items, setItems] = useState<string[]>([]);
  const [baby, setBaby] = useState("");

  const score = useMemo(() => {
    let total = 0;
    if (pans === "Yes") total += 2;
    if (pans === "Sometimes") total += 1;
    for (const item of items) {
      if (item !== "Water filters") total += 1;
    }
    if (baby === "Yes") total += 2;
    return total;
  }, [baby, items, pans]);

  const ready = pans !== "" && baby !== "";
  const band = !ready ? null : score <= 1 ? "lower" : score <= 3 ? "mixed" : "higher";

  function toggleItem(option: string) {
    setItems((current) =>
      current.includes(option) ? current.filter((item) => item !== option) : [...current, option],
    );
  }

  return (
    <section id="quiz" className="rounded-3xl border border-line bg-white p-5 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">Quick risk snapshot</p>
      <h2 className="mt-2 font-display text-2xl text-forest">PFAS in your home</h2>
      <p className="mt-2 text-sm leading-6 text-muted">
        Answer on this page. No email is required. The three result guides below are always visible.
      </p>

      <fieldset className="mt-5">
        <legend className="font-semibold text-forest">{QUIZ_QUESTIONS.pans.prompt}</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {QUIZ_QUESTIONS.pans.options.map((option) => (
            <label key={option} className={`cursor-pointer rounded-full border px-3 py-1.5 text-sm ${pans === option ? "border-forest bg-teal-soft" : "border-line"}`}>
              <input
                className="sr-only"
                type="radio"
                name="pans"
                value={option}
                checked={pans === option}
                onChange={() => setPans(option)}
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-5">
        <legend className="font-semibold text-forest">{QUIZ_QUESTIONS.items.prompt}</legend>
        <div className="mt-3 grid gap-2">
          {QUIZ_QUESTIONS.items.options.map((option) => (
            <label key={option} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={items.includes(option)}
                onChange={() => toggleItem(option)}
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-5">
        <legend className="font-semibold text-forest">{QUIZ_QUESTIONS.baby.prompt}</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {QUIZ_QUESTIONS.baby.options.map((option) => (
            <label key={option} className={`cursor-pointer rounded-full border px-3 py-1.5 text-sm ${baby === option ? "border-forest bg-teal-soft" : "border-line"}`}>
              <input
                className="sr-only"
                type="radio"
                name="baby"
                value={option}
                checked={baby === option}
                onChange={() => setBaby(option)}
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      <p className="mt-5 text-sm leading-6 text-muted">{QUIZ_SCORING}</p>
      <p className="mt-3 text-sm font-semibold text-forest" aria-live="polite">
        {ready
          ? `Your snapshot score is ${score}. It matches the ${band} guide below.`
          : "Choose an answer for the pan question and the baby-products question to highlight a snapshot."}
      </p>

      <div className="mt-4 grid gap-3">
        {QUIZ_RESULTS.map((result) => {
          const selected = band === result.id;
          return (
            <article
              key={result.id}
              id={`snapshot-${result.id}`}
              className={`rounded-2xl border p-4 ${selected ? "border-teal bg-teal-soft" : "border-line bg-cream"}`}
            >
              <h3 className="font-display text-lg text-forest">
                {result.title}
                <span className="ml-2 text-sm font-sans font-normal text-muted">{result.detail}</span>
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted">{result.body}</p>
            </article>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <Link href="/non-toxic-products" className="btn-primary">
          Explore PFAS-free products
        </Link>
        <Link href="/blog" className="btn-secondary">
          Read the research
        </Link>
      </div>
      <p className="mt-4 text-sm text-muted">
        The newsletter is optional.{" "}
        <a href={NEWSLETTER_URL} className="underline decoration-teal underline-offset-4" target="_blank" rel="noopener noreferrer">
          Sign up for the twice-a-month newsletter
        </a>
        .
      </p>
    </section>
  );
}
