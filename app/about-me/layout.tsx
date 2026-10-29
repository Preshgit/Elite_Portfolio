import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me",
  description:
    "Learn more about Elite Ayomide, a crypto trader with six years of experience, brand partnerships, and a results-driven approach.",
};

export default function AboutMeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
