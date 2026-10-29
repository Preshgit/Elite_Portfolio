import Image, { type StaticImageData } from "next/image";
import ExternalLinkButton from "../../ExternalLinkButton";

export interface ServiceItem {
  title: string;
  description?: string;
  href?: string;
  ctaLabel?: string;
  image: string | StaticImageData;
  imagePosition?: string;
}

const ServiceRow = ({
  title,
  description,
  href,
  ctaLabel = "Book Me Now",
  image,
  imagePosition = "object-center",
}: ServiceItem) => (
  <li className="group grid items-center gap-6 border-b border-white/10 py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] md:gap-12 md:py-12">
    <div data-fx="rise" className="order-2 md:order-1">
      <h3 className="jakarta text-[24px] font-extrabold leading-[113%] tracking-[-0.05em] text-white/85 transition-colors duration-150 group-hover:text-white md:text-[34px]">
        {title}
      </h3>
      {description && (
        <p className="jost mt-3 max-w-[40ch] text-[17px] leading-[135%] text-white/60 md:text-[21px]">
          {description}
        </p>
      )}
      {href && (
        <ExternalLinkButton
          href={href}
          text={ctaLabel}
          className="mt-7 w-full px-6 gap-3.75! sm:w-auto"
          textClassName="text-base!"
        />
      )}
    </div>
    <div
      data-fx="wipe"
      className="relative order-1 h-52 overflow-hidden rounded-3xl border border-white/10 md:order-2 md:h-64"
    >
      <Image
        src={image}
        alt=""
        fill
        sizes="(min-width: 780px) 45vw, 100vw"
        className={`object-cover ${imagePosition} transition-transform duration-700 ease-out group-hover:scale-105`}
      />
      <div className="absolute inset-0 bg-linear-to-tr from-[#3c1ede]/30 via-transparent to-transparent" />
    </div>
  </li>
);

const ServiceList = ({ services }: { services: ServiceItem[] }) => (
  <ul className="w-full border-t border-white/10">
    {services.map((service) => (
      <ServiceRow key={service.title} {...service} />
    ))}
  </ul>
);

export default ServiceList;
