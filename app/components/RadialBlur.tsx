import { cn } from "@/lib/utils";
import { glowGradient } from "./glow";

type RadialBlurProps = {
  className?: string;
  blurClassName?: string;
};

// Static purple glow used behind sections (FAQ, Services).
const RadialBlur = ({ className, blurClassName }: RadialBlurProps) => {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute -top-[150px] left-1/2 -translate-x-1/2",
        "h-[350px] w-[700px] opacity-40 md:opacity-90",
        className,
      )}
    >
      <div
        className={cn(
          "absolute left-1/2 -top-[170px] h-[690px] w-[1040px] -translate-x-1/2 opacity-30 md:opacity-70",
          blurClassName,
        )}
        style={{ background: glowGradient }}
      />
    </div>
  );
};

export default RadialBlur;
