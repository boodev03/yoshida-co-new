"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "@/components/icons/ArrowRight";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "@/providers/translation-provider";


interface CapabilityCardProps {
  image: string;
  title: string;
  description: string;
  href: string;
  index: number;
}

const MotionLink = motion.create(Link);

const CapabilityCard = ({
  image,
  title,
  description,
  href,
  index,
}: CapabilityCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
      className="space-y-4"
    >
      <MotionLink
        href={href}
        className="relative group block w-full sm:w-[448px] max-w-full aspect-video overflow-hidden"
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-all duration-300 group-hover:brightness-90"
        />
        <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
        <div className="w-[90%] h-[42px] absolute bottom-0 left-0">
          <div
            className="size-full bg-web-main flex items-center z-10 transition-colors duration-300 group-hover:bg-web-main/90"
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

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
        className="text-jp-p3 text-web-dark"
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

export default function CapabilitySection() {
  const { tPath } = useTranslations();
  
  const cards = [
    {
      image: "/images/top/top-04.webp",
      title: tPath("home.capability.cards.design.title"),
      description: tPath("home.capability.cards.design.description"),
      href: "/technology/design",
    },
    {
      image: "/images/top/top-05.webp",
      title: tPath("home.capability.cards.welding.title"),
      description: tPath("home.capability.cards.welding.description"),
      href: "/technology/welding",
    },
    {
      image: "/images/top/top-06.webp",
      title: tPath("home.capability.cards.machining.title"),
      description: tPath("home.capability.cards.machining.description"),
      href: "/technology/machining",
    },
    {
      image: "/images/top/top-07.webp",
      title: tPath("home.capability.cards.development.title"),
      description: tPath("home.capability.cards.development.description"),
      href: "/technology/development",
    },
  ];
  
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="pt-[166px] sm:pt-[220px] pb-20 mlg:py-[100px] bg-web-light-bg"
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
            className="relative section-title text-web-main z-10 uppercase"
          >
            {tPath("home.capability.title").toUpperCase()}
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
            {tPath("home.capability.heading")}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-jp-p2 text-web-dark text-center whitespace-pre-line"
          >
            {tPath("home.capability.description")}
          </motion.p>
        </motion.div>

        {/* Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12 mlg:gap-y-[52px] w-full mlg:w-[928px] mx-auto">
          {cards.map((card, index) => (
            <CapabilityCard key={card.title} {...card} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center"
        >
          <Button asChild className="group relative overflow-hidden">
            <Link href="/case">
              {tPath("home.capability.button")}
              <ArrowRight />
            </Link>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}
