"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Maximize2, Minimize2, X } from "lucide-react";

// color= tints Vimeo's own controls with the site gold
const VIMEO_EMBED_URL =
  "https://player.vimeo.com/video/1216445224?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&color=F8A308&title=0&byline=0&portrait=0";

export function openVimeoMiniPlayer() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("elite:vimeo-mini-player:open"));
}

export function closeVimeoMiniPlayer() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("elite:vimeo-mini-player:close"));
}

export default function VimeoMiniPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLarge, setIsLarge] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => {
      setIsOpen(false);
      setIsLarge(false);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    window.addEventListener("elite:vimeo-mini-player:open", handleOpen);
    window.addEventListener("elite:vimeo-mini-player:close", handleClose);
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("elite:vimeo-mini-player:open", handleOpen);
      window.removeEventListener("elite:vimeo-mini-player:close", handleClose);
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  useEffect(() => {
    if (isOpen) closeRef.current?.focus({ preventScroll: true });
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {isLarge && (
            <motion.div
              key="backdrop"
              aria-hidden
              onClick={() => setIsLarge(false)}
              className="fixed inset-0 z-[1000001] bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
          <div
            key="player-wrap"
            className={
              "pointer-events-none fixed inset-0 z-[1000002] flex p-4 md:p-6 " +
              (isLarge ? "items-center justify-center" : "items-end justify-end")
            }
          >
          <motion.div
            key="player"
            role="dialog"
            aria-label="Elite Ayomide results video"
            layout
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className={
              "pointer-events-auto " +
              (isLarge ? "w-[min(94vw,1100px)]" : "w-[min(calc(100vw-2rem),400px)]")
            }
          >
            {/* Gold hairline border */}
            <div className="rounded-[26px] bg-linear-to-br from-[#F8A308]/70 via-white/10 to-[#3E1FE8]/60 p-px shadow-[0_30px_90px_-20px_rgba(62,31,232,0.55)]">
              <div className="overflow-hidden rounded-[25px] bg-[#09080f]">
                <div className="flex items-center gap-3 px-4 py-3">
                  <Image src="/Ayomide Logo 1.png" alt="" width={26} height={24} className="h-6 w-auto" />
                  <div className="min-w-0 flex-1">
                    <p className="unbounded truncate text-[12px] font-semibold tracking-[-0.02em] text-white">
                      More results
                    </p>
                    <p className="jost flex items-center gap-1.5 text-[12px] text-white/50">
                      <span className="relative flex size-1.5">
                        <span className="absolute inset-0 animate-ping rounded-full bg-[#F8A308]/70" />
                        <span className="relative size-1.5 rounded-full bg-[#F8A308]" />
                      </span>
                      Now playing
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsLarge((v) => !v)}
                    className="hidden size-9 items-center justify-center rounded-full border border-white/10 text-white/80 transition-colors hover:border-[#F8A308] hover:text-[#F8A308] sm:inline-flex"
                    aria-label={isLarge ? "Shrink video" : "Enlarge video"}
                  >
                    {isLarge ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
                  </button>
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={closeVimeoMiniPlayer}
                    className="inline-flex size-9 items-center justify-center rounded-full bg-[#F8A308] text-black transition-transform hover:scale-105"
                    aria-label="Close video"
                  >
                    <X className="size-4" />
                  </button>
                </div>
                <div className="relative mx-2 mb-2 overflow-hidden rounded-[18px] bg-black pt-[56.25%]">
                  <iframe
                    src={VIMEO_EMBED_URL}
                    title="Elite Ayomide portfolio video"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    className="absolute left-0 top-0 h-full w-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
