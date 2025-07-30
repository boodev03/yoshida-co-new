"use client";

import { motion } from "framer-motion";

interface IProps {
  sectionName: string;
  title: string;
  description?: string;
}
export default function CorporateHeading({
  sectionName,
  title,
  description,
}: IProps) {
  return (
    <motion.div
      className="w-full space-y-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: 0.2 }}
    >
      <div className="space-y-2">
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.div
            className="absolute top-0 left-0 -translate-x-1/2 size-[30px] bg-web-light rotate-[135deg]"
            style={{ clipPath: "polygon(50% 0%, 100% 82%, 0% 82%)" }}
            initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 135 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
          />
          <motion.p
            className="text-web-main font-bold text-[13px] md:text-base -tracking-[0.02em] relative z-10"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {sectionName}
          </motion.p>
        </motion.div>
        <motion.p
          className="font-bold text-web-dark text-xl md:text-[32px] -tracking-[0.02em] whitespace-pre-line"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {title}
        </motion.p>
      </div>
      {description && (
        <motion.p
          className="text-web-dark text-base-tracking-[0.02em] whitespace-pre-line"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
