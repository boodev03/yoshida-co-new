"use client";

import HeadingSite from "@/components/HeadingSite";
import CaseList from "./CaseList";
import { useTranslations } from "@/providers/translation-provider";

export default function Case() {
  const { case: caseTranslations } = useTranslations();
  const { heading } = caseTranslations;

  return (
    <section className="pt-[82px] mlg:pt-[90px]">
      {/* Decor */}
      <HeadingSite
        title={heading.title}
        subtitle={heading.subtitle}
        imageUrl="/images/case/banner.webp"
        breadcrumbs={[
          { label: heading.breadcrumbs.top },
          { label: heading.breadcrumbs.case },
        ]}
      />

      {/* Main Content */}
      <div className="my-[60px] md:my-[120px] pb-[60px] mlg:pb-[390px] px-0 sm:px-6 container mx-auto space-y-8 md:space-y-20">
        <CaseList />
      </div>
    </section>
  );
}
