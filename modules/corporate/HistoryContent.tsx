"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useTranslations } from "@/providers/translation-provider";

// Static image data that doesn't need translation
const imageData: Record<number, string | string[]> = {
  1961: "/images/company/glove-box.webp",
  1993: [
    "/images/company/designed.jpg",
    "/images/company/factory-complete.webp",
  ],
  2018: [
    "/images/company/new-factory.webp",
    "/images/company/head-office-1.webp",
  ],
};

export default function HistoryContent() {
  const { company } = useTranslations();
  const { history } = company;
  return (
    <div className="py-[120px] mb-[246px]">
      <div className="pb-12 mlg:border-b-2 border-line-gray w-full space-y-2">
        <div className="relative">
          <div
            className="size-10 bg-web-light absolute -bottom-1 left-0 -translate-x-2/3 z-0"
            style={{
              clipPath: "polygon(50% 0%, 100% 90%, 0% 90%)",
            }}
          />
          <p className="text-web-main font-bold text-[13px] md:text-base -tracking-[0.02em] relative z-10">
            {history.title}
          </p>
        </div>
        <p className="font-bold text-web-dark text-xl md:text-[32px] -tracking-[0.02em]">
          {history.heading}
        </p>
      </div>

      {/* Timeline */}
      <div className="mlg:pt-20 mlg:px-8 divide-y divide-line-gray">
        {history.timeline.map((item, index) => {
          const images = imageData[item.year];
          return (
            <div
              key={item.content}
              className={cn(
                "flex flex-col gap-6 md:flex-row md:gap-[96px]",
                index !== 0 ? "py-6" : "pb-6",
                index === history.timeline.length - 1 ? "border-b border-line-gray" : "",
                !images && "md:items-center"
              )}
            >
              <div className="min-w-[160px]">
                <p className="text-2xl md:text-[40px] font-bold text-web-main tracking-[-0.02em]">
                  {item.year}
                </p>
                <p className="text-web-main font-bold  text-[13px] md:text-base tracking-[-0.02em]">
                  {item.detail}
                </p>
              </div>
              <div className="space-y-6">
                <p className="text-web-dark font-bold text-[13px] md:text-base tracking-[-0.02em]">
                  {item.content}
                </p>
                {images && (
                  <div className="flex flex-col md:flex-row gap-6">
                    {Array.isArray(images) ? (
                      images.map((image, imageIndex) => (
                        <div
                          key={imageIndex}
                          className="aspect-video relative w-[256px] mx-auto md:mx-0"
                        >
                          <Image
                            src={image}
                            alt={item.content}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))
                    ) : (
                      <div className="aspect-video relative w-[256px] mx-auto md:mx-0">
                        <Image
                          src={images}
                          alt={item.content}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
