import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/format";
import type { Post } from "@/lib/posts";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white">
      {post.cover ? (
        <Link href={`/post/${post.slug}`} className="block bg-beige">
          <Image
            src={post.cover}
            alt=""
            width={800}
            height={450}
            className="aspect-[16/9] w-full object-cover"
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          />
        </Link>
      ) : null}
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          {post.category || "Guide"} · {formatDate(post.date)}
        </p>
        <h2 className="mt-2 font-display text-2xl leading-tight text-forest">
          <Link href={`/post/${post.slug}`}>{post.title}</Link>
        </h2>
        <p className="mt-3 flex-1 text-sm leading-6 text-muted">{post.excerpt}</p>
        <p className="mt-4 text-sm text-muted">{post.author}</p>
      </div>
    </article>
  );
}
