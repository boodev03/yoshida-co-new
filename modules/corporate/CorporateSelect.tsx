"use client";

import { ChevronDown } from "lucide-react";
import { useTranslations } from "@/providers/translation-provider";

export default function CorporateSelect() {
  const { company } = useTranslations();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -100; // 90px space from top
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col items-center mlg:justify-center mlg:flex-row gap-4 mlg:gap-8">
      <div className="flex-1 max-w-full w-[256px]">
        <button
          onClick={() => scrollToSection("message")}
          className="transition-all w-full rounded-full border border-web-main font-bold bg-white text-web-main hover:bg-web-main hover:text-white px-3 py-2 flex items-center justify-between"
        >
          <span>{company.select.message}</span>
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
      <div className="flex-1 max-w-full w-[256px]">
        <button
          onClick={() => scrollToSection("history")}
          className="transition-all w-full rounded-full border border-web-main font-bold bg-white text-web-main hover:bg-web-main hover:text-white px-3 py-2 flex items-center justify-between"
        >
          <span>{company.select.history}</span>
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
      <div className="flex-1 max-w-full w-[256px]">
        <button
          onClick={() => scrollToSection("certification")}
          className="transition-all w-full rounded-full border border-web-main font-bold bg-white text-web-main hover:bg-web-main hover:text-white px-3 py-2 flex items-center justify-between"
        >
          <span>{company.select.certification}</span>
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
