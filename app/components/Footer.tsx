import Link from "next/link";
import Image from "next/image";
import { mailtoUrl, site } from "@/lib/site";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about-me", label: "About Me" },
  { href: "/services", label: "Services" },
  { href: "/blogs", label: "Blogs" },
  { href: "/contact", label: "Contact Me" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy policy" },
  { href: "/terms", label: "Terms and condition" },
  { href: "/disclaimer", label: "Risk disclaimer" },
];

const Footer = () => {
  return (
    <footer
      className="w-screen overflow-hidden  text-white font-jost"
      style={{ background: "url(/footer.png)" }}
    >
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-5">
            <p className="text-xl select-none leading-[99%] tracking-[-8%] text-white/60 jost">
              The crypto trader that makes you money.
            </p>
            <Image
              src="/Ayomide Logo 1.png"
              alt="Elite Ayomide logo"
              width={40}
              height={40}
            />
          </div>
          <div className="jost leading-[90%] tracking-[-8%] text-[20px]">
            <h3 className="text-[20px] font-medium mb-4 text-white/50 ">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="jost leading-[90%] tracking-[-8%] text-[20px]">
            <h3 className="text-[20px] font-medium mb-4 text-white/50 ">
              Supports
            </h3>
            <div className="space-y-4  text-white/50">
              <div className="space-y-2">
                <p className="text-white/50">Reach me directly?</p>
                <div className="space-y-3">
                  {site.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone}`}
                      className="block text-white font-medium"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-white/50">Need support?</p>
                <a href={mailtoUrl} className="block text-white break-all">
                  {site.email}
                </a>
              </div>
            </div>
          </div>
          <div className="jost text-white/50 leading-[90%] tracking-[-8%] text-[20px]">
            <h3 className=" font-medium mb-4 ">Socials</h3>
            <ul className="space-y-4">
              {site.socials.map((social) => (
                <li key={social.label}>
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 jost">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[18px] tracking-[-5%] text-gray-400">
          <p>© EliteAyomide. All Rights Reserved. Built by WebsiteHub</p>

          <div className="flex flex-wrap justify-center gap-4 text-[13px]">
            {legalLinks.map((link, i) => (
              <span key={link.href} className="flex gap-4">
                {i > 0 && <span aria-hidden>|</span>}
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </span>
            ))}
          </div>
        </div>
        <p className="max-w-6xl mx-auto px-6 text-[12px] leading-relaxed text-white/30 text-center md:text-left">
          Trading crypto and other financial instruments carries a high level
          of risk and may not be suitable for everyone. Past results do not
          guarantee future returns. Nothing on this site is financial advice.{" "}
          <Link href="/disclaimer" className="underline hover:text-white/60">
            Read the full disclaimer
          </Link>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
