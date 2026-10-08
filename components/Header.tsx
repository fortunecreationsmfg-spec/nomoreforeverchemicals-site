"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandMark } from "@/components/BrandMark";
import { BRAND, NAV, NEWSLETTER_URL } from "@/lib/constants";

function active(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  if (href === "/blog") {
    return pathname === "/blog" || pathname.startsWith("/blog/") || pathname.startsWith("/post/");
  }
  if (href === "/non-toxic-products") {
    return pathname === "/non-toxic-products" || pathname.startsWith("/products/");
  }
  return pathname === href;
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 font-display text-lg text-forest">
          <BrandMark />
          <span className="max-w-[12rem] leading-tight sm:max-w-none">{BRAND}</span>
        </Link>

        <nav className="hidden items-center gap-5 text-sm text-muted lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={active(item.href, pathname) ? "text-forest" : "hover:text-forest"}
              aria-current={active(item.href, pathname) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={NEWSLETTER_URL} className="btn-primary hidden sm:inline-flex" target="_blank" rel="noopener noreferrer">
            Newsletter
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">Menu</span>
            <span aria-hidden="true">{open ? "×" : "☰"}</span>
          </button>
        </div>
      </div>

      {open ? (
        <nav id="mobile-nav" className="border-t border-line px-4 py-4 lg:hidden" aria-label="Mobile">
          <div className="flex flex-col gap-3 text-base">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <a href={NEWSLETTER_URL} target="_blank" rel="noopener noreferrer" className="font-semibold">
              Newsletter
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
