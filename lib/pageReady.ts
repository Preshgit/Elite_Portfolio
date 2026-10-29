"use client";

// A tiny "is the page revealed yet?" signal shared by the loader and the
// animations, so intros and scroll reveals start after the loader lifts
// instead of playing unseen behind it.

let ready = false;
const waiting = new Set<() => void>();

export const isPageReady = () => ready;

export function setPageReady(value: boolean) {
  ready = value;
  if (!value) return;
  const callbacks = [...waiting];
  waiting.clear();
  callbacks.forEach((cb) => cb());
}

/** Runs `cb` once the page is revealed (right away if it already is). Returns a cancel function. */
export function whenPageReady(cb: () => void) {
  if (ready) {
    cb();
    return () => {};
  }
  waiting.add(cb);
  return () => {
    waiting.delete(cb);
  };
}
