/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import CareerPathCardMobile from "./CareerPathCardMobile";
import CareerPathCard from "./CareerPathCard";
import { useTranslations } from "@/providers/translation-provider";
import { useState } from "react";

export default function CareerPath() {
  const { dict } = useTranslations();
  // Use dict.careerPath.verticalTexts and dict.careerPath.cards for i18n
  const careerPath = dict.careerPath?.verticalTexts || [];
  const careerPathData = dict.careerPath?.cards || [];

  const [isInView, setIsInView] = useState(false);
  const [startScrollY, setStartScrollY] = useState(0);
  const { scrollY } = useScroll();

  const handleViewportEnter = () => {
    setIsInView(true);
    setStartScrollY(window.scrollY);
  };

  const handleViewportLeave = () => {
    setIsInView(false);
  };

  const yFloat = useTransform(scrollY, (value) => {
    if (!isInView) return 0;
    const scrollDelta = value - startScrollY;
    return -scrollDelta * 0.2;
  });

  const xFloat = useTransform(scrollY, (value) => {
    if (!isInView) return 0;
    const scrollDelta = value - startScrollY;
    return Math.sin(scrollDelta * 0.005) * 15;
  });

  return (
    <motion.section
      onViewportEnter={handleViewportEnter}
      onViewportLeave={handleViewportLeave}
      className="mt-[82px] mlg:mt-[90px] mlg:pt-[120px] pb-[60px] mlg:pb-[120px] font-shippori-mincho space-y-12 mlg:space-y-[72px]"
    >
      <div className="flex flex-col mlg:flex-row container mx-auto items-start gap-12 mlg:gap-[136px]">
        <motion.div
          className="flex items-start gap-8 w-full mlg:w-fit"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="flex-1 flex pt-8 gap-2">
            {careerPath.map((text: string, index: number) => {
              const reverseIndex = careerPath.length - 1 - index;
              return (
                <motion.p
                  key={index}
                  className="text-[15px] mlg:text-base tracking-[0.02em] font-medium"
                  style={{
                    writingMode: "vertical-lr",
                    WebkitWritingMode: "vertical-lr",
                    msWritingMode: "vertical-lr",
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + reverseIndex * 0.05,
                  }}
                >
                  {text}
                </motion.p>
              );
            })}
          </div>
          <motion.p
            className="shrink-0 mlg:tracking-[0.04em] text-center text-xl mlg:text-[32px] leading-none text-white font-bold bg-web-main px-8 py-4 relative"
            style={{
              writingMode: "vertical-rl",
              WebkitWritingMode: "vertical-rl",
              msWritingMode: "vertical-rl",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {dict.careerPath?.title || "キャリアパス"}
          </motion.p>
        </motion.div>
        {/* Image */}
        <motion.div
          className="aspect-video relative w-full"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Image
            src="/images/career-path/banner.webp"
            alt={dict.careerPath?.bannerAlt || "Career Path"}
            fill
            className="object-cover"
          />
        </motion.div>
      </div>

      {/* List */}
      <div className="relative">
        {/* First triangle with conditional movement and fine grainy effect */}
        <motion.div
          initial={{ opacity: 0, rotate: -20 }}
          whileInView={{ opacity: 1, rotate: -30 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{
            x: xFloat,
            y: yFloat,
            clipPath: "polygon(0% 0%, 100% 50%, 0% 100%)",
            filter: "url(#fineGrainy)",
          }}
          className="size-[200px] md:size-[1600px] absolute rotate-[30deg] xl:-rotate-[10deg] bg-web-light-bg bottom-0 translate-y-1/3 md:bottom-0 md:top-[unset] left-0 t-ranslate-x-1/3 -z-[1]"
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

        {/* Second triangle with conditional movement and fine grainy effect */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{
            x: xFloat,
            y: yFloat,
            rotate: -45,
            clipPath: "polygon(0% 0%, 100% 50%, 0% 100%)",
            filter: "url(#fineGrainy)",
          }}
          className="size-[300px] xl:size-[800px] absolute bg-web-light-bg top-1/4 xl:-top-[15%] -translate-x-1/3 xl:-translate-x-0 left-0 -z-[1]"
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

        {/* Third triangle with conditional movement and fine grainy effect */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{
            x: xFloat,
            y: yFloat,
            rotate: -80,
            clipPath: "polygon(0% 0%, 100% 50%, 0% 100%)",
            filter: "url(#fineGrainy)",
          }}
          className="size-[300px] xl:size-[1200px] bg-web-light-bg absolute top-[94px] xl:top-1/2 translate-x-1/3 xl:translate-x-0 xl:-translate-y-1/2 right-0 -z-[2]"
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
        <div className="container mx-auto">
          <motion.div
            className="block mlg:hidden px-6 space-y-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {careerPathData.map((item: any, index: number) => (
              <motion.div
                key={item.index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <CareerPathCardMobile
                  index={item.index}
                  position={item.position}
                  title={item.title}
                  description={item.description}
                  before={item.before}
                  steps={item.steps}
                  now={item.now}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Desktop */}
          <motion.div
            className="hidden mlg:block space-y-[96px]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {careerPathData.map((item: any, index: number) => (
              <motion.div
                key={item.index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <CareerPathCard
                  index={item.index}
                  position={item.position}
                  title={item.title}
                  description={item.description}
                  before={item.before}
                  steps={item.steps}
                  now={item.now}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
