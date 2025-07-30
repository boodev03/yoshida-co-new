"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTranslations } from "@/providers/translation-provider";

export default function Map() {
  const { company } = useTranslations();
  
  const locations = [
    {
      name: company.map.locations.headOffice.name,
      address: company.map.locations.headOffice.address,
      images: "/images/company/head-office.webp",
    },
    {
      name: company.map.locations.shiozakiFactory.name,
      address: company.map.locations.shiozakiFactory.address,
      images: "/images/company/shiozaki-factory.webp",
    },
    {
      name: company.map.locations.koizumiWarehouse.name,
      address: company.map.locations.koizumiWarehouse.address,
      images: "/images/company/koizumi-warehouse.webp",
    },
    {
      name: company.map.locations.fukushimaOffice.name,
      address: company.map.locations.fukushimaOffice.address,
      images: "/images/company/fukushima-office.webp",
    },
  ];
  return (
    <div className="flex gap-8 overflow-x-auto px-6 mlg:px-0">
      {locations.map((location, index) => (
        <div key={index} className="space-y-6 shrink-0 flex-1 min-w-[256px]">
          <div className="aspect-video relative">
            <Image
              src={location.images}
              alt="map"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-4">
            <p className="text-xl font-bold text-web-dark -tracking-[0.02em]">
              {location.name}
            </p>
            <p className="text-[15px] md:text-base text-web-dark -tracking-[0.02em] whitespace-pre-line">
              {location.address}
            </p>
            <Button variant="outline">{company.map.googleMap}</Button>
          </div>
        </div>
      ))}
    </div>
  );
}
