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
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3845.833267743164!2d140.49747757628055!3d36.33829169360034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60223ab1054292eb%3A0x9e84cbe46b956eb4!2s1279-1%20Rokutandachō%2C%20Mito%2C%20Ibaraki%20311-1135%2C%20Japan!5e1!3m2!1sen!2sru!4v1753895635133!5m2!1sen!2sru",
    },
    {
      name: company.map.locations.shiozakiFactory.name,
      address: company.map.locations.shiozakiFactory.address,
      images: "/images/company/shiozaki-factory.webp",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3213.9975220653996!2d140.5560450762806!3d36.33660989369417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x602231ac6a672f3d%3A0x7f8dad398d81dd99!2s2363%20Shiogasakichō%2C%20Mito%2C%20Ibaraki%20311-1114%2C%20Japan!5e0!3m2!1sen!2sru!4v1753895743544!5m2!1sen!2sru",
    },
    {
      name: company.map.locations.koizumiWarehouse.name,
      address: company.map.locations.koizumiWarehouse.address,
      images: "/images/company/koizumi-warehouse.webp",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3213.7636350779044!2d140.56433257628083!3d36.34227799337809!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x602231a53e3ff115%3A0xbaf1518b7721ad8f!2s213-1%20Koizumichō%2C%20Mito%2C%20Ibaraki%20311-1111%2C%20Japan!5e0!3m2!1sen!2sru!4v1753895781808!5m2!1sen!2sru",
    },
    {
      name: company.map.locations.fukushimaOffice.name,
      address: company.map.locations.fukushimaOffice.address,
      images: "/images/company/fukushima-office.webp",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3169.4015669114065!2d140.96860287631733!3d37.403982333431976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6020e7f8dd2f6537%3A0x52804a95210c16c8!2z5aSn54aK44Kk44Oz44Kt44Ol44OZ44O844K344On44Oz44K744Oz44K_44O8!5e0!3m2!1sen!2sru!4v1753895824913!5m2!1sen!2sru",
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
            <Button 
              variant="outline" 
              onClick={() => window.open(location.mapUrl, '_blank')}
            >
              {company.map.googleMap}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
