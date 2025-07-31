"use client";

import { useTranslations } from "@/providers/translation-provider";

export default function Inpsection() {
  const { quality } = useTranslations();
  const { inspection } = quality;
  return (
    <div className="bg-web-light-bg pt-[60px] md:pt-20">
      <div className="container mx-auto space-y-12 md:space-y-20">
        <div className="w-full space-y-2 flex flex-col items-center">
          <div>
            <div className="relative">
              <div
                className="size-10 bg-web-light absolute -bottom-1 left-0 -translate-x-2/3 z-0"
                style={{
                  clipPath: "polygon(50% 0%, 100% 90%, 0% 90%)",
                }}
              />
              <p className="text-web-main font-bold text-[13px] md:text-base -tracking-[0.02em] relative z-10">
                {inspection.title}
              </p>
            </div>
            <p className="font-bold text-web-dark text-xl md:text-[32px] -tracking-[0.02em]">
              {inspection.heading}
            </p>
          </div>
        </div>

        <div className="w-[992px] max-w-full mx-auto bg-white px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between gap-8 max-w-[544px] mx-auto">
            <div className="*:text-center space-y-6 *:text-[15px] md:text-base -tracking-[0.02em] *:text-web-dark">
              <p className="!text-web-main !text-xl font-bold">
                {inspection.nonDestructive.title}
              </p>
              <div>
                {inspection.nonDestructive.tests.map((test, index) => (
                  <p key={index}>{test}</p>
                ))}
              </div>
            </div>
            <div className="*:text-center space-y-6 *:text-[15px] md:text-base -tracking-[0.02em] *:text-web-dark">
              <p className="!text-web-main !text-xl font-bold">
                {inspection.other.title}
              </p>
              <div>
                {inspection.other.tests.map((test, index) => (
                  <p key={index}>{test}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
