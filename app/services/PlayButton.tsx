"use client";

import { Play } from "lucide-react";
import { openVimeoMiniPlayer } from "../components/VimeoMiniPlayer";

export default function PlayButton() {
  return (
    <button
      type="button"
      onClick={openVimeoMiniPlayer}
      aria-label="Play a sample video"
      className="group absolute left-1/2 top-1/2 flex size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#F8A308] shadow-[0_20px_50px_-10px_rgba(248,163,8,0.6)] transition-transform duration-150 hover:scale-105 active:scale-95"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#F8A308]/30 [animation-duration:2.4s]" />
      <Play className="relative ml-1 size-10 fill-white text-white" />
    </button>
  );
}
