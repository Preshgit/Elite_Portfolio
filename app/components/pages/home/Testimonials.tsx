import { Quote } from "lucide-react";
import Headings from "../../headings";
import SectionContent from "../../SectionContent";

export interface Testimonial {
  name: string;
  handle?: string;
  avatar?: string;
  rating?: number;
  content: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

const StarRating = ({ rating = 5 }: { rating?: number }) => (
  <div className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        aria-hidden
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill={i < rating ? "#F8A308" : "none"}
        stroke={i < rating ? "#F8A308" : "#00000030"}
        strokeWidth="2"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ))}
  </div>
);

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
  <figure className="flex w-[300px] shrink-0 flex-col rounded-[28px] border border-black/[0.08] bg-white p-7 shadow-[0_20px_50px_-30px_rgba(20,10,60,0.35)] sm:w-[380px]">
    <div className="flex items-center justify-between">
      <Quote aria-hidden className="size-8 fill-[#F8A308] text-[#F8A308]" />
      <StarRating rating={testimonial.rating} />
    </div>
    <blockquote className="jost mt-6 flex-1 text-[19px] leading-[140%] tracking-[-0.01em] text-black/75 sm:text-[21px]">
      {testimonial.content}
    </blockquote>
    <figcaption className="mt-8 flex items-center gap-3 border-t border-black/[0.08] pt-5">
      <span
        aria-hidden
        className="unbounded flex size-11 items-center justify-center rounded-full bg-linear-to-br from-[#3E1FE8] to-[#1a0f5c] text-[13px] font-semibold text-white"
      >
        {initials(testimonial.name)}
      </span>
      <span>
        <span className="jakarta block text-[16px] font-bold text-black">{testimonial.name}</span>
        {testimonial.handle && (
          <span className="jost block text-[14px] text-black/45">{testimonial.handle}</span>
        )}
      </span>
    </figcaption>
  </figure>
);

/** One row that glides sideways forever; pauses on hover. */
const MarqueeRow = ({
  items,
  reverse = false,
  duration,
}: {
  items: Testimonial[];
  reverse?: boolean;
  duration: string;
}) => (
  <div className="marquee-row relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
    <div
      className="marquee-track flex w-max gap-5 py-3"
      style={{
        animation: `${reverse ? "marqueeRight" : "marqueeLeft"} ${duration} linear infinite`,
      }}
    >
      {/* Second copy makes the loop seamless; hidden from screen readers */}
      {[...items, ...items].map((t, i) => (
        <div key={i} aria-hidden={i >= items.length || undefined}>
          <TestimonialCard testimonial={t} />
        </div>
      ))}
    </div>
  </div>
);

const Testimonials = ({ testimonials }: TestimonialsProps) => {
  const half = Math.ceil(testimonials.length / 2);
  const rowA = testimonials.slice(0, half);
  const rowB = testimonials.slice(half);

  return (
    <section id="testimonials" className="relative overflow-hidden bg-[#f6f5fb]">
      <style>{`
        @keyframes marqueeLeft  { from { transform: translateX(0); }    to { transform: translateX(-50%); } }
        @keyframes marqueeRight { from { transform: translateX(-50%); } to { transform: translateX(0); } }
      `}</style>

      <SectionContent className="pb-0! md:pb-0!">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-5">
            <Headings
              text="What clients say"
              className="bg-[#F8A308]!"
              textClassName="text-black/70"
            />
            <h2
              data-fx="words"
              className="unbounded text-balance text-[34px] font-extrabold leading-[105%] tracking-[-0.07em] text-black md:text-[52px]"
            >
              500+ trusted customers
            </h2>
          </div>
          <p data-fx="rise" className="jost max-w-[36ch] text-[18px] leading-[140%] text-black/55 md:text-[20px]">
            Traders, students and brands who have worked with Elite Ayomide, in
            their own words.
          </p>
        </div>
      </SectionContent>

      <div className="space-y-2 pb-16 pt-12 md:pb-24 md:pt-14">
        <MarqueeRow items={rowA} duration="55s" />
        <MarqueeRow items={rowB.length ? rowB : rowA} reverse duration="65s" />
      </div>
    </section>
  );
};

export default Testimonials;
