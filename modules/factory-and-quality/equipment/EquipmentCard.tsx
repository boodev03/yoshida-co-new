"use client";

import Image from "next/image";
import { useTranslations } from "@/providers/translation-provider";

export default function EquipmentCard() {
  const { equipment } = useTranslations();
  const { equipmentCard } = equipment;
  return (
    <div className="space-y-4">
      <div className="relative aspect-video">
        <Image src="/images/achivement.png" alt="blog-decor" fill />
      </div>
      <p className="text-[15px] md:text-base -tracking-[0.02em] font-bold">
        {equipmentCard.sampleTitle}
      </p>
      <p className="text-[13px] md:text-sm font-noto-sans-jp font-normal -tracking-[0.02em]">
        {equipmentCard.sampleDescription}
      </p>
    </div>
  );
}