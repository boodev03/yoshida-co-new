"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const MotionLink = motion.create(Link);

interface IProps {
  image: string;
  category: string;
  title: string;
  shortDesc: string;
  date: string;
  href: string;
  index: number;
}
export default function CaseItem({
  image,
  category,
  title,
  shortDesc,
  date,
  href,
  index,
}: IProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
      className="w-full shrink-0"
    >
      <MotionLink
        href={href}
        className="space-y-4 block group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative aspect-video group-hover:opacity-50 transition-opacity duration-300">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        {/* <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
          className="bg-web-main rounded-[15px] text-white text-xs leading-[1.6] tracking-[0.02em] font-bold px-4 py-1 w-max"
        >
          {category}
        </motion.p> */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
          className="space-y-2"
        >
          <p className="text-sm leading-[1.6] tracking-[0.02em] font-bold">
            {title}
          </p>
          <p className="text-sm leading-[1.6] tracking-[0.02em] line-clamp-3">
            {shortDesc}
          </p>
        </motion.div>
        {/* <div className="flex items-center justify-between">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
            className="text-sm text-web-main font-bold leading-[1.625] tracking-[0.02em]"
          >
            {date}
          </motion.p>
          <Button className="h-6 px-4 text-xs">お知らせ</Button>
        </div> */}
      </MotionLink>
    </motion.div>
  );
}
