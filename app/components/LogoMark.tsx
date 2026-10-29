import { useId } from "react";

// The Elite Ayomide "AE" monogram, redrawn as one vector shape from the
// original PNG logo (same 48 x 46 grid).
export const LOGO_PATH =
  "M20 4 L29 4 L46.5 40 L23 40 L23 35 L38 35 L34.2 27.5 L23 27.5 L23 22 L31.2 22 L24.5 9 L9.2 40 L3 40 Z";

const TOP = 4; // top of the shape in the grid
const BOTTOM = 40; // bottom of the shape

/**
 * The logo filling with gold liquid as the page loads.
 * `progress` (0 to 1) sets the liquid level; `complete` triggers the shine.
 */
export default function LogoMark({
  progress,
  complete,
  className,
}: {
  progress: number;
  complete: boolean;
  className?: string;
}) {
  const id = useId().replace(/:/g, "");
  // Liquid surface: from just below the shape (empty) to just above it (full)
  const level = BOTTOM + 2 - progress * (BOTTOM - TOP + 5);

  return (
    <svg
      viewBox="0 2 50 40"
      className={className}
      data-complete={complete || undefined}
      aria-hidden
    >
      <defs>
        {/* The logo's own colours: orange at the bottom left, gold at the top right */}
        <linearGradient id={`${id}-gold`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#F7920A" />
          <stop offset="0.55" stopColor="#F9B004" />
          <stop offset="1" stopColor="#F6C80E" />
        </linearGradient>
        <linearGradient id={`${id}-shine`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.85" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`${id}-clip`}>
          <path d={LOGO_PATH} />
        </clipPath>
      </defs>

      {/* Empty glass: a faint version of the shape so it reads before it fills */}
      <path d={LOGO_PATH} fill="#F9B004" fillOpacity="0.07" />

      <g clipPath={`url(#${id}-clip)`}>
        {/* Liquid: rises with progress, its wavy surface drifting sideways */}
        <g className="logo-level" style={{ transform: `translateY(${level}px)` }}>
          <path
            className="logo-wave"
            fill={`url(#${id}-gold)`}
            d="M-50 0 Q-43.75 -1.6 -37.5 0 T-25 0 T-12.5 0 T0 0 T12.5 0 T25 0 T37.5 0 T50 0 T62.5 0 T75 0 T87.5 0 T100 0 V60 H-50 Z"
          />
        </g>
        {/* Shine that sweeps across once the logo is full */}
        <rect className="logo-shine" x="-20" y="0" width="14" height="50" fill={`url(#${id}-shine)`} />
      </g>

      {/* Outline that draws itself first */}
      <path
        className="logo-outline"
        d={LOGO_PATH}
        fill="none"
        stroke="#F9B004"
        strokeWidth="0.45"
        strokeLinejoin="round"
        pathLength={1}
      />
    </svg>
  );
}
