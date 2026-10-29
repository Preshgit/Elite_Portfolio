"use client";

import { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Play, Send } from "lucide-react";
import AnimatedLine from "../../AnimatedBrush";
import { openVimeoMiniPlayer } from "../../VimeoMiniPlayer";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/scroll";
import { whenPageReady } from "@/lib/pageReady";

// ---------- Decorative price chart (no axis, no prices: it is art, not data) ----------

const W = 1440;
const H = 520;

function useCandles() {
  return useMemo(() => {
    // Seeded so server and browser draw the same chart
    let seed = 7;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    const count = 46;
    const step = W / count;
    let price = H * 0.78;
    const candles = [];
    const closes: [number, number][] = [];
    for (let i = 0; i < count; i++) {
      // Gentle up-trend with pullbacks
      const drift = -H * 0.012;
      const move = (rand() - 0.42) * H * 0.07 + drift;
      const open = price;
      const close = Math.min(H * 0.92, Math.max(H * 0.08, price + move));
      const high = Math.min(open, close) - rand() * H * 0.04;
      const low = Math.max(open, close) + rand() * H * 0.04;
      const x = i * step + step / 2;
      candles.push({ x, open, close, high, low, up: close < open });
      closes.push([x, close]);
      price = close;
    }
    const line = closes
      .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`)
      .join(" ");
    return { candles, line, step };
  }, []);
}

function PriceChart() {
  const { candles, line, step } = useCandles();
  const body = step * 0.42;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className="h-full w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="hero-line" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#6d3bff" stopOpacity="0.2" />
          <stop offset="0.6" stopColor="#8b6bff" stopOpacity="0.8" />
          <stop offset="1" stopColor="#f8a308" />
        </linearGradient>
        <linearGradient id="hero-area" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#6d3bff" stopOpacity="0.22" />
          <stop offset="1" stopColor="#6d3bff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g data-candles>
        {candles.map((c, i) => (
          <g
            key={i}
            data-candle
            fill={c.up ? "rgba(248,163,8,0.55)" : "rgba(139,107,255,0.35)"}
            stroke={c.up ? "rgba(248,163,8,0.55)" : "rgba(139,107,255,0.35)"}
          >
            <line x1={c.x} x2={c.x} y1={c.high} y2={c.low} strokeWidth="1.5" />
            <rect
              x={c.x - body / 2}
              y={Math.min(c.open, c.close)}
              width={body}
              height={Math.max(2, Math.abs(c.close - c.open))}
              rx="1.5"
              stroke="none"
            />
          </g>
        ))}
      </g>
      <path d={`${line} L${W} ${H} L0 ${H} Z`} fill="url(#hero-area)" data-area />
      <path
        d={line}
        fill="none"
        stroke="url(#hero-line)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        data-line
      />
    </svg>
  );
}

// ---------- Scene ----------

export default function HeroScene() {
  const root = useRef<HTMLElement>(null);
  const router = useRouter();

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    let cancelIntro = () => {};
    const ctx = gsap.context(() => {
      const line = el.querySelector<SVGPathElement>("[data-line]");
      const length = line?.getTotalLength() ?? 0;

      // Opening: the chart draws, then the trader steps into the light.
      // It waits (paused, in its start pose) until the page loader lifts.
      const intro = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
      cancelIntro = whenPageReady(() => intro.play());
      if (line) {
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
        intro.to(line, { strokeDashoffset: 0, duration: 2.2, ease: "power2.inOut" }, 0);
      }
      intro
        .from("[data-candle]", {
          scaleY: 0,
          transformOrigin: "50% 100%",
          opacity: 0,
          duration: 0.5,
          stagger: 0.025,
        }, 0.1)
        .from("[data-area]", { opacity: 0, duration: 1.6 }, 0.6)
        .fromTo("[data-intro]", { y: 36, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.08 }, 0.15)
        .from("[data-subject-img]", { y: 70, autoAlpha: 0, scale: 0.96, duration: 1.3 }, 0.35)
        .from("[data-halo]", { scale: 0.7, autoAlpha: 0, duration: 1.6 }, 0.3)
        .from("[data-float]", { scale: 0.6, autoAlpha: 0, duration: 1.2, stagger: 0.12 }, 0.6);

      // Idle drift for the coins and glass, paused when the hero is off screen
      const idle = gsap.utils.toArray<HTMLElement>("[data-float]").map((node, i) =>
        gsap.to(node, {
          y: i % 2 ? 14 : -14,
          rotation: i % 2 ? -6 : 6,
          duration: 3.2 + i * 0.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        }),
      );

      // Scroll: each plane travels at its own rate, so the scene separates in depth
      const planes: [string, gsap.TweenVars][] = [
        ["[data-plane=far]", { yPercent: 22 }],
        ["[data-plane=chart]", { yPercent: 30, opacity: 0.35 }],
        ["[data-plane=halo]", { yPercent: 16, scale: 1.12 }],
        ["[data-plane=subject]", { yPercent: 9, scale: 1.05 }],
        ["[data-plane=copy]", { yPercent: 40, autoAlpha: 0 }],
        ["[data-plane=near-ring]", { yPercent: -70, xPercent: -12, rotation: -18 }],
        ["[data-plane=near-coin]", { yPercent: -110, rotation: 28 }],
        ["[data-plane=far-coin]", { yPercent: 45 }],
      ];
      const scroll = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: true,
          onToggle: (self) => idle.forEach((t) => (self.isActive ? t.play() : t.pause())),
        },
      });
      planes.forEach(([sel, vars]) => scroll.to(sel, vars, 0));

      // Pointer depth on desktop only (never required, never captures the cursor)
      const mm = gsap.matchMedia();
      mm.add("(hover: hover) and (pointer: fine) and (min-width: 1024px)", () => {
        const layers = gsap.utils.toArray<HTMLElement>("[data-depth]").map((node) => ({
          depth: Number(node.dataset.depth),
          x: gsap.quickTo(node, "x", { duration: 0.9, ease: "power3.out" }),
          y: gsap.quickTo(node, "y", { duration: 0.9, ease: "power3.out" }),
        }));
        const onMove = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          layers.forEach((l) => {
            l.x(nx * l.depth);
            l.y(ny * l.depth * 0.6);
          });
        };
        el.addEventListener("pointermove", onMove);
        return () => el.removeEventListener("pointermove", onMove);
      });
    }, el);

    // Fonts and the portrait change layout height; re-measure once they settle
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);

    return () => {
      cancelIntro();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={root}
      id="hero"
      // Phones/tablets: text on top, portrait below it (nothing covers his face).
      // Desktop: one full-screen stage with the portrait beside the text.
      className="relative isolate flex min-h-svh w-full flex-col overflow-hidden bg-[#05040a] lg:block lg:h-svh lg:min-h-[660px]"
    >
      {/* FAR: glow + perspective grid floor */}
      <div data-plane="far" className="absolute inset-0 -z-10 will-change-transform">
        <div data-depth="-8" className="absolute inset-0">
          <div
            className="absolute left-1/2 -top-[30%] h-[90%] w-[120%] -translate-x-1/2"
            style={{
              background:
                "radial-gradient(closest-side, rgba(109,59,255,0.55), rgba(70,30,200,0.22) 50%, transparent 100%)",
            }}
          />
          <div className="absolute inset-x-[-30%] bottom-[-4%] h-[48%] [perspective:700px]">
            <div
              className="h-full w-full origin-top [transform:rotateX(62deg)]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(139,107,255,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(139,107,255,0.22) 1px, transparent 1px)",
                backgroundSize: "72px 72px",
                maskImage: "linear-gradient(to bottom, transparent, black 25%, black 60%, transparent)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent, black 25%, black 60%, transparent)",
              }}
            />
          </div>
        </div>
      </div>

      {/* FAR COIN: small, soft, distant */}
      <div
        data-plane="far-coin"
        className="absolute left-[46%] top-[16%] -z-10 w-[5vw] min-w-10 max-w-20 opacity-60 blur-[2px] hidden md:block"
      >
        <div data-depth="-14">
          <Image data-float src="/img7.png" alt="" width={302} height={236} className="h-auto w-full -scale-x-100" />
        </div>
      </div>

      {/* CHART: the market, drawn */}
      <div
        data-plane="chart"
        className="absolute inset-x-0 bottom-[14%] -z-10 h-[52%] opacity-70 md:bottom-[10%] md:h-[58%]"
      >
        <div data-depth="-18" className="h-full w-full">
          <PriceChart />
        </div>
      </div>

      {/* HALO: the light he stands in */}
      <div
        data-plane="halo"
        className="pointer-events-none absolute bottom-[-12%] left-1/2 -z-10 aspect-square w-[118vw] max-w-[640px] -translate-x-1/2 lg:left-auto lg:right-[2%] lg:w-[46vw] lg:max-w-[760px] lg:translate-x-0"
      >
        <div data-depth="10" data-halo className="relative h-full w-full">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, rgba(248,163,8,0.28), rgba(248,163,8,0.08) 55%, transparent 72%)",
            }}
          />
          <div className="absolute inset-[9%] rounded-full border border-[#f8a308]/25" />
          <div className="absolute inset-[18%] rounded-full border border-white/10" />
        </div>
      </div>

      {/* SUBJECT: the trader */}
      <div
        data-plane="subject"
        className="relative z-10 order-2 mx-auto mt-auto w-[min(86vw,420px)] pt-6 origin-bottom will-change-transform lg:absolute lg:bottom-0 lg:right-[7%] lg:mt-0 lg:w-[min(40vw,600px)]"
      >
        <div data-depth="16">
          <Image
            data-subject-img
            src="/hero/ayomide.webp"
            alt="Elite Ayomide"
            width={610}
            height={671}
            preload
            sizes="(min-width: 1024px) 40vw, 88vw"
            className="h-auto w-full select-none [mask-image:linear-gradient(to_top,transparent,black_16%)] [-webkit-mask-image:linear-gradient(to_top,transparent,black_16%)]"
          />
        </div>
      </div>

      {/* NEAR: glass and gold, closest to the viewer */}
      <div
        data-plane="near-ring"
        className="absolute -left-[10%] -bottom-[6%] z-20 w-[34vw] max-w-[300px] opacity-90 blur-[1.5px] md:w-[20vw] lg:-left-[5%] lg:-bottom-[9%]"
      >
        <div data-depth="40">
          <Image data-float src="/abstract2g 1.png" alt="" width={324} height={276} className="h-auto w-full" />
        </div>
      </div>
      <div
        data-plane="near-coin"
        className="absolute bottom-[30%] right-[4%] z-20 w-[18vw] max-w-[150px] md:w-[11vw] lg:bottom-auto lg:right-[3%] lg:top-[20%]"
      >
        <div data-depth="34">
          <Image data-float src="/img7.png" alt="" width={302} height={236} className="h-auto w-full drop-shadow-[0_24px_30px_rgba(0,0,0,0.55)]" />
        </div>
      </div>

      {/* COPY */}
      <div data-plane="copy" className="relative z-10 order-1 lg:h-full">
        <div className="mx-auto flex w-full max-w-7xl flex-col justify-start pt-32 gutter text-center lg:h-full lg:justify-center lg:pt-0 lg:text-left">
          <div className="lg:max-w-[min(56%,720px)]">
            <h1
              data-intro
              className="unbounded text-balance text-[clamp(2rem,7.6vw,2.6rem)] font-bold leading-[104%] tracking-[-0.07em] text-white md:text-[clamp(2.8rem,5.4vw,4.9rem)]"
            >
              A crypto trader that makes{" "}
              <span className="relative inline-block">
                you money.
                <span className="absolute -bottom-5 left-0 w-full overflow-hidden">
                  <AnimatedLine duration={2} strokeWidth={1.5} color="#3C1EDE" delay={0.6} />
                </span>
              </span>
            </h1>
            <p
              data-intro
              className="jost mx-auto mt-8 max-w-[34ch] text-pretty text-[16px] leading-[140%] tracking-[-0.01em] text-white/65 md:text-[22px] lg:mx-0"
            >
              Helping traders and investors navigate the trading space profitably
              with information and education.
            </p>
            <div
              data-intro
              className="mt-9 flex flex-col items-center gap-5 sm:flex-row sm:justify-center lg:justify-start"
            >
              <button
                type="button"
                onClick={() => router.push("/about-me#professional-experiences")}
                className="jost inline-flex h-14 w-full max-w-[320px] items-center justify-center gap-3 rounded-full bg-white px-8 text-[15px] font-semibold text-black transition-transform duration-150 hover:-translate-y-0.5 active:scale-[0.97] sm:w-auto"
              >
                <Send fill="black" className="size-4 rotate-[290deg]" />
                View my portfolio
              </button>
              <button
                type="button"
                onClick={openVimeoMiniPlayer}
                className="jost group inline-flex items-center gap-4 text-[15px] font-semibold text-white"
              >
                <span className="relative flex size-12 items-center justify-center rounded-full bg-[#F8A308] transition-transform duration-150 group-hover:scale-105 group-active:scale-95">
                  <span className="absolute inset-0 animate-ping rounded-full bg-[#F8A308]/30 [animation-duration:2.2s]" />
                  <Play size={22} fill="white" className="relative ml-0.5 text-white" />
                </span>
                More Results
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ATMOSPHERE: mist that hands the scene to the next section, plus grain */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-[22%] bg-linear-to-t from-black to-transparent" />
      <div className="grain z-30" />
    </section>
  );
}
