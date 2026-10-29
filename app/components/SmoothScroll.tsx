"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger, getLenis, prefersReducedMotion, setLenis } from "@/lib/scroll";

// Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync.
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      // Touch keeps native momentum scrolling, which feels right on phones
      syncTouch: false,
      prevent: (node) => node.closest?.("[data-lenis-prevent]") != null,
      // In-page links (e.g. the services index) glide instead of jumping
      anchors: { offset: -96 },
    });
    setLenis(lenis);

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  // New page: jump to the top and re-measure every ScrollTrigger
  useEffect(() => {
    const lenis = getLenis();
    if (!window.location.hash) lenis?.scrollTo(0, { immediate: true, force: true }); // force: the loader has scrolling paused
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
