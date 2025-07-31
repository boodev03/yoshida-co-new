"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "@/providers/translation-provider";
import { useState } from "react";
import { Button } from "@/components/ui/button";

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

  const yFloat1 = useTransform(scrollY, (value) => {
    if (!isInView) return 0;
    const scrollDelta = value - startScrollY;
    return -scrollDelta * 0.15;
  });

  const xFloat2 = useTransform(scrollY, (value) => {
    if (!isInView) return 0;
    const scrollDelta = value - startScrollY;
    return Math.sin(scrollDelta * 0.004) * 20;
  });

  const scaleFloat2 = useTransform(scrollY, (value) => {
    if (!isInView) return 1;
    const scrollDelta = value - startScrollY;
    return 1 + Math.sin(scrollDelta * 0.006) * 0.05;
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
        {/* First triangle - TOP LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{
            x: xFloat2,
            scale: scaleFloat2,
          }}
          className="w-[300px] h-[260px] sm:w-[500px] sm:h-[435px] md:w-[1200px] md:!h-[1051px] absolute top-0 left-0 -translate-x-1/3 sm:-translate-x-1/2 md:-translate-x-1/2 -z-[1] -rotate-[110deg]"
        >
          <Image
            src="https://pub-1c108179b7cb46a98dc6dd25e0df069c.r2.dev/triangle.png"
            alt="Triangle decoration"
            fill
          />
        </motion.div>

        {/* Second triangle - CENTER RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.4 }}
          style={{
            x: xFloat2,
            scale: scaleFloat2,
          }}
          className="w-[400px] h-[350px] sm:w-[600px] sm:h-[525px] md:w-[1600px] md:!h-[1390px] absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/3 sm:translate-x-1/2 md:translate-x-1/2 -z-[1] -rotate-[110deg]"
        >
          <Image
            src="https://pub-1c108179b7cb46a98dc6dd25e0df069c.r2.dev/triangle.png"
            alt="Triangle decoration"
            fill
          />
        </motion.div>

        {/* Third triangle - BOTTOM LEFT */}
        <motion.div
          initial={{ opacity: 0, rotate: -20 }}
          whileInView={{ opacity: 1, rotate: -30 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{
            y: yFloat1,
          }}
          className="size-[120px] sm:size-[200px] md:size-[500px] absolute bottom-0 left-0 -translate-x-2/3 sm:-translate-x-full md:-translate-x-full -z-[1] rotate-[60deg]"
        >
          <Image
            src="https://pub-1c108179b7cb46a98dc6dd25e0df069c.r2.dev/triangle.png"
            alt="Triangle decoration"
            fill
          />
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
                <Button
                  className="underline block text-web-light text-[13px] font-bold p-0 bg-transparent hover:bg-transparent hover:border-none border-none"
                  onClick={() =>
                    window.open(
                      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3845.833267743164!2d140.49747757628055!3d36.33829169360034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60223ab1054292eb%3A0x9e84cbe46b956eb4!2s1279-1%20Rokutandachō%2C%20Mito%2C%20Ibaraki%20311-1135%2C%20Japan!5e1!3m2!1sen!2sru!4v1753895635133!5m2!1sen!2sru",
                      "_blank"
                    )
                  }
                >
                  Map
                </Button>
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
