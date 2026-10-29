// Soft purple glow drawn with a gradient only.
// Replaces the old `blur-[120px]` filter, which forced the browser to re-blur
// a huge area on every animation frame.
export const glowGradient = `radial-gradient(
  closest-side,
  rgba(109,59,255,0.75) 0%,
  rgba(91,46,255,0.5) 30%,
  rgba(70,30,200,0.25) 55%,
  rgba(70,30,200,0.08) 78%,
  rgba(0,0,0,0) 100%
)`;
