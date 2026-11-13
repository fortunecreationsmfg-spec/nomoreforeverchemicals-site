import type { ReactNode } from "react";
import { AnnouncementBanner } from "@/components/AnnouncementBanner";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { announcementPhase } from "@/lib/seasonal";

export function SiteShell({ children }: { children: ReactNode }) {
  const phase = announcementPhase();

  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-teal focus:px-4 focus:py-2 focus:text-forest"
      >
        Skip to content
      </a>
      {phase === "off" ? null : <AnnouncementBanner phase={phase} />}
      <Header />
      <main id="content" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
