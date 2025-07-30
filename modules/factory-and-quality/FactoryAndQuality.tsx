"use client";

import HeadingSite from "@/components/HeadingSite";
import { ArrowRight } from "@/components/icons/ArrowRight";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ContentSection from "../corporate/ContentSection";
import ContentSectionMobile from "../corporate/ContentSectionMobile";
import { useTranslations } from "@/providers/translation-provider";

export default function FactoryAndQuality() {
  const { factoryAndQuality } = useTranslations();
  const { heading, equipment, quality } = factoryAndQuality;
  return (
    <section className="py-[82px] mlg:py-[90px] font-noto-sans">
      {/* Decor */}
      <HeadingSite
        title={heading.title}
        subtitle={heading.subtitle}
        imageUrl="/images/factory-and-quality/banner.png"
        breadcrumbs={[
          { label: heading.breadcrumbs.top },
          { label: heading.breadcrumbs.factoryAndQuality },
        ]}
      />

      <div className="py-[60px] md:py-[120px]">
        <div className="hidden md:block space-y-[200px] mt-20 mlg:mt-[120px]">
          <ContentSection
            title={equipment.title}
            subTitle={equipment.subTitle}
            description={equipment.description}
            imageUrl="/images/factory-and-quality/equipment.webp"
            developmentItems={equipment.developmentItems}
            developmentTitle={equipment.developmentTitle}
            button={
              <Link href="/factory-and-quality/equipment">
                <Button className="group relative overflow-hidden">
                  {equipment.buttonText}
                  <ArrowRight />
                </Button>
              </Link>
            }
          />

          <ContentSection
            title={quality.title}
            subTitle={quality.subTitle}
            description={quality.description}
            imageUrl="/images/recruit/19 airtightness test.png"
            button={
              <Link href="/factory-and-quality/quality">
                <Button className="group relative overflow-hidden">
                  {quality.buttonText}
                  <ArrowRight />
                </Button>
              </Link>
            }
            align="right"
          />
        </div>

        <div className="block md:hidden space-y-20">
          <ContentSectionMobile
            title={equipment.title}
            subTitle={equipment.subTitle}
            description={equipment.mobileDescription}
            imageUrl="/images/factory-and-quality/equipment.webp"
            developmentItems={equipment.mobileDevelopmentItems}
          />
          <ContentSectionMobile
            title={quality.title}
            subTitle={quality.subTitle}
            description={quality.description}
            imageUrl="/images/recruit/19 airtightness test.png"
            align="right"
          />
        </div>
      </div>
    </section>
  );
}
