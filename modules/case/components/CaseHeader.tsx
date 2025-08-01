"use client";

import { ChevronRight } from "@/components/icons/ChevronRight";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/providers/translation-provider";
import dayjs from "dayjs";

interface CaseHeaderProps {
  title: string;
  category: string;
  date: string;
}

export default function CaseHeader({ title, category, date }: CaseHeaderProps) {
  const { case: caseTranslations } = useTranslations();

  return (
    <div className="container mx-auto">
      <div className="hidden md:block mb-[120px] mt-4">
        <div className="flex items-center gap-2 text-web-main">
          <p className="text-normal text-sm text-web-dark font-normal">
            {caseTranslations.heading.breadcrumbs.top}
          </p>
          <ChevronRight />
          <p className="text-normal text-sm text-web-dark font-normal">
            {caseTranslations.heading.breadcrumbs.case}
          </p>
          <ChevronRight />
          <p className="text-normal text-sm text-web-dark font-normal">
            {title}
          </p>
        </div>
      </div>
      <div className="space-y-4 md:space-y-6 border-b border-line-gray pb-4 md:pb-16">
        <h2 className="text-jp-h2">{title}</h2>
        <div className="flex items-center justify-between">
          <h4 className="text-jp-p3 text-web-main font-bold">
            {(() => {
              const dayjsDate = dayjs(date, "YYYY/M/D");
              if (dayjsDate.isValid()) {
                return dayjsDate.format("MMMM D, YYYY");
              }
              return date;
            })()}
          </h4>
          <Button
            variant="outline"
            className="py-2 min-w-[96px] text-[13px] mlg:text-[14px] h-[26px] leading-[1.625] tracking-[0.02em]"
          >
            {category}
          </Button>
        </div>
      </div>
    </div>
  );
}
