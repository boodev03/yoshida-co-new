"use client";

import { Button } from "@/components/ui/button";
import EquipmentCard from "./EquipmentCard";
import { ArrowRight } from "@/components/icons/ArrowRight";
import { useTranslations } from "@/providers/translation-provider";
import { useGetEquipments } from "@/hooks/useGetEquipments";

export default function Equipment() {
  const { equipment, locale } = useTranslations();
  const { equipmentSection } = equipment;

  // Fetch equipment data from API
  const { data, isLoading, error } = useGetEquipments(8, locale); // Fetch 8 items for grid display
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

      {/* Equipment Cards */}
      {isLoading ? (
        // Loading skeleton
        <div className="flex md:grid md:grid-cols-2 mlg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-x-auto md:overflow-visible">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="min-w-[320px] md:min-w-0 animate-pulse">
              <div className="space-y-4">
                <div className="bg-gray-200 aspect-video rounded-lg"></div>
                <div className="bg-gray-200 h-4 rounded"></div>
                <div className="bg-gray-200 h-3 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        // Error state
        <div className="text-center text-red-500 py-8">
          Error loading equipment
        </div>
      ) : (
        // Equipment cards from API
        <div className="flex md:grid md:grid-cols-2 mlg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-x-auto md:overflow-visible">
          {data?.cases?.map((equipment, index) => (
            <div
              key={equipment.id || index}
              className="min-w-[320px] md:min-w-0"
            >
              <EquipmentCard
                id={equipment.id}
                title={equipment.title}
                description={equipment.cardDescription}
                image={equipment.thumbnail}
                href={`/${locale}/factory-and-quality/equipment/${equipment.id}`}
              />
            </div>
          )) || (
            // Fallback empty state
            <div className="text-center text-gray-500 py-8 col-span-full">
              No equipment available
            </div>
          )}
        </div>
      )}

      <div className="flex justify-center md:hidden mt-6">
        <Button className="group relative overflow-hidden">
          {equipmentSection.buttonText}
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
}
