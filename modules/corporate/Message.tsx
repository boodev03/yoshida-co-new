"use client";

import { motion } from "framer-motion";
import AnimatedHeading from "./AnimatedHeading";
import Image from "next/image";
import { useTranslations } from "@/providers/translation-provider";
import { cn } from "@/lib/utils";

export default function Message() {
  const { company } = useTranslations();
  return (
    <section className="relative px-6 mlg:px-0">
      <div
        className={cn(
          "w-full max-w-[1048px] shrink-0 aspect-video bg-web-light-bg overflow-hidden",
          "absolute top-full -translate-y-12 md:top-1/2 -right-[20%] md:-right-[5%]"
        )}
        style={{
          clipPath: "polygon(0% 0%, 75% 0%, 100% 100%, 25% 100%)",
        }}
      >
        <Image
          src="https://pub-1c108179b7cb46a98dc6dd25e0df069c.r2.dev/02%20ceo%20message.png"
          alt="Headquarters"
          fill
          className="object-cover"
        />
      </div>
      <div className="">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="basis-full mlg:basis-5/12 container mx-auto"
        >
          <motion.h4
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative section-title text-web-main uppercase"
          >
            {company.message.title}
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
            <p className="text-web-dark text-jp-h1">
              {company.message.heading}
            </p>
          </motion.div>
        </motion.div>

        <div>
          <div className="relative mt-2 space-y-6 mlg:space-y-12">
            {/* Animated border line */}
            <div className="absolute left-0 bottom-0 w-full h-[2px] overflow-hidden">
              <div className="w-full h-full relative"></div>
            </div>
            {/* Outlined text */}
            <AnimatedHeading />
            <div className="relative flex items-start flex-col mlg:flex-row container mx-auto">
              <div className="max-w-full mlg:max-w-[640px] shrink-0 space-y-4 md:space-y-12">
                <p className="text-[15px] mlg:text-base relative z-10 text-web-dark font-medium tracking-[-0.02em] whitespace-pre-line">
                  {company.message.content}
                </p>

                <div className="flex items-baseline gap-4 mlg:justify-end relative z-10">
                  <p className="text-xl mlg:text-[28px] tracking-[-0.02em] text-web-main font-bold">
                    {company.message.ceo}
                  </p>
                  <p className="text-xl mlg:text-[28px] tracking-[-0.02em] text-web-main font-bold">
                    {company.message.ceoName}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
