"use client";
import { Check, Mail, MessagesSquare, Send } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Headings from "../../headings";
import SectionContent from "../../SectionContent";
import { glowGradient } from "../../glow";
import { mailtoUrl, telegramUrl, whatsappUrl } from "@/lib/site";

export interface FAQItem {
  question: string;
  answer: string | string[];
}

interface FAQProps {
  items: FAQItem[];
}

const channels = [
  { label: "Telegram", href: telegramUrl, icon: Send },
  { label: "WhatsApp", href: whatsappUrl, icon: MessagesSquare },
  { label: "Email", href: mailtoUrl, icon: Mail },
];

const FAQ = ({ items }: FAQProps) => {
  return (
    <section id="faq" className="relative overflow-clip bg-black text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[20%] top-0 h-[700px] w-[900px] opacity-50"
        style={{ background: glowGradient }}
      />
      <SectionContent className="relative grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        {/* Left: heading and a way out for anyone whose question isn't listed */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Headings text="FAQ" textClassName="text-white" />
          <h2
            data-fx="words"
            className="unbounded mt-6 text-balance text-[32px] font-extrabold leading-[105%] tracking-[-0.07em] md:text-[48px]"
          >
            Questions, answered.
          </h2>
          <p data-fx="rise" className="jost mt-5 max-w-[38ch] text-[18px] leading-[140%] text-white/65 md:text-[20px]">
            Quick answers about Elite Ayomide&apos;s services, who they&apos;re for
            and how to get started.
          </p>

          <div
            data-fx="rise"
            className="mt-10 rounded-[28px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm md:p-7"
          >
            <p className="unbounded text-[17px] font-semibold tracking-[-0.03em]">Still have questions?</p>
            <p className="jost mt-2 text-white/60">Message directly. You&apos;ll get a personal reply.</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {channels.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="jost inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-[15px] text-white/85 transition-colors duration-150 hover:border-[#F8A308] hover:text-[#F8A308]"
                >
                  <Icon className="size-4" aria-hidden />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right: the questions */}
        <Accordion type="single" collapsible defaultValue="item-0" asChild>
          <ul data-fx="stagger" className="m-0 list-none border-t border-white/10 p-0">
            {items.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                asChild
                className="border-b! border-white/10"
              >
                <li>
                  <AccordionTrigger className="group items-center gap-5 rounded-none py-7 hover:no-underline md:py-8">
                    <span className="flex flex-1 items-baseline gap-4 md:gap-6">
                      <span className="unbounded w-8 shrink-0 text-[13px] text-[#F8A308] md:text-[14px]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="unbounded text-left text-[17px] font-medium leading-[130%] tracking-[-0.03em] text-white transition-colors group-hover:text-[#F8A308] md:text-[22px]">
                        {item.question}
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="jost pb-8 pl-12 pr-4 text-[16px] leading-[160%] text-white/65 md:pl-14 md:text-[18px]">
                    {Array.isArray(item.answer) ? (
                      <ul className="space-y-3">
                        {item.answer.map((point, pointIndex) => (
                          <li key={pointIndex} className="flex items-start gap-3">
                            <Check className="mt-1 size-4 shrink-0 text-[#F8A308]" aria-hidden />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      item.answer
                    )}
                  </AccordionContent>
                </li>
              </AccordionItem>
            ))}
          </ul>
        </Accordion>
      </SectionContent>
    </section>
  );
};

export default FAQ;
