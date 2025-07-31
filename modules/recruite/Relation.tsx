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
      <Link
        href="/recruit/requirement"
        className="flex-1 aspect-video relative group overflow-hidden block"
        tabIndex={-1}
        aria-label={relation.jobRequirements}
      >
        <Image
          src="/images/recruit/footer-1.png"
          alt="relation"
          fill
          className="transition-transform duration-[0.75s] ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-web-main/50"></div>
        <div className="absolute inset-0 flex justify-center items-center">
          <Button
            tabIndex={0}
            className="text-xl mlg:text-[36px] size-auto mlg:h-[60px] mlg:min-w-[284px] leading-[15px] rounded-[3px] pointer-events-none"
            aria-hidden="true"
          >
            {relation.jobRequirements}
          </Button>
        </div>
      </Link>
      <Link
        href="/recruit/entry"
        className="flex-1 aspect-video relative group overflow-hidden block"
        tabIndex={-1}
        aria-label={relation.entry}
      >
        <Image
          src="/images/recruit/footer-2.png"
          alt="relation"
          fill
          className="transition-transform duration-[0.75s] ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-web-main/50"></div>
        <div className="absolute inset-0 flex justify-center items-center">
          <Button
            tabIndex={0}
            className="text-xl mlg:text-[36px] size-auto mlg:h-[60px] mlg:min-w-[284px] leading-[15px] rounded-[3px] pointer-events-none"
            aria-hidden="true"
          >
            {relation.entry}
          </Button>
        </div>
      </Link>
    </section>
  );
}
