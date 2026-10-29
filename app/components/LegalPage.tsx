import { glowGradient } from "./glow";

interface Section {
  heading: string;
  body: string[];
}

interface LegalPageProps {
  title: string;
  updated: string;
  intro: string;
  sections: Section[];
}

// Shared layout for the Privacy, Terms and Risk Disclaimer pages.
export default function LegalPage({ title, updated, intro, sections }: LegalPageProps) {
  return (
    <main className="relative isolate overflow-clip bg-black text-white">
      <div
        aria-hidden
        className="absolute left-1/2 -top-[420px] -z-10 h-[900px] w-[1200px] -translate-x-1/2"
        style={{ background: glowGradient }}
      />
      <article className="jost relative z-10 mx-auto max-w-3xl gutter pb-24 pt-32 md:pt-44">
        <h1 className="unbounded text-3xl md:text-5xl font-bold leading-[113%] tracking-[-4%]">
          {title}
        </h1>
        <p className="mt-3 text-sm text-white/40">Last updated: {updated}</p>
        <p className="mt-8 text-lg leading-relaxed text-white/70">{intro}</p>
        {sections.map((section) => (
          <section key={section.heading} className="mt-10">
            <h2 className="unbounded text-xl md:text-2xl text-[#F8A308]">
              {section.heading}
            </h2>
            {section.body.map((paragraph, i) => (
              <p key={i} className="mt-4 leading-relaxed text-white/60">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </article>
    </main>
  );
}
