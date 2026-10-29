const words = ["Contribution", "Participation", "Attribution"];

/** A gold band of his three pillars that glides across the page. */
function Contributions() {
  // Repeat enough times to cover wide screens, then double for a seamless loop
  const run = [...words, ...words, ...words];

  return (
    <section id="contributions" aria-label="Contribution, participation, attribution" className="relative py-10 md:py-14">
      <div className="marquee-row -mx-4 -rotate-2 overflow-hidden border-y border-black/20 bg-[#F8A308] py-4 md:py-6">
        <div
          aria-hidden
          className="marquee-track flex w-max items-center"
          style={{ animation: "aboutTicker 40s linear infinite" }}
        >
          {[...run, ...run].map((word, i) => (
            <span key={i} className="flex items-center">
              <span className="unbounded px-6 text-[28px] font-bold uppercase leading-none tracking-[-0.06em] text-black md:px-10 md:text-[52px]">
                {word}
              </span>
              <svg aria-hidden viewBox="0 0 24 24" className="size-6 fill-black md:size-9">
                <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" />
              </svg>
            </span>
          ))}
        </div>
      </div>
      <style>{`@keyframes aboutTicker { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </section>
  );
}

export default Contributions;
