"use client";

import HeadingSite from "@/components/HeadingSite";
import ContentSection from "../ContentSection";
import ContentSectionMobile from "../ContentSectionMobile";
import CorporateHeading from "../CorporateHeading";
import CoverageCard from "../CoverageCard";
import { useTranslations } from "@/providers/translation-provider";

export default function Welding() {
  const { technology } = useTranslations();
  const { heading, overview, strengths, coverage } = technology.welding;

  return (
    <section className="pt-[82px] mlg:pt-[90px] font-noto-sans">
      <HeadingSite
        title={heading.title}
        subtitle={heading.subtitle}
        imageUrl="/images/welding/banner.webp"
        breadcrumbs={[
          { label: heading.breadcrumbs.top },
          { label: heading.breadcrumbs.technology },
          { label: heading.breadcrumbs.welding },
        ]}
      />

      <div className="py-[60px] md:py-[120px]">
        <div className="container mx-auto">
          <CorporateHeading
            sectionName={overview.sectionName}
            title={overview.title}
            description={overview.description}
          />
        </div>

        <div className="hidden md:block space-y-[200px] mt-20 mlg:mt-[120px]">
          <ContentSection
            title={strengths.sections[0].title}
            subTitle={strengths.sections[0].subTitle}
            description={strengths.sections[0].description}
            imageUrl="/images/welding/welding-techs.png"
            developmentItems={strengths.sections[0].developmentItems}
            developmentTitle={strengths.sections[0].developmentTitle}
          />
          <ContentSection
            title={strengths.sections[1].title}
            subTitle={strengths.sections[1].subTitle}
            description={strengths.sections[1].description}
            imageUrl="/images/welding/strength-1.webp"
            align="right"
          />
        </div>

        <div className="block md:hidden space-y-20">
          <ContentSectionMobile
            title={strengths.sections[0].title}
            subTitle={strengths.sections[0].subTitle}
            description={strengths.sections[0].description}
            imageUrl="/images/welding/strength-1.webp"
          />
          <ContentSectionMobile
            title={strengths.sections[1].title}
            subTitle={strengths.sections[1].subTitle}
            description={strengths.sections[1].description}
            imageUrl="/images/welding/strength-1.webp"
            align="right"
          />
        </div>

        <div className="bg-web-light-bg">
          <div className="container mx-auto mt-20 mlg:mt-[200px] py-12 mlg:py-[120px] space-y-12 mlg:space-y-20">
            <div className="w-full space-y-2 flex flex-col items-center">
              <div className="relative">
                <div
                  className="size-10 bg-web-light absolute -rotate-[40deg] bottom-0 -left-1 -translate-x-2/3 z-0"
                  style={{
                    clipPath: "polygon(50% 0%, 100% 90%, 0% 90%)",
                  }}
                />
                <p className="text-web-main font-bold text-[13px] md:text-base -tracking-[0.02em] relative z-10">
                  {coverage.sectionName}
                </p>
              </div>
              <p className="font-bold text-web-dark text-xl md:text-[32px] -tracking-[0.02em]">
                {coverage.title}
              </p>
              <p className="text-web-dark text-base mt-12 text-left w-full whitespace-pre-line">
                {coverage.description}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-12 mlg:grid-cols-3 mlg:gap-6">
              <CoverageCard
                title={coverage.cards[0].title}
                description={coverage.cards[0].description}
                imageUrl="/images/welding/scope-1.png"
              />
              <CoverageCard
                title={coverage.cards[1].title}
                description={coverage.cards[1].description}
                imageUrl="/images/welding/scope-2.png"
              />
              <CoverageCard
                title={coverage.cards[2].title}
                description={coverage.cards[2].description}
                imageUrl="/images/welding/scope-3.png"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
