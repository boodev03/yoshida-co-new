"use client";
import { ArrowRightLong } from "@/components/icons/ArrowRightLong";
import { ArrowRightLongDash } from "@/components/icons/ArrowRightLongDash";
import parse from "html-react-parser";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface IProps {
  index: number;
  position: string;
  title: string;
  description: string;
  before: string;
  steps: string[];
  now: string;
}

export default function CareerPathCard({
  index,
  position,
  title,
  description,
  before,
  steps,
  now,
}: IProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const arrowVariants = {
    hidden: { opacity: 0, width: 0 },
    visible: {
      opacity: 1,
      width: "auto",
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="font-shippori-mincho flex flex-row gap-[100px] items-center"
    >
      <motion.div variants={itemVariants} className="space-y-8 w-[355px]">
        <div className="space-y-2">
          <p className="text-base font-semibold text-web-light">
            CAREER PATH {index.toString().padStart(2, "0")}
          </p>
          <p className="text-[32px] text-web-dark font-bold">{position}</p>
        </div>

        {/* Card */}
        <div className="border border-line-gray p-6 space-y-4 bg-white">
          <p className="text-xl font-bold text-web-dark">{title}</p>
          <p className="text-sm text-web-dark">{parse(description)}</p>
        </div>
      </motion.div>

      {/* Stage */}
      <div className="mt-8 flex gap-2 items-center">
        {/* Before */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center"
        >
          <p className="text-base text-web-main font-bold mb-4 text-center">
            BEFORE
          </p>
          <div className="bg-web-main gap-1.5 py-0 w-[88px] h-[264px] flex flex-row-reverse justify-center items-center">
            <p
              style={{
                writingMode: "vertical-rl",
                WebkitWritingMode: "vertical-rl",
                msWritingMode: "vertical-rl",
              }}
              className="text-base tracking-[0.02em] text-center text-white font-medium whitespace-pre-line"
            >
              {before}
            </p>
          </div>
        </motion.div>

        <motion.p variants={arrowVariants} className="shrink-0 relative top-5">
          <ArrowRightLong />
        </motion.p>

        {/* Steps */}
        <motion.div
          variants={itemVariants}
          className="gap-2 flex items-center pt-10"
        >
          {steps.map((step, index) => (
            <div key={index} className="flex items-center w-full gap-2">
              <motion.div
                variants={itemVariants}
                className="w-[88px] gap-1.5 bg-web-main h-[264px] py-0 flex flex-row-reverse justify-center items-center"
              >
                <p
                  style={{
                    writingMode: "vertical-rl",
                    WebkitWritingMode: "vertical-rl",
                    msWritingMode: "vertical-rl",
                  }}
                  className="text-base text-white font-medium text-center tracking-[0.02em] whitespace-pre-line"
                >
                  {step}
                </p>
              </motion.div>

              {index !== steps.length - 1 && (
                <motion.p
                  variants={arrowVariants}
                  className="shrink-0 relative"
                >
                  <ArrowRightLong />
                </motion.p>
              )}
            </div>
          ))}
        </motion.div>

        <motion.p variants={arrowVariants} className="shrink-0 relative top-5">
          <ArrowRightLong />
        </motion.p>

        {/* Now */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center"
        >
          <p className="text-base text-web-main font-bold mb-4 text-center">
            NOW
          </p>
          <div className="bg-web-main w-[88px] h-[264px] flex flex-row-reverse justify-center items-center">
            <p
              style={{
                writingMode: "vertical-rl",
                WebkitWritingMode: "vertical-rl",
                msWritingMode: "vertical-rl",
              }}
              className="tracking-[0.02em] whitespace-pre-line text-base text-center text-white font-medium"
            >
              {now}
            </p>
          </div>
        </motion.div>

        <motion.p variants={arrowVariants} className="shrink-0 relative top-5">
          <ArrowRightLongDash />
        </motion.p>
      </div>
    </motion.div>
  );
}
