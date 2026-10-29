import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { clsx } from "clsx";

interface ExternalBtnLink {
  text: string;
  href: string;
  className?: string;
  textClassName?: string;
}

// The whole pill is the link (it used to be a <button> with a link inside,
// so only the text was clickable).
const ExternalLinkButton = ({
  href,
  text,
  className,
  textClassName,
}: ExternalBtnLink) => {
  const url = href.trim();
  const external = /^https?:/.test(url);

  return (
    <Link
      href={url}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={clsx(
        "w-fit md:max-w-97.5 h-9 md:h-12 lg:h-14 flex items-center justify-center bg-white text-black gap-5 rounded-[63.18px]",
        className,
      )}
    >
      <span
        className={clsx(
          "jakarta font-semibold text-[12px] sm:text-[13px] md:text-[14px] lg:text-[20px] leading-[130%] tracking-[-2%]",
          textClassName,
        )}
      >
        {text}
      </span>
      <SquareArrowOutUpRight className="size-4 lg:size-5" />
    </Link>
  );
};

export default ExternalLinkButton;
