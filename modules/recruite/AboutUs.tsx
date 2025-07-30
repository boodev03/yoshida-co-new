"use client";

import { Button } from "@/components/ui/button";
import { useTransform, motion, useScroll } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { useTranslations } from "@/providers/translation-provider";

export default function AboutUs() {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [startScrollY, setStartScrollY] = useState(0);
  const { scrollY } = useScroll();
  const { recruit } = useTranslations();
  const { aboutUs } = recruit;

  const ScrollDown = () => {
    return (
      <motion.div className="absolute top-0 right-8 mlg:right-[60px] flex items-center -rotate-90 gap-2 cursor-default origin-top-right transition-opacity duration-300">
        <p className="font-shippori-mincho font-bold text-web-main rotate-180 text-[10px] md:text-xs leading-[16px] tracking-[0.025em] w-max uppercase">
          {aboutUs.message}
        </p>
        <div className="relative w-[60px] md:w-[120px]">
          {/* Static line */}
          <div className="w-full h-[1px] bg-[#1247AF]" />

          {/* Animated line */}
          {/* <motion.div
            className="absolute top-0 left-0 w-[20%] h-[1px] bg-white"
            animate={{
              x: ["0%", "300%"],
            }}
            transition={{
              duration: 1.2,
              times: [0, 1],
              ease: ["easeOut", "easeOut", "easeOut"],
              repeat: Infinity,
              repeatDelay: 1,
            }}
          /> */}
        </div>
      </motion.div>
    );
  };

  // Track when the element enters viewport
  const handleViewportEnter = () => {
    setIsInView(true);
    setStartScrollY(window.scrollY);
  };

  const handleViewportLeave = () => {
    setIsInView(false);
  };

  // First triangle movement - vertical float with slight rotation
  const yFloat1 = useTransform(scrollY, (value) => {
    if (!isInView) return 0;
    const scrollDelta = value - startScrollY;
    return -scrollDelta * 0.15;
  });

  const rotateFloat1 = useTransform(scrollY, (value) => {
    if (!isInView) return -30;
    const scrollDelta = value - startScrollY;
    return -30 + Math.sin(scrollDelta * 0.003) * 5;
  });

  // Second triangle movement - horizontal wave with rotation and scale
  const xFloat2 = useTransform(scrollY, (value) => {
    if (!isInView) return 0;
    const scrollDelta = value - startScrollY;
    return Math.sin(scrollDelta * 0.004) * 20;
  });

  const rotateFloat2 = useTransform(scrollY, (value) => {
    if (!isInView) return -45;
    const scrollDelta = value - startScrollY;
    return -45 + Math.cos(scrollDelta * 0.005) * 8;
  });

  const scaleFloat2 = useTransform(scrollY, (value) => {
    if (!isInView) return 1;
    const scrollDelta = value - startScrollY;
    return 1 + Math.sin(scrollDelta * 0.006) * 0.05;
  });

  return (
    <div className="relative">
      <ScrollDown />
      <motion.section
        ref={sectionRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        onViewportEnter={handleViewportEnter}
        onViewportLeave={handleViewportLeave}
        className="container mx-auto py-[60px] sm:py-[70px] md:py-[80px] mlg:py-20 relative"
      >
        <div className="flex flex-col-reverse sm:flex-col-reverse md:flex-col-reverse mlg:flex-col gap-12 sm:gap-10 md:gap-11 mlg:gap-10 mlg:pb-[200px]">
          {/* Card */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex gap-4 justify-end items-center relative z-10"
            >
              <motion.p
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-jp-h1 text-white font-shippori-mincho font-bold bg-web-main p-4 relative translate-y-1/3 sm:translate-y-1/4 md:translate-y-1/3"
              >
                {aboutUs.title1.split("").map((char, index) => (
                  <span key={index}>
                    {char} {index < aboutUs.title1.length - 1 && <br />}
                  </span>
                ))}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-jp-h1 text-white font-shippori-mincho font-bold bg-web-main p-4"
              >
                {aboutUs.title2.split("").map((char, index) => (
                  <span key={index}>
                    {char} {index < aboutUs.title2.length - 1 && <br />}
                  </span>
                ))}
              </motion.p>
            </motion.div>
            <div className="aspect-square w-[544px] max-w-full relative -top-[70px] -left-6 z-0 mlg:hidden">
              <Image src="/images/job-opening.png" alt="About Us" fill />
            </div>
          </div>

          {/* Content */}
          <div className="flex gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="sm:max-w-3/4 md:max-w-2/3 mlg:max-w-1/2"
            >
              <p className="text-base font-shippori-mincho font-medium whitespace-pre-wrap">
                {aboutUs.content}
              </p>
            </motion.div>

            <div className="aspect-square w-[544px] max-w-full relative -top-[70px] z-0 hidden mlg:block">
              <Image src="/images/recruit/about-us.webp" alt="About Us" fill />
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex pt-0 mlg:pt-20 flex-col items-center gap-6"
        >
          <motion.div transition={{ duration: 0.2 }}>
            <Button className="rounded-[3px] font-shippori-mincho text-[28px] sm:text-[30px] md:text-[32px] h-12 sm:h-13 md:h-14">
              {aboutUs.button}
            </Button>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="font-shippori-mincho text-sm sm:text-base md:text-base text-center"
          >
            {aboutUs.subtitle}
          </motion.p>
        </motion.div>

        {/* First triangle with vertical float, rotation, and fine grainy effect */}
        <motion.div
          initial={{ opacity: 0, rotate: -20 }}
          whileInView={{ opacity: 1, rotate: -30 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{
            y: yFloat1,
            rotate: rotateFloat1,
            clipPath: "polygon(0% 0%, 100% 50%, 0% 100%)",
            filter: "url(#fineGrainy)",
          }}
          className="size-[200px] sm:size-[300px] md:size-[500px] absolute -rotate-[30deg] sm:-rotate-[35deg] xl:-rotate-45 bg-web-light-bg top-[60%] -translate-y-1/2 xl:-translate-y-0 md:top-[60%] right-0 md:right-0 translate-x-1/3 sm:translate-x-1/3 md:translate-x-1/2 -z-[1]"
        >
          <svg width="0" height="0">
            <filter id="fineGrainy">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.8"
                numOctaves="2"
                stitchTiles="stitch"
              />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.3" intercept="0.35" />
              </feComponentTransfer>
              <feBlend mode="soft-light" in="SourceGraphic" />
            </filter>
          </svg>
        </motion.div>

        {/* Second triangle with horizontal wave, rotation, scale, and fine grainy effect */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{
            x: xFloat2,
            scale: scaleFloat2,
            rotate: rotateFloat2,
            clipPath: "polygon(0% 0%, 100% 50%, 0% 100%)",
            filter: "url(#fineGrainy)",
          }}
          className="size-[300px] sm:size-[400px] md:size-[600px] xl:size-[800px] absolute bg-web-light-bg top-1/4 sm:top-1/5 md:top-[15%] xl:top-[5%] -translate-x-1/3 sm:-translate-x-1/4 md:-translate-x-1/5 xl:-translate-x-0 -left-[20%] sm:-left-[15%] md:-left-[10%] -z-[1]"
        >
          <svg width="0" height="0">
            <filter id="fineGrainy">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.8"
                numOctaves="2"
                stitchTiles="stitch"
              />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.3" intercept="0.35" />
              </feComponentTransfer>
              <feBlend mode="soft-light" in="SourceGraphic" />
            </filter>
          </svg>
        </motion.div>
      </motion.section>
    </div>
  );
}
