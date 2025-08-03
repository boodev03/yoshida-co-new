"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "@/components/icons/ArrowRight";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "@/providers/translation-provider";

interface FactoryCardProps {
  image: string;
  title: string;
  href: string;
  index: number;
}

const MotionLink = motion.create(Link);

const FactoryCard = ({ image, title, href, index }: FactoryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
    >
      <MotionLink
        href={href}
        className="relative block group w-full sm:w-[544px] max-w-full aspect-video"
        transition={{ duration: 0.3 }}
      >
        <Image src={image} alt={title} fill className="object-cover" />
        {/* Overlay with hover effect */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none transition-opacity duration-300 group-hover:opacity-0" />
        <div className="w-[90%] h-[42px] absolute bottom-0 left-0">
          <div
            className="size-full flex items-center z-10"
            style={{
              clipPath: "polygon(0% 0%, 95% 0%, 100% 100%, 0% 100%)",
            }}
          >
            <div className="flex items-center gap-2 px-4">
              <div
                className="size-2 bg-white"
                style={{
                  clipPath:
                    "polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)",
                }}
              />
              <p className="text-jp-p2 text-white font-bold">{title}</p>
            </div>
          </div>

          <div className="text-white absolute right-[2%] top-1/2 -translate-y-1/2 translate-x-1/2 transition-transform duration-300 group-hover:translate-x-[calc(50%+5px)]">
            <ArrowRight />
          </div>
        </div>
      </MotionLink>
    </motion.div>
  );
};

export default function FactorySection() {
  const { tPath } = useTranslations();

  const cards = [
    {
      image: "/images/top/top-08.webp",
      title: tPath("home.factory.cards.equipment"),
      href: "/factory-and-quality/equipment",
    },
    {
      image: "/images/recruit/19 airtightness test.png",
      title: tPath("home.factory.cards.quality"),
      href: "/factory-and-quality/quality",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="py-[60px] sm:py-[120px] mlg:py-[240px] relative"
    >
      <div className="container space-y-12 mlg:space-y-[60px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col items-center max-w-[736px] mx-auto"
        >
          <motion.h4
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="section-title relative text-web-main z-10 uppercase"
          >
            {tPath("home.factory.title").toUpperCase()}
            <div
              className="absolute top-0 left-0 -translate-x-1/2 size-[30px] bg-web-light -z-[1] rotate-[135deg]"
              style={{ clipPath: "polygon(50% 0%, 100% 82%, 0% 82%)" }}
            />
          </motion.h4>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-jp-h2 text-web-dark mt-4 mb-6 text-center"
          >
            {tPath("home.factory.heading")}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-jp-p2 text-web-dark text-center whitespace-pre-line"
          >
            {tPath("home.factory.description")}
          </motion.p>
        </motion.div>

        {/* Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8 mlg:gap-y-[52px] w-full mx-auto">
          {cards.map((card, index) => (
            <FactoryCard key={card.title} {...card} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center"
        >
          <Link href="/factory-and-quality" className="w-max block">
            <Button className="group w-full relative overflow-hidden whitespace-pre-wrap leading-[1.1]">
              {tPath("home.factory.button")}
              <ArrowRight />
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Decor */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="absolute size-full top-0 left-[15%] bg-web-gray -z-[2] hidden sm:block"
        style={{
          clipPath: "polygon(35% 10%, 100% 10%, 65% 90%, 0% 90%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="absolute w-full h-1/2 bottom-0 left-0 bg-web-gray -z-[2] sm:hidden"
        style={{
          clipPath:
            "polygon(50% 0%, 100% 0%, 100% 85%, 90% 100%, 0% 100%, 0% 30%)",
        }}
      />
    </motion.section>
  );
}
