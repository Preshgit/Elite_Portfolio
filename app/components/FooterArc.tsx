import Ellipse from "@/assets/svgs/footer-arc.svg";
import ExternalLinkButton from "./ExternalLinkButton";
import Image from "next/image";
import clsx from "clsx";
import BackToTop from "./BackToTop";
import { glowGradient } from "./glow";

interface FooterArcProps {
  className?: string;
}

const FooterArc = ({ className }: FooterArcProps) => {
  return (
    <div
      className={clsx(
        "min-h-[600px] lg:min-h-170  bottom-0 bg-black relative  overflow-hidden",
        className,
      )}
    >
      <BackToTop className="absolute right-[clamp(1.25rem,4vw,3.5rem)] top-6 z-50 md:bottom-10 md:top-auto" />
      <div className="absolute flex max-h-[90%] pt-2 left-0 w-full  justify-center bottom-0">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[640px] w-[1440px] -translate-x-1/2 -translate-y-1/2 opacity-40 md:opacity-90"
          style={{ background: glowGradient }}
        />
        {/* Wider than the screen on phones so the dome is tall enough for its content */}
        <div data-fx="arc" className="relative h-full w-[240vw] shrink-0 bg-transparent sm:w-[160vw] md:bottom-[-10.3rem] md:w-screen lg:bottom-0">
          <Ellipse className="aspect-[1440/675] h-auto w-full md:aspect-auto md:h-full" aria-hidden />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2  -translate-y-1/2  z-50 space-y-5">
            <Image
              className="mx-auto"
              src="/Frame 2121453894.png"
              width={50}
              height={50}
              alt=""
            />
            <p className="text-transparent unbounded bg-clip-text bg-gradient-to-b from-white to-blue-800 text-[26px] md:text-[36px] lg:text-[50px] text-center capitalize font-extrabold leading-[100%] tracking-[-0.06em]">
              Let&apos;s start your <br /> Trading Journey
            </p>
            <p className="jost leading-[130%] tracking-[-0.02em] w-[300px] md:w-[508px] text-center text-[16px] md:text-[18px] lg:text-[25px] text-white/60 ">
              Start trading with powerful tools, real-time insights, and a
              secure platform for better profits
            </p>
            <ExternalLinkButton
              text="Get Started Now"
              href="/contact"
              className="mx-auto jakarta px-3 md:px-8 text-black py-1 md:py-2"
              textClassName="text-[15px]!"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterArc;
