"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "@/providers/translation-provider";
import { useState } from "react";

export default function Place() {
  const { dict } = useTranslations();
  const place = dict.place;

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
      className="mt-[82px] mlg:mt-[90px] pt-12 mlg:pt-[120px] pb-[60px] mlg:pb-[120px] font-shippori-mincho space-y-12"
    >
      <div className="container flex flex-col md:flex-row gap-12 md:gap-[136px]">
        <motion.div
          className="flex items-start justify-center gap-8 w-full md:w-fit"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="flex pt-8 gap-2">
            {place.verticalTexts.map((text, index) => {
              const reverseIndex = place.verticalTexts.length - 1 - index;
              return (
                <motion.p
                  key={index}
                  className="text-base tracking-[0.02em] font-medium"
                  style={{
                    writingMode: "vertical-rl",
                    WebkitWritingMode: "vertical-rl",
                    msWritingMode: "vertical-rl",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + reverseIndex * 0.1,
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
            {place.title}
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
          <Image src="/images/place/banner.webp" alt="Place" fill />
        </motion.div>
      </div>

      {/* Main content */}

      <div className="relative">
        {/* Decors with conditional movement and fine grainy effect */}
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
        <div className="container mx-auto pt-0 md:pt-[120px] space-y-6 md:space-y-20">
          <div className="flex flex-col gap-6 md:flex-row-reverse md:justify-between">
            <motion.div
              className="space-y-4 md:max-w-[384px]"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <p className="text-xl mlg:text-[32px] text-web-dark font-bold">
                {place.sections.headquarters.title}
              </p>
              <p className="text-[15px] text-web-dark mlg:text-sm whitespace-pre-line">
                {place.sections.headquarters.description}
              </p>
              <div className="space-y-2 border border-line-gray p-6">
                <p className="text-[15px] text-web-dark mlg:text-base font-semibold">
                  {place.sections.headquarters.address.label}
                </p>
                <p className="text-[13px] text-web-dark mlg:text-sm">
                  {place.sections.headquarters.address.value}
                </p>
                <a
                  href="#"
                  className="underline block text-web-light text-[13px] font-bold"
                >
                  Map
                </a>
              </div>
            </motion.div>
            <motion.div
              className="relative w-full aspect-video max-w-[544px]"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <Image
                src="/images/place/02 headquarters factory.webp"
                alt="Headquarters Factory"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>

          <div className="flex flex-col gap-6 md:flex-row md:gap-8">
            <motion.div
              className="relative flex-1 aspect-video max-w-[544px]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Image
                src="/images/place/03 factory equipments.webp"
                alt="Factory Equipments"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              className="relative flex-1 aspect-video max-w-[544px]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Image
                src="/images/place/04 assembling area of factory.webp"
                alt="Assembling Area of Factory"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              className="relative flex-1 aspect-video max-w-[544px]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Image
                src="/images/place/05 welding area of factory.webp"
                alt="Welding Area of Factory"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>

          <div className="flex flex-col gap-6 md:flex-row md:justify-between">
            <motion.div
              className="space-y-4 md:max-w-[384px]"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <p className="text-xl mlg:text-[32px] text-web-dark font-bold">
                {place.sections.office.title}
              </p>
              <p className="text-[15px] text-web-dark mlg:text-sm">
                {place.sections.office.description}
              </p>
            </motion.div>
            <motion.div
              className="relative w-full aspect-video max-w-[544px]"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <Image
                src="/images/place/06 office.webp"
                alt="Office"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>

          <div className="flex flex-col gap-6 md:flex-row-reverse md:justify-between">
            <motion.div
              className="space-y-4 md:max-w-[384px]"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <p className="text-xl mlg:text-[32px] text-web-dark font-bold">
                {place.sections.meetingRoom.title}
              </p>
              <p className="text-[15px] text-web-dark mlg:text-sm">
                {place.sections.meetingRoom.description}
              </p>
            </motion.div>
            <motion.div
              className="relative w-full aspect-video max-w-[544px]"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <Image
                src="/images/place/07 presenting.webp"
                alt="Presenting"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>

          <div className="flex flex-col gap-6 md:flex-row md:justify-between">
            <motion.div
              className="space-y-4 md:max-w-[384px]"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <p className="text-xl mlg:text-[32px] text-web-dark font-bold">
                {place.sections.cafeteria.title}
              </p>
              <p className="text-[15px] text-web-dark mlg:text-sm">
                {place.sections.cafeteria.description}
              </p>
            </motion.div>
            <motion.div
              className="relative w-full aspect-video max-w-[544px]"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <Image
                src="/images/place/08 eating lunch while chatting.webp"
                alt="Eating Lunch While Chatting"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>

          <div className="flex flex-col gap-6 md:flex-row md:gap-8">
            <motion.div
              className="relative flex-1 aspect-video max-w-[544px]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Image
                src="/images/place/09 homemade miso soup.webp"
                alt="Homemade Miso Soup"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              className="relative flex-1 aspect-video max-w-[544px]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Image
                src="/images/place/10 lunch menu.webp"
                alt="Lunch Menu"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              className="relative flex-1 aspect-video max-w-[544px]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Image
                src="/images/place/11 lunch box.webp"
                alt="Cooperating at the Factory"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>

          <div className="flex flex-col gap-6 md:flex-row-reverse md:justify-between">
            <motion.div
              className="space-y-4 md:max-w-[384px]"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <p className="text-xl mlg:text-[32px] text-web-dark font-bold">
                {place.sections.photoGallery.title}
              </p>
              <p className="text-[15px] text-web-dark mlg:text-sm whitespace-pre-line">
                {place.sections.photoGallery.description}
              </p>
            </motion.div>
            <motion.div
              className="relative w-full aspect-video max-w-[544px]"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <Image
                src="/images/place/11 cooperating at the factory.webp"
                alt="Discussing"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>

          {/* Photo Gallery Carousel */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="overflow-hidden">
              <div className="flex animate-infinite-scroll">
                <div className="flex gap-4 shrink-0">
                  <div className="relative w-[300px] h-[200px] shrink-0">
                    <Image
                      src="/images/place/12 discussing.webp"
                      alt="Discussing"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative w-[300px] h-[200px] shrink-0">
                    <Image
                      src="/images/place/13 seasonal ikebana.webp"
                      alt="Seasonal Ikebana"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative w-[300px] h-[200px] shrink-0">
                    <Image
                      src="/images/place/14 asking.webp"
                      alt="Asking"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative w-[300px] h-[200px] shrink-0">
                    <Image
                      src="/images/place/15 smiling.webp"
                      alt="Smiling"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative w-[300px] h-[200px] shrink-0">
                    <Image
                      src="/images/place/16 discussing.webp"
                      alt="Discussing"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative w-[300px] h-[200px] shrink-0">
                    <Image
                      src="/images/place/17 discussing.webp"
                      alt="Discussing"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative w-[300px] h-[200px] shrink-0">
                    <Image
                      src="/images/place/18 eating.webp"
                      alt="Eating"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative w-[300px] h-[200px] shrink-0">
                    <Image
                      src="/images/place/19 designing.webp"
                      alt="Designing"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative w-[300px] h-[200px] shrink-0">
                    <Image
                      src="/images/place/20 taking a break.webp"
                      alt="Taking a Break"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative w-[300px] h-[200px] shrink-0">
                    <Image
                      src="/images/place/21 using a crane.webp"
                      alt="Using a Crane"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative w-[300px] h-[200px] shrink-0">
                    <Image
                      src="/images/place/22 discussing.webp"
                      alt="Discussing"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative w-[300px] h-[200px] shrink-0">
                    <Image
                      src="/images/place/23 designing.webp"
                      alt="Designing"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Duplicate for seamless loop */}
                <div className="flex gap-4 shrink-0">
                  <div className="relative w-[300px] h-[200px] shrink-0">
                    <Image
                      src="/images/place/13 seasonal ikebana.webp"
                      alt="Seasonal Ikebana"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative w-[300px] h-[200px] shrink-0">
                    <Image
                      src="/images/place/14 asking.webp"
                      alt="Asking"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative w-[300px] h-[200px] shrink-0">
                    <Image
                      src="/images/place/15 smiling.webp"
                      alt="Smiling"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative w-[300px] h-[200px] shrink-0">
                    <Image
                      src="/images/place/16 discussing.webp"
                      alt="Discussing"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative w-[300px] h-[200px] shrink-0">
                    <Image
                      src="/images/place/17 discussing.webp"
                      alt="Discussing"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative w-[300px] h-[200px] shrink-0">
                    <Image
                      src="/images/place/18 eating.webp"
                      alt="Eating"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative w-[300px] h-[200px] shrink-0">
                    <Image
                      src="/images/place/19 designing.webp"
                      alt="Designing"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative w-[300px] h-[200px] shrink-0">
                    <Image
                      src="/images/place/20 taking a break.webp"
                      alt="Taking a Break"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative w-[300px] h-[200px] shrink-0">
                    <Image
                      src="/images/place/21 using a crane.webp"
                      alt="Using a Crane"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative w-[300px] h-[200px] shrink-0">
                    <Image
                      src="/images/place/22 discussing.webp"
                      alt="Discussing"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative w-[300px] h-[200px] shrink-0">
                    <Image
                      src="/images/place/23 designing.webp"
                      alt="Designing"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
