import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Clapperboard,
  GraduationCap,
  LineChart,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import FooterArc from "../components/FooterArc";
import ExternalLinkButton from "../components/ExternalLinkButton";
import PlayButton from "./PlayButton";
import StackFx from "./StackFx";
import { mailtoUrl, site, telegramUrl } from "@/lib/site";

import BlueberryPayout from "@/assets/images/Blueberry_payout.jpg";

type Service = {
  id: string;
  icon: LucideIcon;
  label: string;
  short: string;
  tagline: string;
  /** What the client gets, taken from the service copy */
  includes: string[];
  bestFor: string;
  price?: string;
  cta: { href: string; text: string };
  thumb: string;
  visual: React.ReactNode;
};

const glow = (color: string) =>
  `radial-gradient(closest-side, ${color}, transparent 100%)`;

const partnerLogos = [
  { src: "/bybit.png", alt: "Bybit" },
  { src: "/mexc.png", alt: "MEXC" },
  { src: "/binance.png", alt: "Binance" },
  { src: "/muesli_swap.jpg", alt: "MuesliSwap" },
  { src: "/binolla.png", alt: "Binolla" },
  { src: "/binomo.png", alt: "Binomo" },
  { src: "/trade_locker.jpg", alt: "TradeLocker" },
];

// Visual compositions: real images only
const Frame = ({
  src,
  alt = "",
  className = "",
  position = "object-center",
  sizes = "(min-width: 1024px) 40vw, 100vw",
}: {
  src: string | StaticImageData;
  alt?: string;
  className?: string;
  position?: string;
  sizes?: string;
}) => (
  <div className={`relative overflow-hidden rounded-3xl border border-white/15 ${className}`}>
    <Image src={src} alt={alt} fill sizes={sizes} className={`object-cover ${position}`} />
  </div>
);

const services: Service[] = [
  {
    id: "consulting",
    icon: LineChart,
    label: "Crypto Consulting",
    short: "Advisory calls",
    tagline: "One-on-one advisory calls for smarter crypto trading and investment decisions.",
    includes: [
      "Hosted strategy calls, one-on-one",
      "Help fixing the causes of unprofitable trading",
      "Guidance from a trader with a 70%+ win rate",
    ],
    bestFor: "Traders who want to stop losing and start trading with a plan.",
    cta: { href: site.bookingUrl, text: "Book a Call" },
    thumb: "/e9.jpg",
    visual: (
      <div className="relative h-full w-full">
        <Frame src="/e9.jpg" alt="BTC/USDT chart" className="absolute inset-0" position="object-[50%_65%]" />
        <div className="absolute inset-0 rounded-3xl bg-linear-to-t from-black/70 via-transparent to-transparent" />
        <div data-fx="parallax" data-speed="8" className="absolute -bottom-2 right-[4%] w-[52%]">
          <Image
            src="/hero/ayomide.webp"
            alt="Elite Ayomide"
            width={610}
            height={671}
            sizes="(min-width: 1024px) 22vw, 50vw"
            className="h-auto w-full [mask-image:linear-gradient(to_top,transparent,black_18%)]"
          />
        </div>
      </div>
    ),
  },
  {
    id: "mentorship",
    icon: GraduationCap,
    label: "Crypto Mentorship",
    short: "Lifetime academy",
    tagline: "Battle-tested trading frameworks across Crypto, Forex and Stocks.",
    includes: [
      "Lifetime access to an ever-evolving strategy library",
      "Frameworks for Crypto, Forex and Stock trading",
      "A 70% student profitability rate",
    ],
    bestFor: "Individuals looking for a profitable trading strategy.",
    price: "$100 one-time",
    cta: { href: site.academyUrl, text: "Join the Academy" },
    thumb: "/student.jpg",
    visual: (
      <div className="relative h-full w-full">
        <Frame src="/student.jpg" className="absolute inset-0 opacity-80" />
        <div className="absolute inset-0 rounded-3xl bg-linear-to-r from-black/80 via-black/20 to-transparent" />
        <div
          data-fx="parallax"
          data-speed="10"
          className="absolute -top-6 right-[8%] w-[40%] overflow-hidden rounded-[28px] border-4 border-[#1b1a22] shadow-[0_40px_70px_-20px_rgba(0,0,0,0.9)] [aspect-ratio:9/16]"
        >
          <Image src="/e11.jpg" alt="Elite Crypto Academy group chat" fill sizes="(min-width: 1024px) 18vw, 40vw" className="object-cover object-top" />
        </div>
      </div>
    ),
  },
  {
    id: "private-trading",
    icon: Wallet,
    label: "Private Trading Investments",
    short: "Managed capital",
    tagline: "Don't have time to trade? Your capital, professionally managed.",
    includes: [
      "Disciplined risk management on every trade",
      "Proprietary trading strategies",
      "Monthly, quarterly or annual payouts",
      "Full transparency and legal backing",
    ],
    bestFor: "High-net-worth individuals in Africa or the diaspora seeking steady growth.",
    cta: { href: telegramUrl, text: "Message on Telegram" },
    thumb: "/win.jpg",
    visual: (
      <div className="relative h-full w-full">
        <Frame src="/win.jpg" className="absolute inset-0" />
        <div className="absolute inset-0 rounded-3xl bg-linear-to-t from-black/60 to-transparent" />
        <div
          data-fx="parallax"
          data-speed="12"
          className="absolute -bottom-8 -left-6 w-[62%] rotate-[-4deg] overflow-hidden rounded-xl border border-white/15 shadow-[0_40px_70px_-20px_rgba(0,0,0,0.9)]"
        >
          <Image src={BlueberryPayout} alt="Blueberry Funded payout of $1,059.20" sizes="(min-width: 1024px) 26vw, 60vw" className="h-auto w-full" />
        </div>
      </div>
    ),
  },
  {
    id: "video-content",
    icon: Clapperboard,
    label: "Video Content Creation",
    short: "For crypto brands",
    tagline: "Platform-optimized video that puts your brand in front of 20,000+ traders.",
    includes: [
      "High-quality, platform-optimized videos",
      "Tailored to your brand identity, goals and audience",
      "Reach across a 20,000+ member community",
      "Rates that make sense for your budget",
    ],
    bestFor: "Crypto brands looking to expand their reach.",
    cta: { href: mailtoUrl, text: "Send a Mail" },
    thumb: "/star.jpg",
    visual: (
      <div className="relative h-full w-full">
        <Frame src="/star.jpg" className="absolute inset-0" />
        <div className="absolute inset-0 rounded-3xl bg-black/35" />
        <PlayButton />
        <p className="jost absolute bottom-6 left-6 text-sm text-white/70">Watch a sample</p>
      </div>
    ),
  },
  {
    id: "community-growth",
    icon: Users,
    label: "Community Growth Strategies",
    short: "Launch to scale",
    tagline: "Data-driven strategies that grow loyalty and engagement, not just numbers.",
    includes: [
      "Tested, data-driven growth strategies",
      "Community management from launch to scale",
      "Experience growing Discord and Telegram groups past 25,000 members",
    ],
    bestFor: "Crypto projects that need a thriving community.",
    price: "$500 per month",
    cta: { href: telegramUrl, text: "Telegram" },
    thumb: "/blue_wave.jpg",
    visual: (
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-3xl border border-white/15 bg-[#0c0b14]">
        <div className="absolute inset-0" style={{ background: glow("rgba(109,59,255,0.45)") }} />
        <div className="relative text-center">
          <p className="unbounded text-[64px] font-extrabold leading-none tracking-[-0.06em] text-white md:text-[84px]">
            {(site.stats.community / 1000).toFixed(0)}K+
          </p>
          <p className="jost mt-2 text-white/60">community members</p>
        </div>
        <ul data-fx="stagger" className="absolute inset-0">
          {partnerLogos.map((logo, i) => {
            const a = (i / partnerLogos.length) * Math.PI * 2 - Math.PI / 2;
            return (
              <li
                key={logo.alt}
                className="absolute size-14 overflow-hidden rounded-full border-2 border-white/20 bg-white shadow-lg md:size-16"
                style={{
                  left: `calc(50% + ${(Math.cos(a) * 38).toFixed(2)}% - 2rem)`,
                  top: `calc(50% + ${(Math.sin(a) * 38).toFixed(2)}% - 2rem)`,
                }}
              >
                <Image src={logo.src} alt={logo.alt} fill sizes="64px" className="object-cover" />
              </li>
            );
          })}
        </ul>
      </div>
    ),
  },
];

const steps = [
  { title: "Pick a service", text: "Choose what fits where you are right now." },
  { title: "Message or book", text: "Reach out by call, email, Telegram or WhatsApp." },
  { title: "Start trading smarter", text: "Get a clear plan and start putting it to work." },
];

export default function ServicesPage() {
  return (
    <main className="relative bg-black text-white">
      <StackFx />

      {/* Hero: what he does, at a glance */}
      <section className="relative isolate overflow-hidden pb-16 pt-36 md:pt-44">
        <div
          aria-hidden
          className="absolute left-1/2 -top-[20%] -z-10 h-[80%] w-[110%] -translate-x-1/2"
          style={{ background: glow("rgba(109,59,255,0.5)") }}
        />
        <div className="grain" />
        <div className="mx-auto max-w-7xl gutter">
          <h1
            data-fx="words"
            className="unbounded max-w-[16ch] text-balance text-[38px] font-bold leading-[102%] tracking-[-0.07em] md:text-[64px] lg:text-[80px]"
          >
            Five ways to trade smarter.
          </h1>
          <div className="mt-6 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p data-fx="rise" className="jost max-w-[44ch] text-[18px] leading-[140%] text-white/65 md:text-[22px]">
              Consulting, mentorship, managed trading, video content and community
              growth, from a crypto trader with {site.stats.yearsExperience} years in the market.
            </p>
            <div data-fx="rise">
              <ExternalLinkButton
                href={site.bookingUrl}
                text="Book a Call"
                className="px-8 gap-3.75!"
                textClassName="text-base!"
              />
            </div>
          </div>

          {/* Visual index */}
          <nav aria-label="Services" className="mt-14">
            <ul data-fx="stagger" className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {services.map((s) => (
                <li key={s.id} className={s.id === "community-growth" ? "col-span-2 sm:col-span-1" : ""}>
                  <Link
                    href={`#${s.id}`}
                    data-index-link={s.id}
                    className="group relative flex h-44 flex-col justify-end overflow-hidden rounded-2xl border border-white/20 bg-[#0b0a10] p-4 ring-1 ring-inset ring-white/5 transition-[border-color,transform] duration-200 hover:-translate-y-1 hover:border-[#F8A308]/60 md:h-52 [&.is-active]:border-[#F8A308]"
                  >
                    <Image
                      src={s.thumb}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 20vw, 50vw"
                      className="object-cover opacity-55 transition-[opacity,transform] duration-500 group-hover:scale-105 group-hover:opacity-75"
                    />
                    <span className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
                    <s.icon className="relative mb-auto size-7 text-[#F8A308]" aria-hidden />
                    <span className="unbounded relative text-[15px] font-semibold leading-tight tracking-[-0.03em] md:text-base">
                      {s.label}
                    </span>
                    <span className="jost relative mt-1 text-[13px] text-white/60">{s.short}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* The deck: one scene per service */}
      <div className="relative mx-auto max-w-7xl gutter pb-10">
        {services.map((s) => (
          <section
            key={s.id}
            id={s.id}
            data-stack
            className="scroll-mt-28 py-4 lg:sticky lg:top-24 lg:min-h-[calc(100svh-7rem)] lg:py-0"
          >
            <div
              data-stack-inner
              className="relative origin-top overflow-hidden rounded-[32px] border border-white/20 bg-[#0b0a10] shadow-[0_-30px_60px_-30px_rgba(0,0,0,0.9)] lg:h-[calc(100svh-8rem)] lg:max-h-[760px]"
            >
              {/* Gold hairline along the top edge */}
              <div aria-hidden className="pointer-events-none absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-[#F8A308]/70 to-transparent" />
              <div
                aria-hidden
                className="pointer-events-none absolute -left-[20%] -top-[30%] h-[80%] w-[70%]"
                style={{ background: glow("rgba(109,59,255,0.22)") }}
              />
              <div className="relative grid h-full gap-8 p-6 md:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-12 lg:p-12">
                <div className="flex flex-col">
                  <div data-fx="rise" className="flex items-center gap-3">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-[#F8A308] text-black">
                      <s.icon className="size-6" aria-hidden />
                    </span>
                    {s.price && (
                      <span className="jost rounded-full border border-[#F8A308]/40 px-3 py-1 text-sm text-[#F8A308]">
                        {s.price}
                      </span>
                    )}
                  </div>
                  <h2
                    data-fx="words"
                    className="unbounded mt-6 text-balance text-[30px] font-bold leading-[104%] tracking-[-0.06em] md:text-[44px]"
                  >
                    {s.label}
                  </h2>
                  <p data-fx="rise" className="jost mt-4 max-w-[40ch] text-[18px] leading-[140%] text-white/70 md:text-[20px]">
                    {s.tagline}
                  </p>
                  <ul data-fx="stagger" className="mt-7 space-y-3">
                    {s.includes.map((item) => (
                      <li key={item} className="jost flex items-start gap-3 text-[16px] leading-snug text-white/80">
                        <Check className="mt-0.5 size-5 shrink-0 text-[#F8A308]" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p data-fx="rise" className="jost mt-7 border-l border-white/20 pl-4 text-[15px] leading-snug text-white/55">
                    <span className="text-white/80">Best for:</span> {s.bestFor}
                  </p>
                  <div data-fx="rise" className="mt-8 lg:mt-auto lg:pt-8">
                    <ExternalLinkButton
                      href={s.cta.href}
                      text={s.cta.text}
                      className="w-full px-8 gap-3.75! sm:w-auto"
                      textClassName="text-base!"
                    />
                  </div>
                </div>
                <div data-fx="rise" className="relative min-h-[300px] md:min-h-[420px] lg:min-h-0">
                  {s.visual}
                </div>
              </div>
              <div data-stack-shade aria-hidden className="pointer-events-none absolute inset-0 bg-black opacity-0" />
            </div>
          </section>
        ))}
      </div>

      {/* How to start */}
      <section className="relative mx-auto max-w-7xl gutter py-24">
        <h2 data-fx="words" className="unbounded text-[30px] font-bold tracking-[-0.06em] md:text-[44px]">
          How to start
        </h2>
        <div className="relative mt-12">
          <svg
            aria-hidden
            viewBox="0 0 1000 20"
            preserveAspectRatio="none"
            className="absolute left-0 right-0 top-[46px] hidden h-5 w-full md:block"
          >
            <path data-steps-line d="M20 10 H980" stroke="#F8A308" strokeOpacity="0.6" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
          </svg>
          <ol data-fx="stagger" className="relative grid gap-10 md:grid-cols-3">
            {steps.map((step, i) => (
              <li key={step.title} className="rounded-[28px] border border-white/20 bg-[#0b0a10] p-6 md:p-8">
                <span className="unbounded relative flex size-12 items-center justify-center rounded-full border border-[#F8A308] bg-black text-[#F8A308]">
                  {i + 1}
                </span>
                <h3 className="unbounded mt-6 text-xl font-semibold tracking-[-0.04em]">{step.title}</h3>
                <p className="jost mt-2 max-w-[30ch] text-white/60">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
        <Link
          href="/contact"
          className="jost group mt-14 inline-flex items-center gap-2 text-lg text-[#F8A308] underline-offset-4 hover:underline"
        >
          Contact me
          <ArrowRight className="size-5 transition-transform duration-150 group-hover:translate-x-1" />
        </Link>
      </section>

      <FooterArc />
    </main>
  );
}
