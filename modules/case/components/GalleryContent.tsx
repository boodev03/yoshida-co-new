"use client";

import Image from "next/image";
import { GalleryData } from "@/hooks/useGetCases";

interface GalleryContentProps {
  data: GalleryData;
}

export default function GalleryContent({ data }: GalleryContentProps) {
  return (
    <div className="container mx-auto mt-8 md:mt-16">
      {data.rows.map((row) => (
        <div key={row.id} className="mb-8 md:mb-16">
          <div
            className={`grid gap-8 ${
              row.imagesPerRow === 1
                ? "grid-cols-1"
                : row.imagesPerRow === 2
                ? "grid-cols-1 sm:grid-cols-2"
                : row.imagesPerRow === 3
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : row.imagesPerRow === 4
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {row.images.map((image) => (
              <div key={image.id} className="aspect-video relative">
                <Image src={image.src} alt={image.alt} fill />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
