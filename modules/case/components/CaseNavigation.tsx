"use client";

import { ChevronRight } from "@/components/icons/ChevronRight";
import { useTranslations } from "@/providers/translation-provider";

interface CaseNavigationProps {
  onBack: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

export default function CaseNavigation({
  onBack,
  onPrevious,
  onNext,
  hasPrevious = false,
  hasNext = false,
}: CaseNavigationProps) {
  const { case: caseTranslations } = useTranslations();
  
  return (
    <div className="flex items-center gap-14 justify-center pt-[60px] pb-12 md:pt-[120px] md:pb-[115px]">
      <button
        className={`rotate-180 ${
          hasPrevious
            ? "text-web-main hover:opacity-70"
            : "text-gray-300 cursor-not-allowed"
        } transition-opacity`}
        onClick={onPrevious}
        disabled={!hasPrevious}
      >
        <ChevronRight />
      </button>

      <button
        className="text-jp-h3 text-web-dark font-bold hover:opacity-30 transition-opacity"
        onClick={onBack}
      >
        {caseTranslations.detail.navigation.back}
      </button>

      <button
        className={`${
          hasNext
            ? "text-web-main hover:opacity-70"
            : "text-gray-300 cursor-not-allowed"
        } transition-opacity`}
        onClick={onNext}
        disabled={!hasNext}
      >
        <ChevronRight />
      </button>
    </div>
  );
}
