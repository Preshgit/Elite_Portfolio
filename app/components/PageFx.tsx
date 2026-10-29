"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { SplitText } from "gsap/SplitText";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/scroll";
import { whenPageReady } from "@/lib/pageReady";

/**
 * Scroll effects for server-rendered sections, driven by data attributes:
 *   data-fx="rise"      fades and lifts in when it enters
 *   data-fx="words"     a heading whose words rise out of a mask
 *   data-fx="stagger"   its direct children rise one after another
 *   data-fx="wipe"      a clip-path wipe reveals it (left to right)
 *   data-fx="parallax"  drifts against the scroll; data-speed sets how far (yPercent)
 *   data-fx="arc"       the closing arc rises to meet the reader
 * Effects are set up once the page loader has lifted, so reveals play in view.
 * With reduced motion on, nothing runs and everything is simply visible.
 */
export default function PageFx() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    gsap.registerPlugin(SplitText);

    let ctx: gsap.Context | undefined;
    let cancelled = false;

    // Split text only once the real fonts are in, or the line breaks are wrong
    const cancelReady = whenPageReady(() => (document.fonts?.ready ?? Promise.resolve()).then(() => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        const enter = (trigger: Element) => ({
          trigger,
          start: "top 85%",
          once: true,
        });

        gsap.utils.toArray<HTMLElement>("[data-fx=rise]").forEach((el) => {
          gsap.from(el, {
            y: 48,
            autoAlpha: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: enter(el),
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-fx=words]").forEach((el) => {
          const split = SplitText.create(el, { type: "words", mask: "words" });
          gsap.from(split.words, {
            yPercent: 110,
            duration: 0.9,
            ease: "power4.out",
            stagger: 0.05,
            scrollTrigger: enter(el),
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-fx=stagger]").forEach((el) => {
          gsap.from(el.children, {
            y: 40,
            autoAlpha: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.07,
            scrollTrigger: enter(el),
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-fx=wipe]").forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: "inset(0% 100% 0% 0% round 24px)" },
            {
              clipPath: "inset(0% 0% 0% 0% round 24px)",
              duration: 1.2,
              ease: "power4.inOut",
              scrollTrigger: enter(el),
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-fx=parallax]").forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: -Number(el.dataset.speed ?? 10) },
            {
              yPercent: Number(el.dataset.speed ?? 10),
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-fx=arc]").forEach((el) => {
          gsap.from(el, {
            yPercent: 28,
            scale: 0.9,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "top 35%", scrub: true },
          });
        });
      });
      ScrollTrigger.refresh();
    }));

    return () => {
      cancelled = true;
      cancelReady();
      ctx?.revert();
    };
  }, [pathname]);

  return null;
}
