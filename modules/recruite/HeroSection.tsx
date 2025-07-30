"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "@/providers/translation-provider";

export default function HeroSection() {
  const { recruit } = useTranslations();
  const { hero } = recruit;

  const ScrollDown = () => {
    return (
      <motion.div className="absolute bottom-0 right-8 mlg:right-[60px] flex items-center rotate-90 gap-2 cursor-default origin-bottom-right transition-opacity duration-300">
        <p className="font-shippori-mincho text-[10px] md:text-xs leading-[16px] tracking-[0.025em] w-max text-white font-bold">
          {hero.scroll}
        </p>
        <div className="relative w-[60px] md:w-[160px]">
          {/* Static line */}
          <div className="w-full h-[1px] bg-white" />

          {/* Animated line */}
          <motion.div
            className="absolute top-0 left-0 w-[20%] h-[1px] bg-[#1247AF]"
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

  return (
    <div
      className="relative h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url('https://pub-1c108179b7cb46a98dc6dd25e0df069c.r2.dev/bg-grainy.png')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <ScrollDown />
      <div className="flex-1 relative pr-12 mlg:pr-[120px] xl:pr-0 h-full max-w-full pt-[100px] pb-[70px]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative xl:aspect-video w-full container mx-auto h-full max-h-[80vh]"
        >
          <Image
            src="/images/recruit/banner.webp"
            alt="Recruite Hero"
            fill
            className="object-cover"
          />
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute top-10 sm:top-8 md:top-6 mlg:-top-6 right-0 translate-x-[70%] text-2xl sm:text-[28px] md:text-[32px] mlg:text-[56px] leading-[1.625] tracking-[0.02em] text-white font-shippori-mincho font-bold"
          >
            {hero.title1.split("").map((char, index) => (
              <span key={index}>
                {char} {index < hero.title1.length - 1 && <br />}
              </span>
            ))}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="absolute top-1/2 -translate-y-3/4 sm:-translate-y-2/3 md:-translate-y-1/2 mlg:translate-y-1/5 mlg:top-0 mlg:bottom-5 right-4 sm:right-6 md:right-8 xl:right-11 text-2xl sm:text-[28px] md:text-[32px] mlg:text-[56px] leading-[1.625] tracking-[0.02em] text-white font-shippori-mincho font-bold"
          >
            {hero.title2.split("").map((char, index) => (
              <span key={index}>
                {char} {index < hero.title2.length - 1 && <br />}
              </span>
            ))}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="bg-white absolute -bottom-5 sm:-bottom-5 md:-bottom-6 mlg:-bottom-6 left-0 sm:left-0 md:left-0 xl:left-[1%] w-[90%] sm:w-[85%] md:w-[75%] mlg:w-2/3 xl:-translate-x-1/2 flex pr-[5%] items-center justify-end"
            style={{
              clipPath: "polygon(0% 0%, 100% 0%, 95% 100%, 0% 100%)",
            }}
          >
            <p className="text-jp-h1 text-web-main font-normal py-4 sm:py-5 md:py-5 mlg:py-6 leading-[17px] sm:leading-[20px] md:leading-[22px] mlg:leading-[25px]">
              {hero.subtitle}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
