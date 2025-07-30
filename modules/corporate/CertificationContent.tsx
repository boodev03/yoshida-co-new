/* eslint-disable @next/next/no-img-element */
"use client";

import { useTranslations } from "@/providers/translation-provider";

export default function CertificationContent() {
  const { company } = useTranslations();
  const { certification } = company;
  
  return (
    <div>
      <div className="pb-6 mlg:pb-12 border-b-2 border-line-gray w-full space-y-2">
        <div className="relative">
          <div
            className="absolute top-0 left-0 -translate-x-1/2 size-[30px] bg-web-light rotate-[135deg]"
            style={{ clipPath: "polygon(50% 0%, 100% 82%, 0% 82%)" }}
          />
          <p className="text-web-main font-bold text-[13px] md:text-base -tracking-[0.02em] relative z-10">
            {certification.title}
          </p>
        </div>
        <p className="font-bold text-web-dark text-xl md:text-[32px] -tracking-[0.02em]">
          {certification.heading}
        </p>
      </div>

      <div className="pt-12 mlg:pt-20 mlg:px-8 divide-y divide-line-gray">
        <p className="py-6 text-[15px] md:text-base font-bold text-center whitespace-pre-line w-full text-web-dark tracking-[-0.02em] border-t border-b border-line-gray">
          {certification.constructionLicense}
        </p>

        <div className="divide-y divide-line-gray">
          {certification.certifications.map((item, index) => (
            <div 
              key={index}
              className={`py-6 flex flex-col gap-4 md:flex-row ${
                index === certification.certifications.length - 1 ? "border-b border-line-gray" : ""
              }`}
            >
              <p className="text-[15px] md:text-base font-bold text-web-main tracking-[-0.02em] md:min-w-[256px]">
                {item.year}
              </p>
              <p className="text-[15px] md:text-base font-bold text-web-dark tracking-[-0.02em]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-20 mlg:px-16">
        <div className="flex gap-8 overflow-x-auto flex-wrap">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="relative">
              <img
                src={`/images/company/cert-${index + 1}.png`}
                alt={`Certification image ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
