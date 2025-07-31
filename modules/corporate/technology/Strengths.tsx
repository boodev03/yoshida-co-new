"use client";

import { ArrowRight } from "@/components/icons/ArrowRight";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "@/providers/translation-provider";

export default function Strengths() {
  const { technology } = useTranslations();
  const { strengths } = technology;
  const { departmentStrengths } = strengths;

  const strengthsData = {
    design: {
      title: departmentStrengths.design.title,
      description: departmentStrengths.design.description,
      image: "/images/technology/strength-3.webp",
      link: "/technology/design",
      buttonText: departmentStrengths.design.buttonText,
    },
    manufacturing: {
      title: departmentStrengths.manufacturing.title,
      description: departmentStrengths.manufacturing.description,
      image: "/images/technology/strength-4.webp",
      buttons: [
        {
          text: departmentStrengths.manufacturing.buttons.welding,
          link: "/technology/welding",
        },
        {
          text: departmentStrengths.manufacturing.buttons.machining,
          link: "/technology/machining",
        },
      ],
    },
  };
  return (
    <motion.div
      className="bg-web-light-bg pt-12 pb-[60px] mlg:py-[120px] mt-[100px] mlg:mt-[200px]"
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
              className="size-10 bg-web-light absolute -bottom-1 left-0 -translate-x-2/3 z-0 rotate-[20deg]"
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
              STRENGTHS
            </motion.p>
          </div>
          <motion.p
            className="font-bold text-web-dark text-xl md:text-[32px] -tracking-[0.02em]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {departmentStrengths.heading}
          </motion.p>
        </motion.div>

        <div className="space-y-12 mlg:space-y-20">
          <motion.div
            className="flex flex-col gap-6 mlg:flex-row mlg:items-center mlg:gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <motion.div
              className="relative aspect-video max-w-[544px] w-full shrink-0"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <Image
                src={strengthsData.design.image}
                alt="achivement"
                fill
                className="object-cover"
              />
            </motion.div>
            <div className="space-y-6">
              <motion.p
                className="text-xl md:text-[32px] font-bold text-web-dark -tracking-[0.02em]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {strengthsData.design.title}
              </motion.p>
              <motion.p
                className="text-[15px] md:text-base font-normal font-noto-sans-jp -tracking-[0.02em]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                {strengthsData.design.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex justify-center mlg:block"
              >
                <Button className="group relative overflow-hidden">
                  <Link
                    href={strengthsData.design.link}
                    className="flex items-center gap-2"
                  >
                    {strengthsData.design.buttonText}
                    <ArrowRight />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            className="flex flex-col gap-6 mlg:flex-row mlg:items-center mlg:gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <motion.div
              className="relative aspect-video max-w-[544px] w-full shrink-0"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <Image
                src={strengthsData.manufacturing.image}
                alt="achivement"
                fill
                className="object-cover"
              />
            </motion.div>
            <div className="space-y-6">
              <motion.p
                className="text-xl md:text-[32px] font-bold text-web-dark -tracking-[0.02em]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                {strengthsData.manufacturing.title}
              </motion.p>
              <motion.p
                className="text-[15px] md:text-base font-normal font-noto-sans-jp -tracking-[0.02em]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {strengthsData.manufacturing.description}
              </motion.p>

              <motion.div
                className="flex flex-col mlg:flex-row items-center gap-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                {strengthsData.manufacturing.buttons.map((button, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
                  >
                    <Button className="group relative overflow-hidden">
                      <Link
                        href={button.link}
                        className="flex items-center gap-2"
                      >
                        {button.text}
                        <ArrowRight />
                      </Link>
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
