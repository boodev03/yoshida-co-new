"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";
import parse from "html-react-parser";

interface IProps {
  title: string;
  subTitle: string;
  description: string;
  imageUrl: string;
  // Image position
  align?: "left" | "right";
  developmentItems?: string[];
  developmentTitle?: string;
  button?: React.ReactNode;
}

export default function ContentSection({
  title,
  subTitle,
  description,
  imageUrl,
  align = "left",
  developmentItems,
  developmentTitle = "開発項目",
  button,
}: IProps) {
  return (
    <div
      className={cn(
        "relative flex justify-between h-[640px] pt-[120px] items-end",
        align === "left" && "flex-row-reverse"
      )}
    >
      <motion.div
        className={cn(
          "space-y-6 max-w-[544px] relative z-[50] h-full",
          align === "right" ? "left-[10%]" : "right-[10%] self-end"
        )}
        initial={{ opacity: 0, x: align === "left" ? 30 : -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.p
            className="text-[13px] md:text-base -tracking-[0.02em] font-bold text-web-main"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {title}
          </motion.p>
          <motion.p
            className="text-xl md:text-[32px] -tracking-[0.02em] font-bold text-web-dark whitespace-pre-line"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {subTitle}
          </motion.p>
        </motion.div>
        <motion.p
          className="text-[15px] whitespace-pre-line md:text-base -tracking-[0.02em] text-web-dark"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {description}
        </motion.p>
        {developmentItems && developmentItems.length > 0 && (
          <motion.div
            className="bg-white rounded-[8px] w-full max-w-[544px] border border-web-main py-8 px-6 space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            <motion.p
              className="text-[15px] mlg:text-xl -tracking-[0.02em] font-bold text-web-main text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              {developmentTitle}
            </motion.p>
            <ul className="text-[13px] mlg:text-base font-noto-sans-jp -tracking-[0.02em] text-web-dark space-y-2">
              {developmentItems?.map((item, index) => (
                <motion.li
                  key={item}
                  className="flex items-baseline gap-1"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                >
                  <span className="whitespace-pre-wrap text-sm">
                    {parse(item)}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
        {button && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {button}
          </motion.div>
        )}
      </motion.div>

      {imageUrl && (
        <motion.div
          className={`relative h-max ${
            align === "left" ? "left-0" : "right-0"
          } w-full top-20 z-10 max-w-1/2 mlg:max-w-[640px] mlg:w-[640px] aspect-video`}
          initial={{ opacity: 0, x: align === "left" ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <Image src={imageUrl} alt="image" fill />
        </motion.div>
      )}
      <motion.div
        style={{
          clipPath:
            align === "left"
              ? "polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)"
              : "polygon(0% 0%, 75% 0%, 100% 100%, 0% 100%)",
        }}
        className={cn(
          "absolute top-0 right-0 bg-web-gray size-full",
          align === "right" && "justify-start"
        )}
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 0.1 }}
      />
    </div>
  );
}
