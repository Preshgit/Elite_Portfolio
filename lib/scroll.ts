"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// The single Lenis instance, set by <SmoothScroll />. Null when reduced motion is on.
let lenis: Lenis | null = null;

export const setLenis = (instance: Lenis | null) => {
  lenis = instance;
};

export const getLenis = () => lenis;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Smooth-scroll to a y position or element, falling back to native scrolling. */
export function scrollToTarget(target: number | string | HTMLElement) {
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.2 });
    return;
  }
  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" });
  } else {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: "smooth" });
  }
}

export function pauseScroll(paused: boolean) {
  if (!lenis) return;
  if (paused) lenis.stop();
  else lenis.start();
}

export { gsap, ScrollTrigger };
