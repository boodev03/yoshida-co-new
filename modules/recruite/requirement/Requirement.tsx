"use client";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import parse from "html-react-parser";
import { useTranslations } from "@/providers/translation-provider";
import { useState } from "react";
interface RequirementDetail {
  text: string;
  hasBullet?: boolean;
}

interface RequirementItem {
  category: string;
  details: RequirementDetail[];
  hasBullet?: boolean;
}

interface RequirementSection {
  title: string;
  items: RequirementItem[];
}

interface RequirementData {
  sections: RequirementSection[];
}
export default function Requirement() {
  const { dict } = useTranslations();
  const requirement = dict.requirement;
  const requirementData: RequirementData = requirement;

  const [isInView, setIsInView] = useState(false);
  const [startScrollY, setStartScrollY] = useState(0);
  const { scrollY } = useScroll();

  const handleViewportEnter = () => {
    setIsInView(true);
    setStartScrollY(window.scrollY);
  };

  const handleViewportLeave = () => {
    setIsInView(false);
  };

  const yFloat = useTransform(scrollY, (value) => {
    if (!isInView) return 0;
    const scrollDelta = value - startScrollY;
    return -scrollDelta * 0.2;
  });

  const xFloat = useTransform(scrollY, (value) => {
    if (!isInView) return 0;
    const scrollDelta = value - startScrollY;
    return Math.sin(scrollDelta * 0.005) * 15;
  });

  return (
    <motion.section
      onViewportEnter={handleViewportEnter}
      onViewportLeave={handleViewportLeave}
      className="mt-[82px] mlg:mt-[90px] mlg:pt-[120px] pb-[60px] mlg:pb-[120px] font-shippori-mincho"
    >
      <div className="container space-y-12 md:space-y-0 relative">
        {/* First triangle with conditional movement and fine grainy effect */}
        <motion.div
          initial={{ opacity: 0, rotate: -20 }}
          whileInView={{ opacity: 1, rotate: -30 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{
            x: xFloat,
            y: yFloat,
            clipPath: "polygon(0% 0%, 100% 50%, 0% 100%)",
            filter: "url(#fineGrainy)",
          }}
          className="size-[200px] md:size-[1600px] absolute rotate-[30deg] xl:-rotate-[10deg] bg-web-light-bg bottom-0 translate-y-1/3 md:bottom-0 md:top-[unset] !right-0 translate-x-2/3 -z-[1]"
        >
          <svg width="0" height="0">
            <filter id="fineGrainy">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.8"
                numOctaves="2"
                stitchTiles="stitch"
              />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.3" intercept="0.35" />
              </feComponentTransfer>
              <feBlend mode="soft-light" in="SourceGraphic" />
            </filter>
          </svg>
        </motion.div>

        {/* Second triangle with conditional movement and fine grainy effect */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{
            x: xFloat,
            y: yFloat,
            rotate: -45,
            clipPath: "polygon(0% 0%, 100% 50%, 0% 100%)",
            filter: "url(#fineGrainy)",
          }}
          className="size-[300px] xl:size-[500px] absolute bg-web-light-bg top-1/4 xl:top-0 -translate-x-1/3 xl:-translate-x-0 left-0 -z-[1]"
        >
          <svg width="0" height="0">
            <filter id="fineGrainy">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.8"
                numOctaves="2"
                stitchTiles="stitch"
              />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.3" intercept="0.35" />
              </feComponentTransfer>
              <feBlend mode="soft-light" in="SourceGraphic" />
            </filter>
          </svg>
        </motion.div>

        {/* Third triangle with conditional movement and fine grainy effect */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{
            x: xFloat,
            y: yFloat,
            rotate: -80,
            clipPath: "polygon(0% 0%, 100% 50%, 0% 100%)",
            filter: "url(#fineGrainy)",
          }}
          className="size-[300px] xl:size-[1200px] bg-web-light-bg absolute top-[94px] xl:top-1/2 translate-x-1/3 xl:-translate-x-1/4 xl:-translate-y-1/2 left-0 -z-[2]"
        >
          <svg width="0" height="0">
            <filter id="fineGrainy">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.8"
                numOctaves="2"
                stitchTiles="stitch"
              />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.3" intercept="0.35" />
              </feComponentTransfer>
              <feBlend mode="soft-light" in="SourceGraphic" />
            </filter>
          </svg>
        </motion.div>
        <motion.p
          className="text-web-main text-center font-bold text-xl tracking-[0.02em] mlg:text-[32px] md:mb-[120px]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {requirement.title}
        </motion.p>

        <motion.div
          className="px-6 mlg:px-[95px] py-[60px] mlg:py-[120px] space-y-12 shadow-[4px_4px_12px_0px_#0000001A] bg-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div>
            <hr className="border-line-gray" />
            <div className="divide-y divide-line-gray">
              {requirementData.sections.map((section, sectionIndex) => (
                <motion.div
                  key={sectionIndex}
                  className="space-y-6 py-6 mlg:flex items-baseline gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1 + sectionIndex * 0.05,
                  }}
                >
                  <p className="text-[15px] break-words mlg:w-[160px] shrink-0 text-web-main font-bold tracking-[0.02em] mlg:text-xl">
                    {section.title}
                  </p>
                  <ul className="space-y-2 list-none">
                    {section.items.map((item, itemIndex) => (
                      <motion.div
                        key={itemIndex}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{
                          duration: 0.5,
                          delay: 0.2 + itemIndex * 0.05,
                        }}
                      >
                        <li
                          className={`text-[15px] whitespace-pre-line tracking-[0.02em] text-web-dark mlg:text-base ${
                            item.hasBullet ? "list-disc ml-7" : ""
                          }`}
                        >
                          {parse(item.category)}
                        </li>
                        {item.details && item.details.length > 0 && (
                          <ul className="list-none mt-1">
                            {item.details.map((detail, detailIndex) => (
                              <motion.li
                                key={detailIndex}
                                className={`text-[15px] whitespace-pre-line tracking-[0.02em] text-web-dark mlg:text-base ${
                                  detail.hasBullet
                                    ? "list-disc ml-7"
                                    : "indent-7"
                                }`}
                                initial={{ opacity: 0, x: 10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{
                                  duration: 0.4,
                                  delay: 0.3 + detailIndex * 0.05,
                                }}
                              >
                                {detail.text}
                              </motion.li>
                            ))}
                          </ul>
                        )}
                      </motion.div>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="flex justify-center mlg:hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            href="#"
            className="text-[15px] text-web-main font-bold mlg:text-base underline"
          >
            {requirement.careerLink}
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
