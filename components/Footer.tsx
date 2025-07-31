"use client";
import Image from "next/image";
import { Copy } from "./icons/Copy";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from "@/providers/translation-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { cn } from "@/lib/utils";

const LanguageButton = () => {
  const { locale } = useTranslations();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: "en" | "ja") => {
    document.cookie = `locale=${newLocale}; path=/; max-age=${
      60 * 60 * 24 * 365
    }; SameSite=Lax`;

    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/");
    router.push(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex shrink-0 px-3 items-center gap-[6px] text-sm -tracking-[1.5%] text-white font-bold hover:opacity-30 transition-opacity duration-300">
          <Image
            src="/images/global-white.png"
            alt="language"
            width={24}
            height={24}
            className="size-6"
          />
          <p className="shrink-0">{locale === "ja" ? "日本語" : "EN"}</p>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-[999999999999]">
        <DropdownMenuItem
          onClick={() => handleLanguageChange("en")}
          className={cn(locale === "en" && "bg-web-main/10 text-web-main")}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleLanguageChange("ja")}
          className={cn(locale === "ja" && "bg-web-main/10 text-web-main")}
        >
          日本語
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default function Footer() {
  return (
    <footer
      id="footer"
      className="bg-web-dark pt-[75px] mlg:pt-[130px] pb-6 relative"
    >
      <div className="container">
        <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center gap-[84px] xl:gap-0">
          <div className="basis-1/5 space-y-12">
            <Image
              src="/images/light-logo.png"
              alt="logo"
              width={120}
              height={34}
            />
            <div className="space-y-2">
              <p className="text-white text-base leading-[1.6] tracking-[0.02em] font-bold">
                本社工場
              </p>
              <p className="text-white text-sm leading-[1.6] tracking-[-0.015em] font-medium whitespace-pre-line">
                {`〒311-1135
茨城県水戸市六反田町1279番地の1`}
              </p>
            </div>
          </div>

          <div className="basis-3/5 space-y-8">
            <div className="flex flex-col md:flex-row gap-10">
              <div className="basis-1/3 space-y-6 md:space-y-10">
                <Link
                  href="/company"
                  className="text-white text-base leading-[1.6] tracking-[0.02em] font-bold pb-4 border-b border-white block hover:opacity-30 transition-opacity duration-300"
                >
                  企業情報
                </Link>
                <Link
                  href="/case"
                  className="text-white text-base leading-[1.6] tracking-[0.02em] font-bold pb-4 border-b border-white block hover:opacity-30 transition-opacity duration-300"
                >
                  開発事例
                </Link>
              </div>
              <div className="basis-1/3 space-y-10">
                <div className="space-y-4">
                  <Link
                    href="/technology"
                    className="text-white hidden md:block text-base leading-[1.6] tracking-[0.02em] font-bold pb-4 border-b border-white"
                  >
                    ヨシダの技術
                  </Link>
                  <ul className="space-y-2 hidden md:block">
                    {["設計", "製缶・溶接", "機械加工", "研究開発"].map(
                      (item, index) => (
                        <li key={index}>
                          <Link
                            href={`/technology/${
                              item === "設計"
                                ? "design"
                                : item === "製缶・溶接"
                                ? "welding"
                                : item === "機械加工"
                                ? "machining"
                                : "development"
                            }`}
                            className="cursor-pointer text-white text-xs tracking-[-0.015em] font-medium flex items-center gap-2 hover:opacity-30 transition-opacity duration-300"
                          >
                            <span className="block w-2 border-1 border-white rounded-full" />
                            {item}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                  <Accordion type="single" collapsible className="md:hidden">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-white text-base leading-[1.6] tracking-[0.02em] font-bold pb-4 border-b border-white rounded-none">
                        ヨシダの技術
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4 px-4 text-white pt-4">
                        <ul className="space-y-2">
                          {["設計", "製缶・溶接", "機械加工", "研究開発"].map(
                            (item, index) => (
                              <li key={index}>
                                <Link
                                  href={`/technology/${
                                    item === "設計"
                                      ? "design"
                                      : item === "製缶・溶接"
                                      ? "welding"
                                      : item === "機械加工"
                                      ? "machining"
                                      : "development"
                                  }`}
                                  className="cursor-pointer text-white text-xs tracking-[-0.015em] font-medium flex items-center gap-2 hover:opacity-30 transition-opacity duration-300"
                                >
                                  <span className="block w-2 border-1 border-white rounded-full" />
                                  {item}
                                </Link>
                              </li>
                            )
                          )}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                <div className="space-y-4">
                  <Link
                    href="/factory-and-quality"
                    className="text-white hidden md:block text-base leading-[1.6] tracking-[0.02em] font-bold pb-4 border-b border-white"
                  >
                    工場と品質への取り組み
                  </Link>
                  <ul className="space-y-2 hidden md:block">
                    {["工場設備", "品質保証"].map((item, index) => (
                      <li key={index}>
                        <Link
                          href={`/factory-and-quality/${
                            item === "工場設備" ? "equipment" : "quality"
                          }`}
                          className="cursor-pointer text-white text-xs tracking-[-0.015em] font-medium flex items-center gap-2 hover:opacity-30 transition-opacity duration-300"
                        >
                          <span className="block w-2 border-1 border-white rounded-full" />
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Accordion type="single" collapsible className="md:hidden">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-white text-base leading-[1.6] tracking-[0.02em] font-bold pb-4 border-b border-white rounded-none">
                        工場と品質への取り組み
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4 px-4 text-white pt-4">
                        <ul className="space-y-2">
                          {["工場設備", "品質管理"].map((item, index) => (
                            <li key={index}>
                              <Link
                                href={`/factory-and-quality/${
                                  item === "工場設備" ? "equipment" : "quality"
                                }`}
                                className="cursor-pointer text-white text-xs tracking-[-0.015em] font-medium flex items-center gap-2 hover:opacity-30 transition-opacity duration-300"
                              >
                                <span className="block w-2 border-1 border-white rounded-full" />
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
              <div className="basis-1/3 space-y-10">
                <Link
                  href="/news"
                  className="text-white text-base leading-[1.6] tracking-[0.02em] font-bold pb-4 border-b border-white block hover:opacity-30 transition-opacity duration-300"
                >
                  新着情報
                </Link>
                <Link
                  href="/recruit"
                  className="cursor-pointer text-white flex items-center gap-2 text-base leading-[1.6] tracking-[0.02em] font-bold pb-4 border-b border-white hover:opacity-30 transition-opacity duration-300"
                >
                  採用情報
                  <Copy />
                </Link>

                <Link
                  href="/contact"
                  className="text-white text-base leading-[1.6] tracking-[0.02em] font-bold pb-4 border-b border-white block hover:opacity-30 transition-opacity duration-300"
                >
                  お問い合わせ
                </Link>
                <Link
                  href="/company/policy"
                  className="text-white text-base leading-[1.6] tracking-[0.02em] font-bold pb-4 border-b border-white block hover:opacity-30 transition-opacity duration-300"
                >
                  プライバシーポリシー
                </Link>
              </div>
            </div>

            {/* Language */}
            <div className="flex xl:justify-end">
              <LanguageButton />
            </div>
          </div>
        </div>

        <p className="text-xs text-white leading-[1.6] tracking-[0.02em] font-bold py-[22px] md:py-4 mt-[60px] md:mt-14 text-center md:text-left">
          ©︎株式会社ヨシダ
        </p>
      </div>
    </footer>
  );
}
