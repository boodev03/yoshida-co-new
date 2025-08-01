"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  image: string;
  category: string;
  title: string;
  shortDesc: string;
  date: string;
  href: string;
  index: number;
}
export default function BlogItem({
  image,
  category,
  title,
  shortDesc,
  date,
  href,
  index,
}: IProps) {
  return (
    <div className="w-full shrink-0">
      <Link
        href={href}
        className="space-y-4 block group"
      >
        <div className="relative aspect-video group-hover:opacity-50 transition-opacity duration-300">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <div className="space-y-2">
          <p className="text-sm leading-[1.6] tracking-[0.02em] font-bold">
            {title}
          </p>
          <p className="text-sm leading-[1.6] tracking-[0.02em] line-clamp-3">
            {shortDesc}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-web-main font-bold leading-[1.625] tracking-[0.02em]">
            {date}
          </p>
          <Button className="h-6 px-4 text-xs">お知らせ</Button>
        </div>
      </Link>
    </div>
  );
}
