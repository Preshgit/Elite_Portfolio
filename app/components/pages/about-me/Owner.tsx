"use client";
import { useScramble } from "use-scramble";
import { useState } from "react";
import { motion } from "motion/react";
import ProfileImage from "@/assets/images/profile_image.png";
import Image from "next/image";
import Headings from "../../headings";

const tabs = ["THE START", "THE GRIND", "THE WORK", "THE PROOF"] as const;
type Tab = (typeof tabs)[number];

const tabContent: Record<Tab, { paragraphs: string[] }> = {
  "THE START": {
    paragraphs: [
      "EliteAyomide is a 26-year-old trader with 6 years of experience in Web3. Starting with project interactions, he helped grow Arbitrum, Optimism, and other top crypto ecosystems — earning tokens as rewards for his contributions.",
    ],
  },
  "THE GRIND": {
    paragraphs: [
      "Every day was a new battle — monitoring markets, engaging protocols, and staying ahead of the curve. The grind meant sleepless nights, deep research, and an unwavering commitment to understanding what others overlooked. He built systems, refined strategies, and turned raw effort into compounding results.",
      "The grind never stopped. From testnet campaigns to mainnet launches, EliteAyomide positioned himself at the frontier of every major protocol drop — not by luck, but by relentless preparation and execution.",
    ],
  },
  "THE WORK": {
    paragraphs: [
      "His work spans on-chain analytics, liquidity provision, ecosystem growth consulting, and community building across multiple L2 networks. He has contributed to governance proposals, beta-tested flagship DeFi products, and built a reputation as a trusted voice in the Web3 space.",
      "The work is documented — wallet histories, contribution records, and community endorsements. Every transaction tells a story of purpose and precision, not speculation.",
    ],
  },
  "THE PROOF": {
    paragraphs: [
      "Six-figure token rewards. Early allocations from protocols that went on to become industry staples. A network of builders, founders, and investors who can attest to EliteAyomide's consistency and impact across the ecosystem.",
      "The proof isn't in promises — it's in the chain. Verifiable. Immutable. Undeniable. The results speak for themselves, and the on-chain record stands as a permanent testament to years of disciplined effort.",
    ],
  },
};

export default function ProfileSection() {
  const [activeTab, setActiveTab] = useState<Tab>("THE START");

  const { ref } = useScramble({
    text: tabContent[activeTab].paragraphs.join("\n\n"),
    speed: 1,
    step: 5,
  });

  return (
    <section id="story" className="relative mx-auto max-w-7xl scroll-mt-24 gutter py-16 md:py-24">
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <figure data-fx="rise" className="relative overflow-hidden rounded-[32px] border border-white/15 bg-[#0b0a10]">
          <Image
            src={ProfileImage}
            alt="Elite Ayomide"
            className="aspect-[4/5] h-auto w-full object-cover object-top"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
          <div aria-hidden className="absolute inset-0 bg-linear-to-t from-black/85 via-transparent to-transparent" />
          <figcaption className="absolute inset-x-0 bottom-0 p-6 md:p-8">
            <p className="unbounded text-[22px] font-bold tracking-[-0.05em] md:text-[28px]">Elite Ayomide</p>
            <p className="jost mt-1 text-white/65">Trader, mentor and brand partner</p>
          </figcaption>
        </figure>

        <div className="lg:pt-4">
          <Headings text="My story" textClassName="text-white" />
          <h2
            data-fx="words"
            className="unbounded mt-6 text-balance text-[30px] font-bold leading-[105%] tracking-[-0.06em] md:text-[44px]"
          >
            From project interactions to proof on-chain.
          </h2>

          <div
            role="tablist"
            aria-label="Story chapters"
            className="mt-8 grid grid-cols-2 gap-1 rounded-[22px] border border-white/10 bg-white/[0.03] p-1.5 sm:grid-cols-4 sm:rounded-full"
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                role="tab"
                aria-selected={activeTab === tab}
                onClick={() => setActiveTab(tab)}
                className={`unbounded relative rounded-full px-3 py-3 text-[11px] font-semibold tracking-[0.02em] transition-colors duration-200 md:text-[12px] ${
                  activeTab === tab ? "text-black" : "text-white/55 hover:text-white"
                }`}
              >
                {activeTab === tab && (
                  <motion.span
                    layoutId="story-tab"
                    className="absolute inset-0 rounded-full bg-[#F8A308]"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative">{tab}</span>
              </button>
            ))}
          </div>

          <p
            ref={ref}
            role="tabpanel"
            className="jost mt-8 min-h-[12em] whitespace-pre-line text-[18px] leading-[155%] text-white/75 md:text-[20px]"
          />
        </div>
      </div>
    </section>
  );
}
