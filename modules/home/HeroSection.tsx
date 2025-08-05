"use client";

import { motion } from "framer-motion";
import { useTranslations } from "@/providers/translation-provider";

const ScrollDown = () => {
  const { tPath } = useTranslations();

  return (
    <motion.div className="absolute bottom-0 md:bottom-[unset] z-10 md:top-[65%] right-8 md:right-16 flex items-center rotate-90 gap-2 cursor-default origin-bottom-right transition-opacity duration-300">
      <p className="text-helvetica-neue-bold text-[10px] md:text-xs leading-[16px] tracking-[0.025em] w-max uppercase text-[#1247AF] md:text-white font-medium">
        {tPath("home.hero.scroll")}
      </p>
      <div className="relative w-[60px] md:w-[120px]">
        {/* Static line */}
        <div className="w-full h-[1px] bg-[#1247AF] md:bg-white" />

        {/* Animated line */}
        <motion.div
          className="absolute top-0 left-0 w-[20%] h-[1px] bg-white md:bg-[#1247AF]"
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
        />
      </div>
    </motion.div>
  );
};

export default function HeroSection() {
  const { tPath } = useTranslations();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative h-[1120px] md:h-auto md:aspect-[1.73]"
    >
      <div className="relative h-full">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative h-[95%] md:h-[90%] xl:h-[83%]"
        >
          <video
            src="https://pub-1c108179b7cb46a98dc6dd25e0df069c.r2.dev/01%20Hero%20section%20movie.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full aspect-video object-cover object-top hidden md:block scale-110"
            style={{
              clipPath: "polygon(13.4% 0%, 100% 0%, 86.6% 100%, 0% 100%)",
            }}
          />
          <video
            src="https://pub-1c108179b7cb46a98dc6dd25e0df069c.r2.dev/01%20Hero%20section%20movie.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="size-full object-cover block md:hidden"
            style={{
              clipPath: "polygon(0% 0%, 100% 0%, 100% 75%, 50% 100%, 0% 100%)",
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="absolute bottom-[20%] md:top-[120px] xl:top-[18%] md:bottom-0 right-6 md:right-10 h-max"
        >
          <p className="text-en-h1 !font-medium text-white text-right whitespace-pre-line">
            {tPath("home.hero.title")}
          </p>
        </motion.div>

        <ScrollDown />

        {/* Right Decor */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute top-[15%] left-[8%] aspect-video w-full bg-web-main -z-[1] hidden md:block scale-105"
          style={{
            clipPath: "polygon(13.4% 0%, 100% 0%, 86.6% 100%, 0% 100%)",
          }}
        >
          <ScrollDown />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute top-0 left-0 size-full bg-web-main -z-[1] block md:hidden"
          style={{
            clipPath: "polygon(0% 0%, 100% 0%, 100% 80%, 60% 100%, 0% 100%)",
          }}
        />
      </div>
    </motion.section>
  );
}
