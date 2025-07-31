"use client";

import HeadingSite from "@/components/HeadingSite";
import ContentSection from "../../corporate/ContentSection";
import ContentSectionMobile from "../../corporate/ContentSectionMobile";
import CorporateHeading from "../../corporate/CorporateHeading";
import Certification from "./Certification";
import Inpsection from "./Inspection";
import { useTranslations } from "@/providers/translation-provider";

export default function Quality() {
  const { quality } = useTranslations();
  const { heading, overview, sections } = quality;
  return (
    <section className="pt-[82px] mlg:pt-[90px] font-noto-sans">
      <HeadingSite
        title={heading.title}
        subtitle={heading.subtitle}
        imageUrl="/images/recruit/19 airtightness test.png"
        breadcrumbs={[
          { label: heading.breadcrumbs.top },
          { label: heading.breadcrumbs.quality },
        ]}
      />

      <div className="pt-[60px] md:pt-[120px] space-y-20 md:space-y-[120px]">
        <div className="px-6 container mx-auto">
          <CorporateHeading
            sectionName={overview.sectionName}
            title={overview.title}
            description={overview.description}
          />
        </div>
        <div className="space-y-[200px] hidden md:block">
          <ContentSection
            title={sections[0].title}
            subTitle={sections[0].subTitle}
            description={sections[0].description}
            imageUrl="/images/quality/quality-01.webp"
          />

          <ContentSection
            title={sections[1].title}
            imageUrl="/images/quality/quality-02.webp"
            subTitle={sections[1].subTitle}
            description={sections[1].description}
            align="right"
          />

          <ContentSection
            imageUrl="/images/quality/quality-03.webp"
            title={sections[2].title}
            subTitle={sections[2].subTitle}
            description={sections[2].description}
          />

          <ContentSection
            imageUrl="/images/quality/quality-04.webp"
            title={sections[3].title}
            subTitle={sections[3].subTitle}
            description={sections[3].description}
            align="right"
          />
        </div>
        <div className="block md:hidden space-y-20">
          <ContentSectionMobile
            title={sections[0].title}
            subTitle={sections[0].subTitle}
            description={sections[0].description}
            imageUrl="/images/quality/quality-01.webp"
          />

          <ContentSectionMobile
            title={sections[1].title}
            imageUrl="/images/quality/quality-02.webp"
            subTitle={sections[1].subTitle}
            description={sections[1].description}
            align="right"
          />

          <ContentSectionMobile
            imageUrl="/images/quality/quality-03.webp"
            title={sections[2].title}
            subTitle={sections[2].subTitle}
            description={sections[2].description}
          />

          <ContentSectionMobile
            imageUrl="/images/quality/quality-04.webp"
            title={sections[3].title}
            subTitle={sections[3].subTitle}
            description={sections[3].description}
            align="right"
          />
        </div>
      </div>
      <div className="hidden mlg:block pb-[390px] bg-web-light-bg">
        <Inpsection />
      </div>
      <div className="block mlg:hidden pb-[60px] bg-web-light-bg">
        <Certification />
      </div>
    </section>
  );
}
