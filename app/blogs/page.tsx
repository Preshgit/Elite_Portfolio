import Link from "next/link";
import Headings from "../components/headings";
import { glowGradient } from "../components/glow";
import MediumIcon from "@/assets/svgs/medium.svg";
import FooterArc from "../components/FooterArc";
import BlogCard from "./BlogCard";
import { getMediumPosts } from "@/lib/medium";
import { site } from "@/lib/site";

// Re-check Medium for new posts at most once an hour
export const revalidate = 3600;

const Page = async () => {
  const posts = await getMediumPosts(site.mediumUsername);
  const mediumUrl = site.mediumUsername
    ? `https://medium.com/@${site.mediumUsername}`
    : null;

  return (
    <main className="relative overflow-clip bg-black text-white">
      <section className="relative isolate">
        <div
          aria-hidden
          className="absolute left-1/2 -top-[320px] -z-10 h-[1000px] w-[1300px] -translate-x-1/2"
          style={{ background: glowGradient }}
        />
        <div className="grain" />
        <div className="mx-auto max-w-7xl gutter pb-16 pt-32 md:pb-24 md:pt-40">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end">
            <div>
              <Headings text="Blog" textClassName="text-white" />
              <h1
                data-fx="words"
                className="unbounded mt-6 text-balance text-[36px] font-bold leading-[102%] tracking-[-0.07em] md:text-[60px] lg:text-[72px]"
              >
                Articles that inspire.
              </h1>
            </div>
            <div data-fx="rise" className="space-y-5">
              <p className="jost max-w-[44ch] text-[18px] leading-[145%] text-white/70 md:text-[21px]">
                Practical articles, current trends and tested strategies to help you
                grow your trading experience.
              </p>
              {mediumUrl && (
                <Link
                  href={mediumUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="jost inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-white/85 transition-colors hover:border-[#F8A308] hover:text-[#F8A308]"
                >
                  <MediumIcon className="size-5" />
                  Follow me on Medium
                </Link>
              )}
            </div>
          </div>

          {posts.length > 0 ? (
            <div data-fx="stagger" className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:mt-20">
              {posts.map((post, index) => (
                <BlogCard key={post.link} {...post} isNew={index === 0} />
              ))}
            </div>
          ) : (
            <div className="jost mt-14 rounded-[32px] border border-white/15 bg-[#0b0a10] px-6 py-16 text-center md:mt-20 md:py-20">
              <p className="unbounded text-2xl font-bold tracking-[-0.05em] md:text-3xl">New articles are on the way.</p>
              <p className="mt-4 text-white/60 md:text-lg">
                In the meantime, get daily market updates on{" "}
                <a
                  href={site.telegramChannel}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F8A308] underline underline-offset-4"
                >
                  Telegram
                </a>
                .
              </p>
            </div>
          )}
        </div>
      </section>
      <FooterArc />
    </main>
  );
};

export default Page;
