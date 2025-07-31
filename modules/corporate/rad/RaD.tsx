"use client";

import HeadingSite from "@/components/HeadingSite";
import ContentSection from "../ContentSection";
import ContentSectionMobile from "../ContentSectionMobile";
import CorporateHeading from "../CorporateHeading";
import { useTranslations } from "@/providers/translation-provider";

export default function RaD() {
  const { technology } = useTranslations();
  const { heading, overview, project1, project2 } = technology.rad;

  return (
    <section className="pt-[82px] mlg:pt-[90px] font-noto-sans">
      <HeadingSite
        title={heading.title}
        subtitle={heading.subtitle}
        imageUrl="/images/RandD/banner.webp"
        breadcrumbs={[
          { label: heading.breadcrumbs.top },
          { label: heading.breadcrumbs.rad },
        ]}
      />

      <div className="pt-[60px] md:pt-[120px] mb-[60px] md:mb-[120px] pb-[60px] mlg:pb-[390px]">
        <div className="container mx-auto mb-8 mlg:mb-0">
          <p className="text-web-dark text-[13px] md:text-base text-center -tracking-[0.02em] mb-12 whitespace-pre-line">
            {overview.description}
          </p>
          <CorporateHeading
            sectionName={project1.sectionName}
            title={project1.title}
            description={project1.description}
          />
        </div>

        <div className="hidden md:block space-y-[200px] mt-20 mlg:mt-[120px]">
          <ContentSection
            title={project1.content.title}
            subTitle={project1.content.subTitle}
            description={project1.content.description}
            imageUrl="/images/RandD/strength-1.png"
            developmentItems={project1.content.developmentItems}
            developmentTitle={project1.content.developmentTitle}
          />
          <div className="container mx-auto mb-8 mlg:mb-[120px]">
            <CorporateHeading
              sectionName={project2.sectionName}
              title={project2.title}
              description={project2.description}
            />
          </div>

          <ContentSection
            title={project2.content.title}
            subTitle={project2.content.subTitle}
            description={project2.content.description}
            imageUrl="/images/RandD/strength-2.webp"
          />
        </div>

        <div className="block md:hidden space-y-20">
          <ContentSectionMobile
            title={project1.content.title}
            subTitle={project1.content.subTitle}
            description={project1.content.description}
            imageUrl="/images/RandD/strength-1.webp"
            developmentItems={project1.content.developmentItems}
          />
          <div className="container mx-auto mb-8">
            <CorporateHeading
              sectionName={project2.sectionName}
              title={project2.title}
              description={project2.description}
            />
          </div>
          <ContentSectionMobile
            title={project2.content.title}
            subTitle={project2.content.subTitle}
            description={project2.content.description}
            imageUrl="/images/RandD/strength-2.webp"
            align="right"
          />
        </div>
      </div>
    </section>
  );
}
