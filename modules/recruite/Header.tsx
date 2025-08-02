"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "./Navbar";
import HamburgerMenu from "./HamburgerMenu";
import HeaderButton from "./HeaderButton";

interface IProps {
  isWhite?: boolean;
}

export default function Header({ isWhite = true }: IProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "max-w-full h-[82px] mlg:h-[90px] flex items-center justify-between fixed top-0 left-0 right-0 z-[99999] transition-all duration-300",
        `${isScrolled ? "bg-white md:bg-white shadow-md" : "bg-transparent"}`,
        "px-4 xl:px-6 2xl:px-[72px] font-shippori-mincho"
      )}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex items-center gap-2"
      >
        <Link href="/recruit" className="block">
          <Image
            src={
              isWhite
                ? isScrolled
                  ? "/images/logo.png"
                  : "/images/light-logo.png"
                : "/images/logo.png"
            }
            alt="logo"
            width={120}
            height={34}
            className="w-[120px] h-[34px] object-cover"
          />
        </Link>
        <p
          className={cn(
            "text-xs font-normal text-center",
            isScrolled
              ? "text-web-main"
              : isWhite
              ? "text-white"
              : "text-web-main"
          )}
        >
          Corporation <br /> Recruit site
        </p>
      </motion.div>
      <motion.div
        className="hidden mlg:flex items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Navbar isWhite={!isScrolled && isWhite} />
        <HeaderButton isWhite={!isScrolled && isWhite} />
      </motion.div>
      <motion.div
        className="mlg:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <HamburgerMenu
          isScrolled={isScrolled}
          isWhite={!isScrolled && isWhite}
        />
      </motion.div>
    </motion.header>
  );
}
