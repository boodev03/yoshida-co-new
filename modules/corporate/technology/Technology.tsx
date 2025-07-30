"use client";

import HeadingSite from "@/components/HeadingSite";
import ContentSection from "../ContentSection";
import ContentSectionMobile from "../ContentSectionMobile";
import CorporateHeading from "../CorporateHeading";
import RAndD from "./RAndD";
import Strengths from "./Strengths";
import { useTranslations } from "@/providers/translation-provider";

export default function Technology() {
  const { technology } = useTranslations();
  const { heading, overview, strengths } = technology;
  
  return (
    <section className="pt-[82px] mlg:pt-[90px] font-noto-sans">
      <HeadingSite
        title={heading.title}
        subtitle={heading.subtitle}
        imageUrl="/images/technology/banner.webp"
        breadcrumbs={[
          { label: heading.breadcrumbs.top }, 
          { label: heading.breadcrumbs.technology }
        ]}
      />

      <div className="py-[60px] md:py-[120px]">
        <div className="container mx-auto mb-[60px] mlg:mb-[120px]">
          <CorporateHeading
            sectionName={overview.sectionName}
            title={overview.title}
            description={overview.description}
          />
        </div>

        <div className="hidden md:block space-y-[200px]">
          <ContentSection
            title={strengths.sections[0].title}
            subTitle={strengths.sections[0].subTitle}
            description={strengths.sections[0].description}
            imageUrl="/images/technology/strength-1.webp"
          />
          <ContentSection
            title={strengths.sections[1].title}
            subTitle={strengths.sections[1].subTitle}
            description={strengths.sections[1].description}
            imageUrl="/images/technology/strength-2.webp"
            align="right"
          />
        </div>

        <div className="block md:hidden space-y-20">
          <ContentSectionMobile
            title={strengths.sections[0].title}
            subTitle={strengths.sections[0].subTitle}
            description={strengths.sections[0].description}
            imageUrl="/images/technology/strength-1.webp"
          />
          <ContentSectionMobile
            title={strengths.sections[1].title}
            subTitle={strengths.sections[1].subTitle}
            description={strengths.sections[1].description}
            imageUrl="/images/technology/strength-2.webp"
            align="right"
          />
        </div>
        <Strengths />
        <RAndD />
      </div>
    </section>
  );
}
