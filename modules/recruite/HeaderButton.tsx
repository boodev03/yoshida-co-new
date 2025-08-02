import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";
import { useTranslations } from "@/providers/translation-provider";

interface IProps {
  isWhite?: boolean;
  className?: string;
}

import { useRouter, usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

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

export default function HeaderButton({ isWhite, className }: IProps) {
  const { dict } = useTranslations();

  return (
    <div className={cn("flex items-center gap-4", className)}>
      {/* Instagram */}
      <a
        href="https://www.instagram.com/yoshida1923_japan/"
        target="_blank"
        className={cn(
          "hidden mlg:block shrink-0 hover:opacity-30 transition-opacity duration-300 lg:px-1 xl:px-3 text-web-main",
          isWhite && "text-white"
        )}
      >
        <InstagramIcon />
      </a>

      {/* Language */}
      <LanguageButton isWhite={isWhite} />

      {/* CTA Button */}
      <Link href="/recruit/entry" className="inline-block">
        <Button
          className={cn(
            "ml-3 bg-web-main text-white rounded-[3px] h-[42px] hover:border-web-main hover:bg-white hover:text-web-main transition",
            isWhite &&
              "bg-white text-web-main hover:bg-web-main hover:text-white"
          )}
        >
          {dict.recruit.headerButton.entry}
        </Button>
      </Link>
    </div>
  );
}
