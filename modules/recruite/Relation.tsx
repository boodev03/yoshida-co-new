"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "@/providers/translation-provider";

export default function Relation() {
  const { dict } = useTranslations();
  const relation = dict.recruit.relation;

  return (
    <section className="flex flex-col md:flex-row font-shippori-mincho">
      <div className="flex-1 aspect-video relative group overflow-hidden">
        <Image
          src="/images/recruit/footer-1.png"
          alt="relation"
          fill
          className="transition-transform duration-[0.75s] ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-web-main/50"></div>
        <div className="absolute inset-0 flex justify-center items-center">
          <Button
            asChild
            className="text-xl mlg:text-[36px] size-auto mlg:h-[60px] mlg:min-w-[284px] leading-[15px] rounded-[3px]"
          >
            <Link href="/recruit/requirement">{relation.jobRequirements}</Link>
          </Button>
        </div>
      </div>
      <div className="flex-1 aspect-video relative group overflow-hidden">
        <Image
          src="/images/recruit/footer-2.png"
          alt="relation"
          fill
          className="transition-transform duration-[0.75s] ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-web-main/50"></div>
        <div className="absolute inset-0 flex justify-center items-center">
          <Button
            asChild
            className="text-xl mlg:text-[36px] size-auto mlg:h-[60px] mlg:min-w-[284px] leading-[15px] rounded-[3px]"
          >
            <Link href="/recruit/entry">{relation.entry}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
