export type Faq = {
  question: string;
  answer: string;
};

function stripMarkdown(input: string): string {
  return input
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`>#]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function firstSentence(text: string): string {
  const sentence = text.split(/(?<=\.)\s/)[0]?.trim() ?? text;
  if (sentence.length >= 40) return sentence;
  return text;
}

export function deriveTakeaways(markdown: string): string[] {
  const items: string[] = [];
  for (const line of markdown.split("\n")) {
    const match = line.match(/^\s*(?:[-*]|\d+\.)\s+(.+)/);
    if (!match) continue;
    let text = stripMarkdown(match[1] ?? "");
    if (text.length > 220) text = firstSentence(text);
    if (text.length > 220) text = text.slice(0, 200).replace(/\s+\S*$/, "");
    if (text.length < 28) continue;
    items.push(text);
  }

  const unique = [...new Set(items)];
  if (unique.length >= 2) return unique.slice(0, 4);

  const sentences: string[] = [];
  for (const chunk of markdown.split(/\n\s*\n/)) {
    const trimmed = chunk.trim();
    if (!trimmed || trimmed.startsWith("#") || trimmed.startsWith("!")) continue;
    const text = stripMarkdown(trimmed);
    if (text.length < 50) continue;
    const sentence = firstSentence(text);
    if (sentence.length >= 40 && sentence.length <= 240) sentences.push(sentence);
    if (sentences.length >= 3) break;
  }
  return [...new Set(sentences)].slice(0, 4);
}

function isQuestionHeading(text: string): boolean {
  if (!text) return false;
  if (text.includes("?")) return true;
  return /^(what|why|how|where|when|who|do|does|did|are|is|can|could|should|which)\b/i.test(text);
}

export function extractFaqs(markdown: string): Faq[] {
  const lines = markdown.split("\n");
  const faqs: Faq[] = [];

  for (let i = 0; i < lines.length; i += 1) {
    const heading = lines[i]?.match(/^#{2,3}\s+(.+)$/);
    if (!heading) continue;
    const question = stripMarkdown(heading[1] ?? "");
    if (!isQuestionHeading(question)) continue;

    const buffer: string[] = [];
    for (let j = i + 1; j < lines.length; j += 1) {
      if (/^#{1,3}\s+/.test(lines[j] ?? "")) break;
      buffer.push(lines[j] ?? "");
    }

    let answer = stripMarkdown(buffer.join(" "));
    if (answer.length < 40) continue;
    if (answer.length > 520) {
      const cut = answer.slice(0, 520);
      const sentenceEnd = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("? "));
      answer = sentenceEnd > 140 ? cut.slice(0, sentenceEnd + 1) : `${cut.replace(/\s+\S*$/, "")}…`;
    }
    faqs.push({ question, answer });
  }

  return faqs;
}
