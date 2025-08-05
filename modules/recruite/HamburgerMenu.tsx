import { Hamburger } from "@/components/icons/Hamburger";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useTranslations } from "@/providers/translation-provider";
import { Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface IProps {
  isScrolled: boolean;
  isWhite?: boolean;
}

const LanguageButton = ({ isWhite }: IProps) => {
  const { dict, locale } = useTranslations();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: "en" | "ja") => {
    // Set cookie for language preference
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
        <button
          className={cn(
            "flex shrink-0 lg:px-1 xl:px-3 items-center gap-[6px] text-sm -tracking-[1.5%] font-bold hover:opacity-30 transition-opacity duration-300",
            isWhite ? "text-white" : "text-web-main"
          )}
        >
          <Globe className="size-6" />
          <p className="shrink-0">{dict.recruit.headerButton.language}</p>
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

const navbarItems = [
  {
    label: "Top",
    href: "/recruit",
  },
  {
    label: "キャリアパス",
    href: "/recruit/career-path",
  },
  {
    label: "働く環境",
    href: "/recruit/place",
  },
  {
    label: "募集要項",
    href: "/recruit/requirement",
  },
];

export default function HamburgerMenu({ isScrolled, isWhite = false }: IProps) {
  const [open, setIsOpen] = useState(false);
  
  return (
    <Sheet open={open} onOpenChange={setIsOpen}>
      <SheetTrigger
        className={cn("text-web-main md:text-white", {
          "text-web-main md:text-black": isScrolled,
          "text-white": isWhite,
        })}
      >
        <Hamburger />
      </SheetTrigger>
      <SheetTitle className="hidden" />
      <SheetContent className="bg-web-main px-12 pt-[102px] pb-[46px] border-l-0 z-[99999999999999] text-white w-[303px] flex flex-col justify-between">
        <div className="space-y-12">
          {navbarItems.map((item) => (
            <div key={item.label}>
              <Link
                href={item.href}
                className="font-shippori-mincho text-white flex justify-center text-sm font-bold tracking-[-0.015em] hover:opacity-30"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-[62px]">
          <Link href="/recruit/entry" onClick={() => setIsOpen(false)}>
            <Button className="font-shippori-mincho bg-white hover:border-white text-web-main rounded-[3px] hover:bg-web-main hover:text-white">
              エントリー
            </Button>
          </Link>
          <div className="flex items-center gap-6">
            <a
              href="https://www.instagram.com/yoshida1923_japan/"
              target="_blank"
              className="hover:opacity-80 transition-opacity duration-300"
            >
              <Image
                src="/images/instagram-white.png"
                alt="instagram"
                width={24}
                height={24}
              />
            </a>
            <LanguageButton isScrolled={isScrolled} isWhite={true} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
