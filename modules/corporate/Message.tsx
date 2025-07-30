"use client";

import { motion } from "framer-motion";
import AnimatedHeading from "./AnimatedHeading";
import Image from "next/image";
import { useTranslations } from "@/providers/translation-provider";

export default function Message() {
  const { company } = useTranslations();
  return (
    <section className="px-6 mlg:px-0">
      <div>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="basis-full mlg:basis-5/12"
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
            className="w-full mlg:w-[420px] mt-4"
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
            <div className="relative flex items-start flex-col mlg:flex-row">
              <div className="max-w-full mlg:max-w-[640px] shrink-0 space-y-12">
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

              <div
                className="w-full shrink-0 aspect-video bg-web-light-bg relative -right-[20%] mlg:right-[12%] -mt-8 mlg:mt-[120px] overflow-hidden"
                style={{
                  clipPath: "polygon(0% 0%, 75% 0%, 100% 100%, 25% 100%)",
                }}
              >
                <Image
                  src="/images/company/ceo-message.png"
                  alt="Headquarters"
                  fill
                  className="object-cover"
                />
                {/* Overlay: linear gradient from top left to bottom */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.0) 100%)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
