"use client";

import { Button } from "@/components/ui/button";
import EquipmentCard from "./EquipmentCard";
import { ArrowRight } from "@/components/icons/ArrowRight";
import { useTranslations } from "@/providers/translation-provider";

export default function Equipment() {
  const { equipment } = useTranslations();
  const { equipmentSection } = equipment;
  return (
    <div className="container mx-auto space-y-6 md:space-y-20">
      <div className="w-full space-y-2 flex flex-col items-center">
        <div className="relative">
          <div
            className="size-10 bg-web-light absolute -bottom-1 left-0 -translate-x-2/3 z-0"
            style={{
              clipPath: "polygon(50% 0%, 100% 90%, 0% 90%)",
            }}
          />
          <p className="text-web-main font-bold text-[13px] md:text-base -tracking-[0.02em] relative z-10">
            {equipmentSection.title}
          </p>
        </div>
        <p className="font-bold text-web-dark text-xl md:text-[32px] -tracking-[0.02em]">
          {equipmentSection.heading}
        </p>
      </div>

      {/* Equipment Card */}
      <div className="flex md:grid md:grid-cols-2 mlg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-x-auto md:overflow-visible">
        <div className="min-w-[320px] md:min-w-0">
          <EquipmentCard />
        </div>
        <div className="min-w-[320px] md:min-w-0">
          <EquipmentCard />
        </div>
        <div className="min-w-[320px] md:min-w-0">
          <EquipmentCard />
        </div>
        <div className="min-w-[320px] md:min-w-0">
          <EquipmentCard />
        </div>
      </div>

      <div className="flex justify-center md:hidden mt-6">
        <Button className="group relative overflow-hidden">
          {equipmentSection.buttonText}
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
}
