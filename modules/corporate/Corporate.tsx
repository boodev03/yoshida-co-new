"use client";

import HeadingSite from "@/components/HeadingSite";
import CorporateSelect from "./CorporateSelect";
import HistoryTimeline from "./HistoryTimeline";
import Map from "./Map";
import Message from "./Message";
import { useTranslations } from "@/providers/translation-provider";

export default function Corporate() {
  const { company } = useTranslations();
  
  return (
    <section className="pt-[82px] mlg:pt-[90px] font-noto-sans">
      <HeadingSite
        title={company.heading.title}
        subtitle={company.heading.subtitle}
        imageUrl="/images/company/factory.webp"
        breadcrumbs={[
          { label: company.heading.breadcrumbs.top }, 
          { label: company.heading.breadcrumbs.company }
        ]}
      />

      {/* Main content */}
      <div className="my-[60px] md:my-[120px] px-0 sm:px-6 container mx-auto space-y-8 md:space-y-20">
        <CorporateSelect />
        <Message />
        <HistoryTimeline />
        <Map />
      </div>
    </section>
  );
}
