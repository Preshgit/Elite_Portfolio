import { clsx } from "clsx"
import React from "react"
import AnimatedRadialBlur from "./AnimatedRadialBlur";

interface HeroProps {
  className: string;
  children?: React.ReactNode;
  animate?: boolean;
  followCursor?: boolean
}

const Hero = ({ className, children, animate = false, followCursor = false }: HeroProps) => {
  return (
    <div className={clsx(className, "overflow-hidden relative bg-black")}>
      <AnimatedRadialBlur animate={animate} followCursor={followCursor} />
      {children}
    </div>
  )
}

export default Hero
