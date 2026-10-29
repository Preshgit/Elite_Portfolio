"use client";

import { useEffect } from "react";
import { gsap, prefersReducedMotion } from "@/lib/scroll";

// Each service scene is sticky; as the next one slides over it, the one
// underneath settles back (scales down and dims), like a deck of offers.
// Also draws the "how to start" line as it scrolls into view.
export default function StackFx() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (min-height: 640px)", () => {
        const panels = gsap.utils.toArray<HTMLElement>("[data-stack]");
        panels.forEach((panel, i) => {
          const next = panels[i + 1];
          if (!next) return;
          const scroll = {
            trigger: next,
            start: "top bottom",
            end: "top 15%",
            scrub: true,
          };
          gsap.to(panel.querySelector("[data-stack-inner]"), {
            scale: 0.92,
            ease: "none",
            scrollTrigger: scroll,
          });
          gsap.to(panel.querySelector("[data-stack-shade]"), {
            opacity: 0.6,
            ease: "none",
            scrollTrigger: { ...scroll },
          });
        });
      });

      // Active state in the index as each scene arrives
      gsap.utils.toArray<HTMLElement>("[data-stack]").forEach((panel) => {
        const link = document.querySelector(`[data-index-link="${panel.id}"]`);
        if (!link) return;
        gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            start: "top 55%",
            end: "bottom 55%",
            toggleClass: { targets: link, className: "is-active" },
          },
        });
      });

      const path = document.querySelector<SVGPathElement>("[data-steps-line]");
      if (path) {
        const length = path.getTotalLength();
        gsap.fromTo(
          path,
          { strokeDasharray: length, strokeDashoffset: length },
          {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: { trigger: path, start: "top 85%", end: "bottom 45%", scrub: true },
          },
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return null;
}
