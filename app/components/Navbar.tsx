"use client";

import { Menu, PhoneOutgoing } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { motion } from "motion/react";

type NavbarProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

function MobileNav({ isOpen, setIsOpen }: NavbarProps) {
  return (
    <div
      className="flex h-14 items-center gap-2 rounded-full border border-white/10 bg-[#0a0812]/60 p-1.5 pr-3 backdrop-blur-md md:hidden"
    >
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Link
          href={"/contact"}
          aria-label="Contact"
          className="flex size-11 items-center justify-center rounded-full bg-[#F8A308] text-black"
        >
          <PhoneOutgoing strokeWidth={2.1} className="size-5" />
        </Link>
      </motion.div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="flex size-10 items-center justify-center"
        aria-label="Open menu"
        onClick={() => setIsOpen(true)}
      >
        <Menu color="white" size={26} />
      </motion.button>
    </div>
  );
}

export default MobileNav;
