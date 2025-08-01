"use client";

import Image from "next/image";
import Link from "next/link";

interface EquipmentCardProps {
  id?: string;
  title: string;
  description: string;
  image: string;
  href?: string;
}

export default function EquipmentCard({ 
  id, 
  title, 
  description, 
  image, 
  href 
}: EquipmentCardProps) {
  const content = (
    <div className="space-y-4">
      <div className="relative aspect-video">
        <Image 
          src={image || "/images/achivement.png"} 
          alt={title} 
          fill 
          className="object-cover"
        />
      </div>
      <p className="text-[15px] md:text-base -tracking-[0.02em] font-bold">
        {title}
      </p>
      <p className="text-[13px] md:text-sm font-noto-sans-jp font-normal -tracking-[0.02em]">
        {description}
      </p>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block hover:opacity-80 transition-opacity">
        {content}
      </Link>
    );
  }

  return content;
}