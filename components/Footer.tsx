"use client";
import Image from "next/image";
import { Copy } from "./icons/Copy";
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
  const { home } = useTranslations();
  const footer = home.footer;
  return (
    <footer
      id="footer"
      className="bg-web-dark pb-6 relative pt-[60px] mlg:pt-0"
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
                {footer.addressTitle}
              </p>
              <p className="text-white text-sm leading-[1.6] tracking-[-0.015em] font-medium whitespace-pre-line">
                {footer.address}
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
                  {footer.company}
                </Link>
                <Link
                  href="/case"
                  className="text-white text-base leading-[1.6] tracking-[0.02em] font-bold pb-4 border-b border-white block hover:opacity-30 transition-opacity duration-300"
                >
                  {footer.case}
                </Link>
              </div>
              <div className="basis-1/3 space-y-10">
                <div className="space-y-4">
                  <Link
                    href="/technology"
                    className="text-white text-base leading-[1.6] tracking-[0.02em] font-bold pb-4 border-b border-white block hover:opacity-30 transition-opacity duration-300"
                  >
                    {footer.technology}
                  </Link>
                  <ul className="space-y-2">
                    {Object.entries(footer.technologyLinks).map(
                      ([key, value]) => (
                        <li key={key}>
                          <Link
                            href={`/technology/${key}`}
                            className="cursor-pointer text-white text-xs tracking-[-0.015em] font-medium flex items-center gap-2 hover:opacity-30 transition-opacity duration-300"
                          >
                            <span className="block w-2 border-1 border-white rounded-full" />
                            {value}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div className="space-y-4">
                  <Link
                    href="/factory-and-quality"
                    className="text-white text-base leading-[1.6] tracking-[0.02em] font-bold pb-4 border-b border-white block hover:opacity-30 transition-opacity duration-300"
                  >
                    {footer.factoryAndQuality}
                  </Link>
                  <ul className="space-y-2">
                    {Object.entries(footer.factoryAndQualityLinks).map(
                      ([key, value]) => (
                        <li key={key}>
                          <Link
                            href={`/factory-and-quality/${key}`}
                            className="cursor-pointer text-white text-xs tracking-[-0.015em] font-medium flex items-center gap-2 hover:opacity-30 transition-opacity duration-300"
                          >
                            <span className="block w-2 border-1 border-white rounded-full" />
                            {value}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
              <div className="basis-1/3 space-y-10">
                <Link
                  href="/news"
                  className="text-white text-base leading-[1.6] tracking-[0.02em] font-bold pb-4 border-b border-white block hover:opacity-30 transition-opacity duration-300"
                >
                  {footer.news}
                </Link>
                <Link
                  href="/recruit"
                  className="cursor-pointer text-white flex items-center gap-2 text-base leading-[1.6] tracking-[0.02em] font-bold pb-4 border-b border-white hover:opacity-30 transition-opacity duration-300"
                >
                  {footer.recruit}
                  <Copy />
                </Link>

                <Link
                  href="/contact"
                  className="text-white text-base leading-[1.6] tracking-[0.02em] font-bold pb-4 border-b border-white block hover:opacity-30 transition-opacity duration-300"
                >
                  {footer.contact}
                </Link>
                <Link
                  href="/company/policy"
                  className="text-white text-base leading-[1.6] tracking-[0.02em] font-bold pb-4 border-b border-white block hover:opacity-30 transition-opacity duration-300"
                >
                  {footer.policy}
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
          {footer.copyright}
        </p>
      </div>
    </footer>
  );
}
