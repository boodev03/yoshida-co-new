"use client";

import { cn } from "@/lib/utils";
import { useTranslations } from "@/providers/translation-provider";
import Image from "next/image";

export default function CompanyContent() {
  const { company } = useTranslations();
  const { companyInfo } = company;

  return (
    <div>
      <div className="pb-6 mlg:pb-12 border-b-2 border-line-gray w-full space-y-2">
        <div className="relative">
          <div
            className="absolute top-0 left-0 -translate-x-1/2 size-[30px] bg-web-light rotate-[135deg]"
            style={{ clipPath: "polygon(50% 0%, 100% 82%, 0% 82%)" }}
          />
          <p className="text-web-main font-bold text-[13px] md:text-base -tracking-[0.02em] relative z-10">
            {companyInfo.title}
          </p>
        </div>
        <p className="font-bold text-web-dark text-xl md:text-[32px] -tracking-[0.02em]">
          {companyInfo.heading}
        </p>
      </div>

      <div className="pt-12 mlg:pt-20 mlg:px-8 divide-y divide-line-gray">
        <div className="divide-y divide-line-gray">
          {companyInfo.details.map((item, index) => (
            <div
              key={index}
              className={cn(
                "py-6 flex flex-col gap-4 md:flex-row border-b border-line-gray",
                index === 0 && "border-t"
              )}
            >
              <p className="text-[15px] break-words whitespace-pre-wrap md:text-base font-bold text-web-main tracking-[-0.02em] md:min-w-[256px]">
                {item.label}
              </p>
              <p
                className={cn(
                  "text-[15px] flex items-center relative md:text-base font-bold text-web-dark tracking-[-0.02em] whitespace-pre-wrap",
                  index >= companyInfo.details.length - 2 && "leading-[2]"
                )}
              >
                {item.value === "soumu@ysd-k.co.jp" ? (
                  <Image
                    width={158}
                    height={16}
                    alt="email"
                    src="/images/email.png"
                  />
                ) : (
                  item.value
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
