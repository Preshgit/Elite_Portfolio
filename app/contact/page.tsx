import { ArrowUpRight, Mail, MessagesSquareIcon, PhoneCall, Send } from "lucide-react";
import FooterArc from "../components/FooterArc";
import Headings from "../components/headings";
import { glowGradient } from "../components/glow";
import ContactForm from "./ContactForm";
import { mailtoUrl, site, telegramUrl, whatsappUrl } from "@/lib/site";

const contactDetails = [
  {
    label: "WhatsApp",
    value: "Chat with me on WhatsApp",
    href: whatsappUrl,
    icon: MessagesSquareIcon,
  },
  {
    label: "Telegram",
    value: `@${site.telegram}`,
    href: telegramUrl,
    icon: Send,
  },
  {
    label: "Email",
    value: site.email,
    href: mailtoUrl,
    icon: Mail,
  },
  {
    label: "Phone",
    value: site.phones.join(" · "),
    href: `tel:${site.phones[0]}`,
    icon: PhoneCall,
  },
];

export default function ContactPage() {
  return (
    <main className="relative overflow-clip bg-black text-white">
      <section className="relative isolate">
        <div
          aria-hidden
          className="absolute left-1/2 -top-[320px] -z-10 h-[1000px] w-[1300px] -translate-x-1/2"
          style={{ background: glowGradient }}
        />
        <div className="grain" />

        <div className="mx-auto max-w-7xl gutter pb-16 pt-32 md:pb-24 md:pt-40">
          {/* Heading */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-end">
            <div>
              <Headings text="Book a consultation" textClassName="text-white" />
              <h1
                data-fx="words"
                className="unbounded mt-6 text-balance text-[36px] font-bold leading-[102%] tracking-[-0.07em] md:text-[60px] lg:text-[72px]"
              >
                Let&apos;s build the future together.
              </h1>
            </div>
            <p data-fx="rise" className="jost max-w-[40ch] text-[18px] leading-[145%] text-white/70 md:text-[21px]">
              Partner, collaborate, or engage to drive meaningful impact and create
              lasting value across sectors and communities.
            </p>
          </div>

          {/* Channels + form */}
          <div className="mt-14 grid grid-cols-1 gap-6 md:mt-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-8">
            <ul data-fx="stagger" className="grid min-w-0 grid-cols-1 content-start gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {contactDetails.map((item) => {
                const Icon = item.icon;
                const external = item.href.startsWith("http");
                return (
                  <li key={item.label} className="min-w-0">
                    <a
                      href={item.href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group flex items-center gap-4 rounded-[24px] border border-white/15 bg-[#0b0a10] p-5 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-[#F8A308]/60 md:p-6"
                    >
                      <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#F8A308] text-black">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="unbounded block text-[16px] font-semibold tracking-[-0.03em] md:text-[18px]">
                          {item.label}
                        </span>
                        <span className="jost mt-1 block truncate text-[15px] text-white/55">{item.value}</span>
                      </span>
                      <ArrowUpRight
                        aria-hidden
                        className="size-5 shrink-0 text-white/40 transition-[color,transform] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#F8A308]"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>

            <div
              id="contact-form"
              data-fx="rise"
              className="relative overflow-hidden rounded-[32px] border border-white/15 bg-white/[0.03] p-6 backdrop-blur-xl md:p-10"
            >
              <div aria-hidden className="pointer-events-none absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-[#F8A308]/70 to-transparent" />
              <h2 className="unbounded text-[22px] font-bold tracking-[-0.05em] md:text-[28px]">Send a message</h2>
              <p className="jost mt-2 text-white/60">Tell me what you need and you&apos;ll get a reply by email.</p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
      <FooterArc />
    </main>
  );
}
