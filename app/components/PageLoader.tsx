"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { pauseScroll, ScrollTrigger } from "@/lib/scroll";
import { setPageReady } from "@/lib/pageReady";
import LogoMark from "./LogoMark";

/**
 * Full-screen loader shown on the first visit and on every page change.
 * It waits until every image on the incoming page (and the fonts) has loaded,
 * shows real progress while it waits, then lifts away to reveal the page.
 *
 *   loading   covering the screen, counting assets
 *   leaving   sliding up off the screen
 *   idle      gone
 *   covering  sliding in from below after a link click, before navigating
 */
type Phase = "loading" | "leaving" | "idle" | "covering";

const COVER_MS = 550; // matches the CSS slide-in
const LEAVE_MS = 800; // matches the CSS slide-out
const FULL_MS = 650; // lets the logo finish filling and shine before the reveal
const MIN_FIRST_MS = 900; // so the first visit never just flickers
const MIN_NAV_MS = 350;
const MAX_WAIT_MS = 12000; // never hold someone hostage to one slow image

function shouldIgnoreClick(event: MouseEvent) {
  return (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  );
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
const nextFrame = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

/** Loads every image on the page (lazy ones too) and reports progress from 0 to 1. */
function loadPageAssets(onProgress: (p: number) => void) {
  const images = Array.from(document.images).filter((img) => !img.closest("[data-page-loader]"));
  const tasks: Promise<unknown>[] = [];

  for (const img of images) {
    // Start lazy images now, so nothing pops in after the reveal
    if (img.loading === "lazy") img.loading = "eager";
    tasks.push(
      img.complete
        ? Promise.resolve()
        : new Promise<void>((resolve) => {
            img.addEventListener("load", () => resolve(), { once: true });
            img.addEventListener("error", () => resolve(), { once: true });
          }).then(() => img.decode?.().catch(() => {})),
    );
  }
  if (document.fonts?.ready) tasks.push(document.fonts.ready);

  let done = 0;
  const total = tasks.length;
  onProgress(total ? 0 : 1);
  return Promise.all(
    tasks.map((t) =>
      t.finally(() => {
        done += 1;
        onProgress(done / total);
      }),
    ),
  );
}

export default function PageLoader() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("loading");
  const [progress, setProgress] = useState(0);
  const phaseRef = useRef<Phase>("loading");
  const navigating = useRef(false);
  const firstRun = useRef(true);
  const runId = useRef(0);

  const go = (next: Phase) => {
    phaseRef.current = next;
    setPhase(next);
  };

  // Lock scrolling while the loader is on screen
  useEffect(() => {
    const visible = phase !== "idle";
    pauseScroll(visible);
    document.documentElement.style.overflow = visible ? "hidden" : "";
  }, [phase]);

  // Wait for the current page's images, then reveal it
  useEffect(() => {
    const isFirst = firstRun.current;
    firstRun.current = false;

    // Back/forward buttons change the page without a click: no cover, just carry on
    if (!isFirst && !navigating.current) return;
    navigating.current = false;

    const id = ++runId.current;
    let cancelled = false;
    go("loading");

    (async () => {
      const started = performance.now();
      await nextFrame(); // let the new page render its images first
      await Promise.race([
        loadPageAssets((p) => !cancelled && setProgress(p)),
        wait(MAX_WAIT_MS),
      ]);
      const min = isFirst ? MIN_FIRST_MS : MIN_NAV_MS;
      await wait(Math.max(0, min - (performance.now() - started)));
      if (cancelled || id !== runId.current) return;

      setProgress(1);
      ScrollTrigger.refresh();
      await wait(FULL_MS);
      if (cancelled || id !== runId.current) return;
      go("leaving");
      setPageReady(true);
      await wait(LEAVE_MS);
      if (!cancelled && id === runId.current) go("idle");
    })();

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  // Internal link clicks: cover the screen first, then navigate
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (shouldIgnoreClick(event) || phaseRef.current !== "idle") return;

      const anchor = (event.target as Element | null)?.closest("a");
      if (!anchor || !(anchor instanceof HTMLAnchorElement)) return;
      if (
        anchor.target === "_blank" ||
        anchor.hasAttribute("download") ||
        anchor.getAttribute("rel")?.includes("external")
      ) {
        return;
      }

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      // Same page (maybe a different #section): let the browser handle it
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;

      event.preventDefault();
      setPageReady(false);
      setProgress(0);
      go("covering");
      navigating.current = true;
      router.prefetch(url.pathname);
      window.setTimeout(() => router.push(url.pathname + url.search + url.hash), COVER_MS);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  if (phase === "idle") return null;

  const pct = Math.round(progress * 100);

  return (
    <div
      data-page-loader
      data-phase={phase}
      data-boot={phase === "loading" && progress === 0 ? "" : undefined}
      role="status"
      aria-live="polite"
      aria-label={`Loading page, ${pct}%`}
      className="page-loader fixed inset-0 z-[2147483646] flex flex-col items-center justify-center overflow-hidden bg-[#050409] text-white"
    >
      <div
        aria-hidden
        className="page-loader__glow pointer-events-none absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(109,59,255,0.45), rgba(70,30,200,0.12) 60%, transparent)" }}
      />

      <div className="page-loader__content relative flex flex-col items-center">
        <LogoMark progress={progress} complete={progress >= 1} className="h-24 w-auto overflow-visible md:h-28" />

        <p
          aria-hidden
          className="unbounded mt-9 flex text-[12px] font-semibold uppercase tracking-[0.42em] text-white/85 md:text-[13px]"
        >
          {"Elite Ayomide".split("").map((ch, i) => (
            <span key={i} className="loader-letter" style={{ animationDelay: `${0.35 + i * 0.04}s` }}>
              {ch === " " ? " " : ch}
            </span>
          ))}
        </p>
        <p className="unbounded mt-4 text-[11px] tabular-nums tracking-[0.2em] text-[#F8A308]/80">
          {String(pct).padStart(3, "0")}
        </p>
      </div>

      {/* Gold edge that trails the panel as it lifts away */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[2px] bg-linear-to-r from-transparent via-[#F8A308] to-transparent" />
    </div>
  );
}
