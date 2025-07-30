"use client";

import { ChevronRight } from "lucide-react";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

interface HeadingSiteProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export default function HeadingSite({
  title,
  subtitle,
  imageUrl,
  breadcrumbs = [],
}: HeadingSiteProps) {
  return (
    <div className="relative mt-10 flex">
      <motion.div
        style={{
          clipPath: "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)",
        }}
        className="bg-web-main aspect-video w-3/4 md:w-2/3 mlg:w-1/2 absolute bottom-0 mlg:top-[10%] left-0 -translate-x-[15%] mlg:-translate-x-[5%] z-10 flex items-center md:items-end md:pb-10 mlg:pb-20 justify-center pl-[20%] sm:pl-[10%]"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <p className="flex flex-col text-white flex-1 max-w-[50%]">
          <motion.span
            className="section-title text-[13px] md:text-[16px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {title}
          </motion.span>
          <motion.span
            className="text-jp-h1 text-[20px] md:text-[36px] max-w-[80%] whitespace-pre-wrap"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            {subtitle}
          </motion.span>
        </p>
      </motion.div>
      <div className="flex-1 flex flex-col items-end aspect-video md:aspect-auto">
        <motion.div
          className="relative aspect-video w-[68.88889%]"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <Image src={imageUrl} alt="banner" className="object-cover" fill />
        </motion.div>

        {breadcrumbs.length > 0 && (
          <motion.div
            className="hidden md:flex items-center container mx-auto justify-end mt-4 text-web-main"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {breadcrumbs.map((breadcrumb, index) => (
              <React.Fragment key={index}>
                <motion.p
                  className="text-normal text-sm text-web-dark font-normal"
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                >
                  {breadcrumb.label}
                </motion.p>
                {index < breadcrumbs.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: 0.75 + index * 0.1 }}
                  >
                    <ChevronRight size={20} />
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
