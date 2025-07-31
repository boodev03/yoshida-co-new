"use client";
import { ArrowRight } from "@/components/icons/ArrowRight";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { useTranslations } from "@/providers/translation-provider";
import Link from "next/link";

export default function VisionSection() {
  const { tPath } = useTranslations();
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [startScrollY, setStartScrollY] = useState(0);
  const { scrollY } = useScroll();

  // Track when the element enters viewport
  const handleViewportEnter = () => {
    setIsInView(true);
    setStartScrollY(window.scrollY);
  };

  const handleViewportLeave = () => {
    setIsInView(false);
  };

  // Create transforms only when section is in view
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
      ref={sectionRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      onViewportEnter={handleViewportEnter}
      onViewportLeave={handleViewportLeave}
      className="relative mlg:mt-[130px] xl:mt-[170px] pt-[94px] mlg:pt-[120px] pb-[60px] mlg:pb-[150px]"
    >
      <div className="container px-0 mlg:px-8 2xl:px-0 flex flex-col mlg:flex-row gap-12 mlg:gap-9 mlg:items-center">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="basis-full mlg:basis-5/12 px-6 mlg:px-0"
        >
          <motion.h4
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative section-title text-web-main uppercase"
          >
            {tPath("home.vision.title")}
            <div
              className="absolute top-0 left-0 -translate-x-1/2 size-[30px] bg-web-light -z-[1] rotate-[135deg]"
              style={{ clipPath: "polygon(50% 0%, 100% 82%, 0% 82%)" }}
            />
          </motion.h4>
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full mt-4"
          >
            <p className="text-web-dark text-jp-h1 whitespace-pre-line">
              {tPath("home.vision.heading")}
            </p>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-12 space-y-6"
          >
            <p className="whitespace-pre-wrap break-words text-jp-p1 text-web-dark">
              {tPath("home.vision.content")}
            </p>
            <Button asChild>
              <Link href="/company">
                {tPath("home.vision.button")}
                <ArrowRight />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Right content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative basis-full mlg:basis-7/12 flex flex-col gap-5 mlg:gap-12 mlg:mt-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative xl:w-[544px] max-w-[544px] aspect-video mr-12 xl:mr-0"
          >
            <Image src="/images/top/top-01.webp" alt="Vision" fill />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="relative xl:w-[544px] max-w-[544px] aspect-video ml-12 xl:ml-0 xl:self-end"
          >
            <Image src="/images/top/top-02.webp" alt="Vision" fill />
          </motion.div>
        </motion.div>
      </div>

      {/* Decors with conditional movement */}
      <motion.div
        initial={{ opacity: 0, rotate: -20 }}
        whileInView={{ opacity: 1, rotate: -30 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        style={{
          x: xFloat,
          y: yFloat,
          clipPath: "polygon(0% 0%, 100% 50%, 0% 100%)",
        }}
        className="size-[200px] md:size-[500px] absolute -rotate-[30deg] xl:-rotate-45 bg-web-light-bg top-[60%] -translate-y-1/2 xl:-translate-y-0 md:top-[60%] right-0 md:right-1/2 translate-x-1/3 md:translate-x-1/2 -z-[1]"
      />

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
        }}
        className="size-[300px] xl:size-[800px] absolute bg-web-light-bg top-1/4 xl:top-[5%] -translate-x-1/3 xl:-translate-x-0 left-0 -z-[1]"
      />

      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, delay: 0.2 }}
        style={{
          x: xFloat,
          y: yFloat,
          rotate: -135,
          clipPath: "polygon(0% 0%, 100% 50%, 0% 100%)",
        }}
        className="size-[300px] xl:size-[800px] bg-web-light-bg absolute top-[94px] xl:-top-[20%] translate-x-1/3 xl:translate-x-0 right-0 -z-[2]"
      />
    </motion.section>
  );
}
