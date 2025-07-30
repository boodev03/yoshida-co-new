"use client";
import { ArrowRight } from "@/components/icons/ArrowRight";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "@/providers/translation-provider";
import Link from "next/link";

export default function AchivementSection() {
  const { tPath } = useTranslations();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="md:h-[735px] pt-5 pb-[60px] md:py-20 md:pl-[60px] relative"
    >
      <div className="h-full relative">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className={cn(
            "max-w-full w-[80%] md:w-[50%] min-w-[350px] max-h-[475px] z-10",
            // Translate 30px = 1/2 padding of parent
            "absolute md:relative top-full md:top-0 -right-6 sm:-right-10 md:right-0 -translate-y-[30px] sm:-translate-y-[30%] md:translate-y-0"
          )}
          style={{
            clipPath: "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)",
          }}
        >
          <div className="relative aspect-video">
            <Image
              src="/images/top/top-03.webp"
              alt="achivement-image"
              className="object-cover"
              fill
            />
          </div>
        </motion.div>

        {/*Desktop */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="hidden md:block absolute right-0 top-[100px] h-[475px] w-[80%] bg-web-main z-[1]"
          style={{
            clipPath: "polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute top-[120px] right-[2%] mlg:right-[15%] w-[358px] space-y-3"
          >
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="relative text-white section-title uppercase"
            >
              {tPath("home.achievement.title").toUpperCase()}
              <div
                className="absolute top-1 left-2 -translate-x-full size-[30px] bg-web-light -z-[1] -rotate-[135deg]"
                style={{ clipPath: "polygon(50% 0%, 100% 82%, 0% 82%)" }}
              />
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-white text-jp-h2 mb-2"
            >
              {tPath("home.achievement.heading")}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-white text-jp-p2"
            >
              {tPath("home.achievement.description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="mt-6"
            >
              <Link href="/technology/development">
                <Button className="bg-white text-web-main hover:bg-web-main hover:border-white hover:text-white">
                  {tPath("home.achievement.button")}
                  <ArrowRight />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="bg-web-vivid md:hidden aspect-[375/358] flex justify-center items-center px-0 sm:px-[15%]"
          style={{
            clipPath: "polygon(0% 25%, 20% 0%, 100% 0%, 100% 100%, 0% 100%)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="max-w-[75%] space-y-2 mx-auto"
          >
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="relative text-white font-bold tracking-[0.02em] text-base leading-[1.625] uppercase"
            >
              {tPath("home.achievement.title").toUpperCase()}
              <div
                className="absolute top-1 left-2 -translate-x-full size-[30px] bg-web-light -z-[1] -rotate-[135deg]"
                style={{ clipPath: "polygon(50% 0%, 100% 82%, 0% 82%)" }}
              />
            </motion.h3>
            <div className="space-y-3">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="text-white font-bold tracking-[0.02em] text-[20px] leading-[1.625]"
              >
                {tPath("home.achievement.heading")}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="text-white tracking-[0.02em] text-[15px] leading-[1.625]"
              >
                {tPath("home.achievement.description")}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="mt-6"
            >
              <Button className="bg-white text-web-main hover:bg-web-main hover:text-white">
                {tPath("home.achievement.button")}
                <ArrowRight />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Apart background */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="absolute bottom-0 left-0 w-full h-[50%] bg-web-light-bg -z-[1]"
        style={{
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        }}
      />
    </motion.section>
  );
}
