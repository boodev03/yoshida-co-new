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
          { label: company.heading.breadcrumbs.company },
        ]}
      />

      {/* Main content */}
      <div className="mt-[60px] md:mt-[120px] pb-[60px] mlg:pb-[390px] px-0 sm:px-6 space-y-8 md:space-y-20">
        <div className="container mx-auto">
          <CorporateSelect />
        </div>
        <div id="message">
          <Message />
        </div>
        <div className="container mx-auto mt-[272px]" id="history">
          <HistoryTimeline />
        </div>
        <div className="container mx-auto" id="certification">
          <Map />
        </div>
      </div>
    </section>
  );
}
