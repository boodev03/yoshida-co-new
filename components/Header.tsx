"use client";

import Image from "next/image";
import Navbar from "./Navbar";
import HeaderButton from "./HeaderButton";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import HamburgerMenu from "./HamburgerMenu";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "@/providers/translation-provider";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { locale } = useTranslations();
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
        "px-4 xl:px-6 2xl:px-[72px]"
      )}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Link href="/" className="block size-full relative z-[9999999999999]">
          <Image
            src={cn(
              locale === "ja" ? "/images/logo.png" : "/images/Logo_en.svg"
            )}
            alt="logo"
            width={120}
            height={34}
            className="!min-w-[120px] w-max h-[34px] hidden md:block object-cover"
            quality={100}
          />
          <Image
            src={cn(
              locale === "ja" ? "/images/logo.png" : "/images/Logo_en.svg"
            )}
            alt="logo"
            width={120}
            height={30}
            className="!min-w-[120px] w-max h-[30px] md:hidden"
          />
        </Link>
      </motion.div>
      <motion.div
        className="hidden mlg:flex items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Navbar />
        <HeaderButton />
      </motion.div>
      <motion.div
        className="mlg:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <HamburgerMenu isScrolled={isScrolled} />
      </motion.div>
    </motion.header>
  );
}
