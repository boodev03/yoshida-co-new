import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";
import { InstagramIcon } from "./icons/InstagramIcon";
import { Button } from "./ui/button";
import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from "@/providers/translation-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface IProps {
  isWhite?: boolean;
  className?: string;
}

const LanguageButton = ({ isWhite }: IProps) => {
  const { locale } = useTranslations();
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
            isWhite ? "text-white" : "text-web-dark"
          )}
        >
          <Globe className="size-6" />
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

export default function HeaderButton({ isWhite, className }: IProps) {
  const router = useRouter();
  const { tPath } = useTranslations();

  return (
    <div className={cn("flex items-center gap-4", className)}>
      {/* Instagram */}
      <a
        href="https://www.instagram.com/yoshida1923_japan/"
        target="_blank"
        className={cn(
          "block shrink-0 hover:opacity-30 transition-opacity duration-300 lg:px-1 xl:px-3 text-web-dark",
          isWhite && "text-white"
        )}
      >
        {/* <Image
          src={
            isWhite ? "/images/instagram-white.png" : "/images/instagram.png"
          }
          alt="instagram"
          width={24}
          height={24}
          className="size-6"
        /> */}
        <InstagramIcon />
      </a>

      {/* Language */}
      <LanguageButton isWhite={isWhite} />

      {/* CTA Button */}
      <Button
        onClick={() => router.push("/contact")}
        className={cn(
          "ml-3 rounded-full h-[42px] transition",
          isWhite &&
            "bg-white text-web-main hover:border-white hover:bg-web-main hover:text-white"
        )}
      >
        {tPath("common.contact")}
      </Button>
    </div>
  );
}
