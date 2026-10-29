import type { Metadata } from "next";
import "lenis/dist/lenis.css";
import "./globals.css";
import Header from "./components/Header";
import { jakarta, jost, satoshi, unbounded } from "./fonts";
import Footer from "./components/Footer";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import PageLoader from "./components/PageLoader";
import VimeoMiniPlayer from "./components/VimeoMiniPlayer";
import MotionProvider from "./components/MotionProvider";
import SmoothScroll from "./components/SmoothScroll";
import PageFx from "./components/PageFx";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.name,
    description: site.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    site: "@eliteayomide",
    creator: "@eliteayomide",
  },
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        unbounded.variable,
        jost.variable,
        satoshi.variable,
        jakarta.variable,
        "font-sans",
        "fx",
      )}
    >
      <body className="min-h-full flex flex-col w-full overflow-x-hidden bg-black">
        <MotionProvider>
          <SmoothScroll />
          <PageFx />
          <PageLoader />
          <Header />
          {children}
          <Footer />
          <VimeoMiniPlayer />
        </MotionProvider>
      </body>
    </html>
  );
}
