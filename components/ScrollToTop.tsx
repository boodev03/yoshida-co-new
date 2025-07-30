"use client";

import Image from "next/image";
import { ArrowTopLong } from "./icons/ArrowTopLong";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface IProps {
  className?: string;
  scrollToTopButtonClassName?: string;
  instagramButtonClassName?: string;
}

export default function ScrollToTop({
  className,
  scrollToTopButtonClassName,
  instagramButtonClassName,
}: IProps) {
  const [isInFooter, setIsInFooter] = useState(false);

  useEffect(() => {
    const checkIfInFooter = () => {
      const footer = document.getElementById("footer");
      const scrollPosition = window.scrollY + window.innerHeight;

      if (footer) {
        const footerPosition = footer.offsetTop;
        setIsInFooter(scrollPosition >= footerPosition - 60);
      }
    };

    // Check initial position
    checkIfInFooter();

    // Add scroll listener
    window.addEventListener("scroll", checkIfInFooter);

    // Cleanup
    return () => window.removeEventListener("scroll", checkIfInFooter);
  }, []);

  const onBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-8 fixed bottom-4 md:bottom-14 right-6 md:right-14 z-[99999999999] px-2 py-5 rounded-full transition-colors duration-300",
        className
      )}
    >
      <a
        href="https://www.instagram.com/yoshida1923_japan/"
        target="_blank"
        className={cn(
          "hover:opacity-80 transition-opacity duration-300",
          instagramButtonClassName
        )}
      >
        <Image
          src={
            isInFooter ? "/images/instagram-white.png" : "/images/instagram.png"
          }
          alt="instagram"
          width={24}
          height={24}
        />
      </a>
      <button
        onClick={onBackToTop}
        className={cn(
          "flex items-center justify-center size-10 rounded-full transition-colors duration-300",
          scrollToTopButtonClassName,
          isInFooter
            ? "bg-white hover:bg-white/80 text-web-dark"
            : "bg-web-dark hover:bg-web-dark/80 text-white"
        )}
      >
        <ArrowTopLong />
      </button>
    </div>
  );
}
