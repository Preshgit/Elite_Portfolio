"use client";

import { useState } from "react";
import useSound from "use-sound";
import HoverArrow from "../components/HoverArrow";
import type { MediumPost } from "@/lib/medium";

interface BlogCardProps extends MediumPost {
  isNew: boolean;
}

export default function BlogCard({
  isNew,
  title,
  date,
  tags,
  description,
  link,
}: BlogCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  // The click sound plays alongside the link opening, instead of delaying it
  const [play] = useSound("/audio/universfield-computer-mouse-click-352734.mp3", {
    volume: 0.1,
  });

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => play()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      className="jost flex min-h-72 rounded-[28px] border border-white/15 bg-[#0b0a10] p-6 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-[#F8A308]/60 md:p-7"
    >
      <div className="flex w-full flex-col items-start justify-between gap-[1em]">
        <div className="flex flex-wrap items-center gap-2">
          {isNew && (
            <div className="bg-black rounded-2xl text-white font-medium w-fit border py-1 px-1 h-[1.5em] flex items-center leading-[10%] text-[10px]">
              New
            </div>
          )}
          {tags.map((tag) => (
            <span key={tag} className="text-[10px] uppercase tracking-wider text-white/40">
              {tag}
            </span>
          ))}
        </div>
        <div className="items-end space-y-5">
          <p className="text-xl line-clamp-4 unbounded leading-[111%] tracking-[-6%]">
            {title}
          </p>
          <p className="text-white/40 line-clamp-3 satoshi">{description}</p>
          <div className="w-full flex items-center justify-between">
            <p className="jakarta text-[#CC9933]/70 text-xs font-semibold">
              Read More{date && <span className="text-white/30"> · {date}</span>}
            </p>
            <HoverArrow isHovered={isHovered} />
          </div>
        </div>
      </div>
    </a>
  );
}
