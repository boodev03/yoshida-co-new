"use client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import PositionCard from "./PositionCard";
import Image from "next/image";
import parse from "html-react-parser";

interface Position {
  title: string;
  description: string;
  image?: string;
}

interface RecruitePositionProps {
  index?: number;
  title: string;
  leftDescImage?: string;
  rightDescImage?: string;
  description: string;
  positions: Position[];
  bgImage: string;
}

export default function RecruitePosition({
  index = 1,
  title,
  description,
  leftDescImage,
  rightDescImage,
  positions,
  bgImage,
}: RecruitePositionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="w-full relative mlg:h-screen mlg:sticky mlg:top-0">
      {/* Background image */}
      <div
        className={cn(
          "absolute inset-0 bg-cover bg-center z-0",
          isOpen && "bg-repeat bg-contain"
        )}
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      <div className="container mx-auto font-shippori-mincho relative z-10 h-full flex items-center pt-12 pb-[35px] mlg:py-[135px]">
        <div className="bg-white pt-12 mlg:p-[100px] relative w-full">
          {/* Index */}
          <p className="px-3 mlg:px-0 font-bold text-[64px] leading-[47px] mlg:leading-[133px] mlg:text-[180px] text-web-light-bg w-fit absolute top-6 mlg:top-0 left-2 mlg:left-0 z-0">
            {index.toString().padStart(2, "0")}
          </p>

          <div className="relative z-10">
            <div className="px-3 mlg:px-0 space-y-4 mb-12 mlg:mb-[60px]">
              <p className="text-2xl mlg:text-[32px] text-web-dark font-bold">
                {title}
              </p>
              <div className="flex items-center gap-4">
                {leftDescImage && (
                  <div className="relative w-[352px] aspect-video hidden mlg:block">
                    <Image src={leftDescImage} alt="left-desc-image" fill />
                  </div>
                )}
                <div className="font-medium flex-1">{parse(description)}</div>
                {rightDescImage && (
                  <div className="relative w-[352px] aspect-video hidden mlg:block">
                    <Image src={rightDescImage} alt="right-desc-image" fill />
                  </div>
                )}
              </div>
            </div>

            {/* Desktop view - always show grid */}
            <div className="hidden mlg:grid grid-cols-3 gap-20">
              {positions.map((position, index) => (
                <PositionCard
                  key={index}
                  index={index + 1}
                  title={position.title}
                  description={position.description}
                  image={position.image}
                />
              ))}
            </div>

            {/* Mobile view - collapsible section */}
            <div className="mlg:hidden">
              <Collapsible
                open={isOpen}
                onOpenChange={setIsOpen}
                className="w-full"
              >
                <AnimatePresence>
                  {isOpen && (
                    <CollapsibleContent className="mt-8 my-12">
                      {leftDescImage && (
                        <div className="relative w-[256px] aspect-video my-4 mx-auto">
                          <Image
                            src={leftDescImage}
                            alt="left-desc-image"
                            fill
                          />
                        </div>
                      )}
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, staggerChildren: 0.1 }}
                        className="grid grid-cols-1 gap-8"
                      >
                        {positions.map((position, positionIndex) => (
                          <motion.div
                            key={positionIndex}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.3,
                              delay: positionIndex * 0.1,
                            }}
                          >
                            <PositionCard
                              index={positionIndex + 1}
                              title={position.title}
                              description={position.description}
                              image={position.image}
                            />
                          </motion.div>
                        ))}
                      </motion.div>
                    </CollapsibleContent>
                  )}
                </AnimatePresence>
                <CollapsibleTrigger asChild>
                  <motion.div
                    className="bg-web-main text-white py-4 px-12 flex justify-between items-center cursor-pointer"
                    transition={{ duration: 0.2 }}
                  >
                    <span className="font-medium text-[15px]">詳しく見る</span>
                    <motion.div
                      initial={false}
                      animate={{ rotate: isOpen ? 0 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {isOpen ? <ChevronUp /> : <ChevronDown />}
                    </motion.div>
                  </motion.div>
                </CollapsibleTrigger>
              </Collapsible>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
