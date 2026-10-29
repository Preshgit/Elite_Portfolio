"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ContactUsBtn from "./ContactUs";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import MobileNav from "./Navbar";
import Sidebar from "./Sidebar";
import { pauseScroll } from "@/lib/scroll";

const navItems = [
  { label: "Home", href: "/", exact: true },
  { label: "About Me", href: "/about-me" },
  { label: "Services", href: "/services" },
  { label: "Book Consultation", href: "/contact", aliases: ["/contact-us"] },
];

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(true);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 780;
      setIsMobileViewport(isMobile);

      if (!isMobile) {
        setIsMobileNavVisible(true);
        lastScrollY.current = window.scrollY;
      }
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (!isMobileViewport) {
        return;
      }

      if (currentScrollY <= 0) {
        setIsMobileNavVisible(true);
        lastScrollY.current = 0;
        return;
      }

      const isScrollingDown = currentScrollY > lastScrollY.current + 4;
      const isScrollingUp = currentScrollY < lastScrollY.current - 4;

      if (isScrollingDown && currentScrollY > 64) {
        setIsMobileNavVisible(false);
      } else if (isScrollingUp) {
        setIsMobileNavVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    handleResize();
    lastScrollY.current = window.scrollY;
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobileViewport]);

  useEffect(() => {
    pauseScroll(isOpen);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <motion.header
      initial={false}
      animate={{
        y: isMobileViewport && !isMobileNavVisible && !isOpen ? "-100%" : 0,
      }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn(
        // No full-width strip: only the logo, pill and button float over the page
        "pointer-events-none fixed top-0 left-0 right-0 z-[1000000] w-full bg-transparent [&_a]:pointer-events-auto [&_button]:pointer-events-auto [&_ul]:pointer-events-auto",
      )}
    >
      <nav className="gutter mx-auto flex max-w-450 items-center justify-between py-4 lg:py-5">
        <Link href="/">
          <Image
            alt="logo"
            src="/Ayomide Logo 1.png"
            width={50}
            height={47}
            loading="eager"
            style={{ width: "auto", height: "auto" }}
          />
        </Link>
        <MobileNav isOpen={isOpen} setIsOpen={setIsOpen} />
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <ul className="jost z-50 hidden items-center gap-1 rounded-full border border-white/10 bg-[#0a0812]/60 p-1.5 uppercase text-white shadow-[0_10px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur-md md:flex lg:gap-2">
          {navItems.map((item) => {
            const activePaths = [item.href, ...(item.aliases ?? [])];
            const isActive = item.exact
              ? activePaths.includes(pathname)
              : activePaths.some(
                  (activePath) =>
                    pathname === activePath ||
                    pathname.startsWith(`${activePath}/`),
                );

            return (
              <motion.li key={item.label} layout className="relative">
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative z-10 rounded-full jost font-medium text-[12px] px-4 py-3 transition-colors duration-200 hover:text-[#F8A308] flex items-center justify-center",
                    isActive && "text-white font-semibold px-10 py-4",
                  )}
                >
                  {item.label}
                </Link>
                {isActive && (
                  <motion.div
                    layoutId="nav-active-bg"
                    className="absolute inset-0 -z-0 rounded-full border border-[#F8A308]/50 bg-[#F8A308]/15"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.li>
            );
          })}
        </ul>
        <ContactUsBtn />
      </nav>
    </motion.header>
  );
}

export default Header;
