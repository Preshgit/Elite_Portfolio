import { Jost, Plus_Jakarta_Sans, Unbounded } from "next/font/google";
import localFont from "next/font/local";

// Google variable fonts: Next.js downloads them at build time and serves them
// from this site as one small WOFF2 file per family (instead of 7-8 TTFs each).
// Only the two fonts used in the hero are preloaded.

export const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  display: "swap",
});

export const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

export const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  preload: false,
});

export const satoshi = localFont({
  src: "../assets/fonts/Satoshi-Variable.ttf",
  weight: "300 900",
  variable: "--font-satoshi",
  display: "swap",
  preload: false,
});
