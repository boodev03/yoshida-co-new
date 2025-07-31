"use client";

import { Mail } from "@/components/icons/Mail";
import { Phone } from "@/components/icons/Phone";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ContactSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="relative pb-20 bg-web-dark"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className={cn(
          "container mx-auto bg-web-main z-100 relative mlg:-translate-y-2/3",
          "px-6 md:px-[120px] py-[60px] md:py-20 md:h-[390px] md:mx-auto"
        )}
      >
        <div
          className={cn(
            "flex items-center relative",
            "flex-col md:flex-row justify-center md:justify-between gap-12"
          )}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full max-w-[350px]"
          >
            <div>
              <motion.h4
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="relative z-10 section-title text-white uppercase"
              >
                CONTACT
                <div
                  className="absolute top-0 left-0 -translate-x-1/2 size-[30px] -z-[1] bg-web-light rotate-[135deg]"
                  style={{ clipPath: "polygon(50% 0%, 100% 82%, 0% 82%)" }}
                />
              </motion.h4>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-jp-h2 text-white mb-4"
              >
                お問い合わせ
              </motion.p>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-jp-p2 text-white"
            >
              見積のご依頼や、製造に関するお問い合わせはこちらから
            </motion.p>
          </motion.div>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full md:w-[350px] max-w-full space-y-6 md:space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Link href="/contact">
                <Button
                  className={cn(
                    "bg-white text-web-main hover:bg-web-main hover:border-white hover:text-white w-full rounded-full text-lg md:text-base",
                    "h-20 md:h-[99px]"
                  )}
                >
                  <Mail />
                  お問い合わせ
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Button
                className={cn(
                  "group bg-white text-web-main hover:border-white hover:bg-web-main hover:text-white w-full rounded-[8px] flex-col items-center gap-1 md:gap-0",
                  "h-20 md:h-[99px]"
                )}
              >
                <p className="flex items-center text-2xl md:text-[32px]leading-[1.6] tracking-[0.02em] font-normal">
                  <Phone />
                  029-297-1005
                </p>
                <p className="group-hover:text-white transition-all duration-300 text-web-light font-medium text-sm tracking-[-0.015em] leading-[17px]">
                  受付時間 8:00 - 17:00 ( 土日・祝日除く )
                </p>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}
