"use client";

import { ArrowRight } from "@/components/icons/ArrowRight";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "@/providers/translation-provider";
import Link from "next/link";

export default function RAndD() {
  const { technology } = useTranslations();
  const { rnd } = technology;

  return (
    <motion.div
      className="pt-12 pb-[60px] md:pt-20"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: 0.2 }}
    >
      <div className="space-y-12 md:space-y-20 container mx-auto">
        <motion.div
          className="w-full space-y-2 flex flex-col items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="relative">
            <motion.div
              className="size-10 bg-web-light absolute bottom-0 -left-1 -translate-x-2/3 z-0 -rotate-[40deg]"
              style={{
                clipPath: "polygon(50% 0%, 100% 90%, 0% 90%)",
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.4 }}
            />
            <motion.p
              className="text-web-main font-bold text-[13px] md:text-base -tracking-[0.02em] relative z-10"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {rnd.title}
            </motion.p>
          </div>
          <motion.p
            className="font-bold text-web-dark text-xl md:text-[32px] -tracking-[0.02em]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {rnd.heading}
          </motion.p>
        </motion.div>

        <motion.div
          className="flex flex-col gap-6 mlg:flex-row mlg:items-center mlg:gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="space-y-6">
            {/* <motion.p
              className="text-xl md:text-[32px] font-bold text-web-dark -tracking-[0.02em]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {rnd.content.title}
            </motion.p> */}
            <motion.p
              className="text-[15px] md:text-base font-normal font-noto-sans-jp -tracking-[0.02em]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {rnd.content.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Link href="/technology/development">
                <Button className="group relative overflow-hidden">
                  {rnd.buttonText}
                  <ArrowRight />
                </Button>
              </Link>
            </motion.div>
          </div>
          <motion.div
            className="relative aspect-video max-w-[544px] w-full shrink-0"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <Image
              src="/images/technology/strength-5.webp"
              alt="achivement"
              fill
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
