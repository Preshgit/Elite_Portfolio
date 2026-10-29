"use client";

import { ArrowUp } from "lucide-react";
import { scrollToTarget } from "@/lib/scroll";

const BackToTop = ({ className }: { className?: string }) => (
  <div className={className}>
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => scrollToTarget(0)}
      className="bg-[#3E1FE8] flex justify-center h-[50px] w-[50px] items-center rounded-full"
    >
      <ArrowUp color="white" />
    </button>
  </div>
);

export default BackToTop;
