import ExternalLinkButton from "../../ExternalLinkButton";
import Headings from "../../headings";
import RadialBlur from "../../RadialBlur";
import SectionContainer from "../../SectionContainer";
import ServiceList from "./ServicesList";
import Looper from "@/assets/svgs/Looper-3.svg";
import SectionContent from "../../SectionContent";
import { site } from "@/lib/site";
import Portrait from "@/assets/images/profile_image.png";

const Services = () => {
  return (
    <SectionContainer id="my-services" className="relative overflow-hidden bg-black">
      <div aria-hidden className="pointer-events-none absolute -top-10 right-0" data-fx="parallax" data-speed="20">
        <Looper />
      </div>
      <SectionContent className="relative space-y-14">
        <Headings className="bg-white" text="Services" textClassName="text-white" />
        <div className="relative z-20 grid items-end gap-6 text-white lg:grid-cols-2 lg:gap-12">
          <h2
            data-fx="words"
            className="unbounded text-[30px] font-extrabold uppercase leading-[110%] tracking-[-0.09em] text-[#D9D9D9] lg:text-[48px]"
          >
            Strategic services. For lasting impact
          </h2>
          <p
            data-fx="rise"
            className="jost max-w-[44ch] text-[18px] leading-[135%] tracking-[-0.02em] text-white/75 md:text-[22px]"
          >
            High-value services for traders, investors and crypto brands: expert
            guidance, strategic insight, and actionable solutions that drive growth.
          </p>
        </div>
        <div className="relative z-20">
          <ServiceList
            services={[
              {
                title: "Crypto Consulting",
                description:
                  "One-on-one advisory for smarter crypto trading and investment decisions.",
                href: site.bookingUrl,
                image: "/e9.jpg",
                imagePosition: "object-[50%_60%]",
              },
              {
                title: "Crypto Mentorship",
                description:
                  "Lifetime access to battle-tested strategies across Crypto, Forex and Stocks.",
                href: site.academyUrl,
                ctaLabel: "Join the Academy",
                image: "/e11.jpg",
                imagePosition: "object-[50%_20%]",
              },
              {
                title: "One-on-One Crypto Mentorship",
                description: "Personal sessions built around your trading and your goals.",
                href: site.bookingUrl,
                image: Portrait,
                imagePosition: "object-[50%_22%]",
              },
            ]}
          />
        </div>
        <div className="relative z-10 flex justify-center">
          <ExternalLinkButton
            text="More of my Services"
            href="/services"
            className="md:w-67 w-fit px-5 py-4 gap-3.75!"
            textClassName="text-base!"
          />
        </div>
        <RadialBlur blurClassName="bottom-0" className="absolute -bottom-56" />
      </SectionContent>
    </SectionContainer>
  );
};

export default Services;
