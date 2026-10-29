"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";
import { glowGradient } from "./glow";

type RadialBlurProps = {
  className?: string;
  blurClassName?: string;
  followCursor?: boolean;
  animate?: boolean;
};

const AnimatedRadialBlur = ({
  className,
  blurClassName,
  followCursor = false,
  animate = false,
}: RadialBlurProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 50, damping: 20 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (!followCursor) return;

    // Start at top center
    mouseX.set(window.innerWidth / 2);
    mouseY.set(0);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [followCursor, mouseX, mouseY]);

  const animationProps = animate
    ? {
        animate: {
          scale: [1, 1.1, 0.95, 1.05, 1],
          opacity: [0.7, 0.9, 0.75, 0.85, 0.7],
          rotate: [0, 3, -3, 1, 0],
        },
        transition: {
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
      }
    : {};

  return (
    <motion.div
      {...animationProps}
      style={
        followCursor
          ? {
              position: "fixed",
              top: 0,
              left: 0,
              x: x,
              y: y,
              translateX: "-50%",
              translateY: "-50%",
              zIndex: 0,
            }
          : {}
      }
      className={cn(
        "pointer-events-none will-change-transform",
        !followCursor && "absolute -top-[150px] left-1/2 -translate-x-1/2",
        "h-[1000px] w-[900px] rounded-full opacity-40 md:opacity-90",
        className,
      )}
    >
      <div
        className={cn(
          "absolute left-1/2 -top-[120px] h-[740px] w-[940px] -translate-x-1/2 opacity-40 md:opacity-90",
          blurClassName,
        )}
        style={{ background: glowGradient }}
      />
    </motion.div>
  );
};

export default AnimatedRadialBlur;
