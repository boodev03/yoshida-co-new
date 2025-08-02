"use client";

import HeadingSite from "@/components/HeadingSite";
import { useTranslations } from "@/providers/translation-provider";

export default function Policy() {
  const { policy } = useTranslations();

  return (
    <section className="pt-[82px] mlg:pt-[90px] font-noto-sans">
      <HeadingSite
        title="PRIVACY POLICY"
        subtitle={policy.subtitle}
        imageUrl="/images/achivement.png"
        breadcrumbs={[
          { label: policy.breadcrumbs.top },
          { label: policy.breadcrumbs.contact },
        ]}
      />

      <div className="py-[60px] md:py-[120px] container mx-auto space-y-8 mlg:space-y-12 pb-[60px] mlg:pb-[390px]">
        <p className="text-xl text-[32px] -tracking-[0.02em] font-bold text-web-dark text-center">
          {policy.title}
        </p>
        <div className="space-y-8 mlg:space-y-12">
          <p className="text-[15px] mlg:text-base text-web-dark whitespace-pre-line">
            {policy.intro}
          </p>
          {policy.sections.map(
            (section: { heading: string; content: string }, idx: number) => (
              <div className="space-y-2" key={idx}>
                <p className="text-[15px] mlg:text-base text-web-dark font-bold whitespace-pre-line">
                  {section.heading}
                </p>
                <p className="text-[15px] mlg:text-base text-web-dark whitespace-pre-line">
                  {section.content}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
