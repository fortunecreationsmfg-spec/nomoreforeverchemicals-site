import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { withAmazonTag } from "@/lib/amazon";
import { imageMeta } from "@/lib/image-meta";

function MdLink({ href, children }: { href?: string; children?: ReactNode }) {
  if (!href) return <span>{children}</span>;
  const url = withAmazonTag(href);
  const amazon = /amazon\.com|amzn\.to/i.test(url);
  if (url.startsWith("/")) {
    return (
      <Link href={url} className="underline decoration-teal underline-offset-4">
        {children}
      </Link>
    );
  }
  return (
    <a
      href={url}
      target="_blank"
      rel={amazon ? "sponsored nofollow noopener" : "noopener noreferrer"}
    >
      {children}
    </a>
  );
}

function MdImage({ src, alt }: { src?: string; alt?: string }) {
  if (!src || !src.startsWith("/")) return null;
  const { width, height } = imageMeta(src);
  return (
    <Image
      src={src}
      alt={alt || ""}
      width={width}
      height={height}
      className="my-6 h-auto w-full rounded-2xl"
      sizes="(min-width: 768px) 720px, 100vw"
    />
  );
}

export function Markdown({ source }: { source: string }) {
  return (
    <div className="markdown">
      <MDXRemote
        source={source}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        components={{ a: MdLink, img: MdImage }}
      />
    </div>
  );
}
