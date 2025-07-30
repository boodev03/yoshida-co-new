"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Equipment from "./Equipment";
import EquipmentList from "./EquipmentList";
import HeadingSite from "@/components/HeadingSite";
import { useTranslations } from "@/providers/translation-provider";

export default function EquipmentWrapper() {
  const { equipment } = useTranslations();
  const { heading, overview } = equipment;
  return (
    <section className="pt-[82px] mlg:pt-[90px] font-noto-sans">
      <HeadingSite
        title={heading.title}
        subtitle={heading.subtitle}
        imageUrl="/images/equipment/banner.webp"
        breadcrumbs={[
          { label: heading.breadcrumbs.top },
          { label: heading.breadcrumbs.equipment },
        ]}
      />

      {/* Main content */}
      <div className="py-[60px] md:py-[120px] px-0 sm:px-6 container mx-auto space-y-8 md:space-y-20">
        <div className="container space-y-6 md:space-y-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <motion.h4
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative section-title text-web-main uppercase text-[13px] md:text-base -tracking-[0.02em]"
            >
              {overview.sectionName}
              <div
                className="absolute top-0 left-0 -translate-x-1/2 size-[30px] bg-web-light -z-[1] rotate-[135deg]"
                style={{ clipPath: "polygon(50% 0%, 100% 82%, 0% 82%)" }}
              />
            </motion.h4>
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full mlg:w-[420px]"
            >
              <p className="text-web-dark text-xl text-[32px] tracking-[-0.02em] font-bold">
                {overview.title}
              </p>
            </motion.div>
          </motion.div>
          <div className="flex flex-col gap-6 md:flex-row">
            <p className="flex-1 text-[15px] md:text-base -tracking-[0.02em] whitespace-pre-line">
              {overview.description}
            </p>
            <div className="relative aspect-video flex-1">
              <Image
                src="/images/equipment/equipment-01.webp"
                alt="blog-decor"
                fill
              />
            </div>
          </div>
        </div>
      </div>

      <Equipment />
      <EquipmentList />
    </section>
  );
}
