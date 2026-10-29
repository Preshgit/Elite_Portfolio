"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { X } from "lucide-react";
import Headings from "../../headings";
import { gsap, pauseScroll, prefersReducedMotion } from "@/lib/scroll";

import BlueberryPayout from "@/assets/images/Blueberry_payout.jpg";
import MubitePay from "@/assets/images/mubite_pay.jpg";
import BybitTrade from "@/assets/images/e1.jpg";
import MexcTrade from "@/assets/images/e8.jpg";
import FundingCert from "@/assets/images/Copy_of_Funded Certificate(2).png";
import VerificationCert from "@/assets/images/blueberry_cert.png";

type Receipt = {
  src: StaticImageData | { src: string; width: number; height: number };
  label: string;
  detail: string;
  /** USD payout shown on the receipt itself. Only these add to the total. */
  amount?: number;
  /** Trade result shown on the receipt */
  result?: string;
  /** Desk position (percent of the desk) and resting tilt */
  at: { l: number; t: number; w: number; r: number };
};

// Every figure here is printed on the client's own receipt image.
const receipts: Receipt[] = [
  {
    src: BlueberryPayout,
    label: "Blueberry Funded payout",
    detail: "14 Jun 2026",
    amount: 1059.2,
    at: { l: 0, t: 3, w: 50, r: -4 },
  },
  {
    src: MubitePay,
    label: "Mubite profit share",
    detail: "23 Mar 2026",
    amount: 752.22,
    at: { l: 52, t: 0, w: 46, r: 3 },
  },
  {
    src: { src: "/Second Mubite withdrawal.jpg", width: 1280, height: 940 },
    label: "Mubite profit share",
    detail: "25 Apr 2026",
    amount: 560.92,
    at: { l: 4, t: 37, w: 42, r: 2.5 },
  },
  {
    src: BybitTrade,
    label: "Bybit SOLUSDT short, 10x",
    detail: "ROI",
    result: "+105.81%",
    at: { l: 47, t: 27, w: 22, r: -3 },
  },
  {
    src: MexcTrade,
    label: "MEXC SIGNUSDT long, 10x",
    detail: "ROI",
    result: "+129.07%",
    at: { l: 73, t: 31, w: 25, r: 4 },
  },
  {
    src: FundingCert,
    label: "Blueberry Funded",
    detail: "Certificate of funding",
    at: { l: 1, t: 68, w: 42, r: -2 },
  },
  {
    src: VerificationCert,
    label: "Blueberry Funded",
    detail: "Verification pass, 31 Mar 2026",
    at: { l: 47, t: 66, w: 44, r: 2 },
  },
];

const fullTotal = receipts.reduce((sum, r) => sum + (r.amount ?? 0), 0);
const usd = (v: number) =>
  "$" + v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function PayoutDesk() {
  const root = useRef<HTMLElement>(null);
  const totalRef = useRef<HTMLSpanElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<Receipt | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: pin the desk and deal the receipts with the scroll
      mm.add("(min-width: 1024px) and (min-height: 640px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-receipt]");
        const rows = gsap.utils.toArray<HTMLElement>("[data-row]");
        const proxy = { v: 0 };
        const write = () => {
          if (totalRef.current) totalRef.current.textContent = usd(proxy.v);
        };

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: () => `+=${window.innerHeight * 2.6}`,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
          },
        });

        tl.set(proxy, { v: 0, onUpdate: write }, 0);
        let running = 0;
        cards.forEach((card, i) => {
          const r = receipts[i];
          const t = i * 1;
          const side = i % 2 ? 1 : -1;
          tl.from(
            card,
            {
              y: () => window.innerHeight * 0.9,
              x: side * 120,
              rotation: r.at.r + side * 28,
              scale: 1.18,
              autoAlpha: 0,
              duration: 1,
            },
            t,
          );
          tl.from(rows[i], { autoAlpha: 0, x: -24, duration: 0.6 }, t + 0.45);
          if (r.amount) {
            const from = running;
            running += r.amount;
            tl.fromTo(
              proxy,
              { v: from },
              { v: running, duration: 0.6, ease: "none", onUpdate: write },
              t + 0.45,
            );
          }
        });
        tl.from("[data-total]", { scale: 0.96, duration: 0.4 }, cards.length - 0.6);
        tl.to({}, { duration: 0.6 }); // a short hold on the full desk
      });

      // Phones and tablets: no pinning, each receipt rises as it enters
      mm.add("(max-width: 1023px), (max-height: 639px)", () => {
        gsap.utils.toArray<HTMLElement>("[data-receipt]").forEach((card) => {
          gsap.from(card, {
            y: 60,
            autoAlpha: 0,
            rotation: 4,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          });
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  // Native <dialog> for the full-size receipt
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
    pauseScroll(!!open);
  }, [open]);

  return (
    <section
      ref={root}
      id="trading-history"
      className="relative overflow-hidden bg-black"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[10%] top-[10%] h-[80%] w-[70%]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(109,59,255,0.28), rgba(70,30,200,0.08) 60%, transparent 100%)",
        }}
      />
      <div className="relative mx-auto grid w-full max-w-7xl gap-12 gutter py-20 lg:min-h-svh lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:items-center lg:gap-14 lg:py-24 lg:pt-28">
        {/* Copy + ledger */}
        <div>
          <Headings text="Verified Trading History" textClassName="text-white" />
          <h2 className="unbounded mt-8 text-[34px] font-extrabold uppercase leading-[104%] tracking-[-0.09em] text-[#D9D9D9] md:text-[48px]">
            Real numbers.
            <br />
            Real impact.
          </h2>
          <p className="jost mt-5 max-w-[36ch] text-[17px] leading-[140%] text-white/65 md:text-[19px]">
            Payout certificates and trade receipts, straight from the platforms.
            Tap any receipt to see it full size.
          </p>

          <ol className="mt-8 hidden space-y-0 border-t border-white/10 lg:block">
            {receipts.map((r, i) => (
              <li
                key={i}
                data-row
                className="jost flex items-baseline justify-between gap-4 border-b border-white/10 py-2.5 text-[15px]"
              >
                <span className="text-white/75">
                  {r.label}
                  <span className="text-white/40"> · {r.detail}</span>
                </span>
                <span
                  className={`unbounded shrink-0 tabular-nums tracking-[-0.04em] ${r.amount || r.result ? "text-[#F8A308]" : "text-white/45"}`}
                >
                  {r.amount ? usd(r.amount) : (r.result ?? "Verified")}
                </span>
              </li>
            ))}
          </ol>

          <div
            data-total
            className="mt-6 hidden origin-left items-end justify-between gap-6 rounded-2xl border border-[#F8A308]/30 bg-[#F8A308]/[0.06] px-5 py-4 lg:flex"
          >
            <span className="jost text-[14px] leading-tight text-white/60">
              Payouts shown on
              <br />
              this desk
            </span>
            <span
              ref={totalRef}
              className="unbounded text-[30px] font-bold tabular-nums leading-none tracking-[-0.05em] text-white"
            >
              {usd(fullTotal)}
            </span>
          </div>
        </div>

        {/* The desk */}
        <div className="relative lg:aspect-[5/4] lg:w-full">
          <div
            aria-hidden
            className="absolute -inset-4 hidden rounded-[36px] border border-white/[0.06] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.035),transparent_70%)] lg:block"
          />
          <ul className="grid gap-8 sm:grid-cols-2 lg:block">
            {receipts.map((r, i) => (
              <li
                key={i}
                data-receipt
                className="lg:absolute lg:left-(--l) lg:top-(--t) lg:w-(--w)"
                style={
                  {
                    "--l": `${r.at.l}%`,
                    "--t": `${r.at.t}%`,
                    "--w": `${r.at.w}%`,
                    "--r": `${r.at.r}deg`,
                    zIndex: i + 1,
                  } as React.CSSProperties
                }
              >
                <button
                  type="button"
                  onClick={() => setOpen(r)}
                  className="group block w-full text-left lg:[transform:rotate(var(--r))]"
                  aria-label={`View ${r.label}, ${r.detail}, full size`}
                >
                  <span className="block overflow-hidden rounded-xl border border-white/15 bg-[#0d0c12] shadow-[0_30px_60px_-18px_rgba(0,0,0,0.9)] transition-transform duration-200 ease-out group-hover:-translate-y-1.5 group-hover:scale-[1.02]">
                    <Image
                      src={r.src}
                      alt={`${r.label}, ${r.detail}`}
                      sizes="(min-width: 1024px) 26vw, (min-width: 600px) 50vw, 100vw"
                      // Cards slide in from off-screen, so lazy loading would land them blank.
                      loading="eager"
                      className="h-auto w-full"
                    />
                  </span>
                  <span className="jost mt-3 flex items-baseline justify-between gap-3 text-[15px] lg:hidden">
                    <span className="text-white/75">
                      {r.label}
                      <span className="text-white/40"> · {r.detail}</span>
                    </span>
                    {(r.amount || r.result) && (
                      <span className="unbounded shrink-0 text-[#F8A308]">
                        {r.amount ? usd(r.amount) : r.result}
                      </span>
                    )}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex items-end justify-between gap-6 rounded-2xl border border-[#F8A308]/30 bg-[#F8A308]/[0.06] px-5 py-4 lg:hidden">
            <span className="jost text-[14px] leading-tight text-white/60">
              Payouts shown above
            </span>
            <span className="unbounded text-[26px] font-bold tabular-nums leading-none tracking-[-0.05em] text-white">
              {usd(fullTotal)}
            </span>
          </div>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === e.currentTarget && setOpen(null)}
        className="m-auto max-h-[92vh] w-[min(94vw,1100px)] overflow-visible bg-transparent p-0 backdrop:bg-black/85 backdrop:backdrop-blur-sm"
      >
        {open && (
          <figure className="relative">
            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label="Close"
              className="absolute -top-12 right-0 flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X className="size-5" />
            </button>
            <Image
              src={open.src}
              alt={`${open.label}, ${open.detail}`}
              sizes="94vw"
              className="mx-auto h-auto max-h-[82vh] w-auto rounded-xl"
            />
            <figcaption className="jost mt-3 text-center text-white/70">
              {open.label} · {open.detail}
              {(open.amount || open.result) && (
                <span className="text-[#F8A308]"> · {open.amount ? usd(open.amount) : open.result}</span>
              )}
            </figcaption>
          </figure>
        )}
      </dialog>
    </section>
  );
}
