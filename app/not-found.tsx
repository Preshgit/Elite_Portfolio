import Link from "next/link";
import Hero from "./components/Hero";

export default function NotFound() {
  return (
    <main className="bg-black text-white">
      <Hero
        animate
        className="min-h-screen flex flex-col items-center justify-center text-center px-6"
      >
        <div className="relative z-10 space-y-6">
          <p className="unbounded text-[80px] md:text-[140px] font-bold leading-none tracking-[-0.08em] text-transparent bg-clip-text bg-linear-to-b from-white to-blue-800">
            404
          </p>
          <h1 className="unbounded text-2xl md:text-4xl font-bold">
            This page doesn&apos;t exist.
          </h1>
          <p className="jost text-white/50 md:text-xl">
            The link may be broken or the page may have moved.
          </p>
          <Link
            href="/"
            className="jakarta inline-flex items-center justify-center rounded-full bg-white px-8 py-4 font-semibold text-black"
          >
            Back to home
          </Link>
        </div>
      </Hero>
    </main>
  );
}
