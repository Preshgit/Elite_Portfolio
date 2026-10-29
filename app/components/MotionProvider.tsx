"use client";

import { MotionConfig } from "motion/react";

// Turns off movement animations for visitors who ask their device for
// reduced motion (fades still work).
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
