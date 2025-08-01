import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Copy } from "./icons/Copy";
import { Hamburger } from "./icons/Hamburger";
import { Button } from "./ui/button";
import Image from "next/image";
import { useTranslations } from "@/providers/translation-provider";
import { useRouter, usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface IProps {
  isScrolled: boolean;
}

export default function HamburgerMenu({ isScrolled }: IProps) {
  const { tPath, locale } = useTranslations();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: "en" | "ja") => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/");
    router.push(newPath);
  };

  const navbarItems = [
    {
      label: tPath("navigation.company"),
      href: "/company",
    },
    {
      label: tPath("navigation.case"),
      href: "/case",
    },
    {
      label: tPath("navigation.technology"),
      href: "/technology",
      children: [
        {
          label: tPath("navigation.design"),
          href: "/technology/design",
        },
        {
          label: tPath("navigation.welding"),
          href: "/technology/welding",
        },
        {
          label: tPath("navigation.machining"),
          href: "/technology/machining",
        },
        {
          label: tPath("navigation.development"),
          href: "/technology/development",
        },
      ],
    },
    {
      label: tPath("navigation.factoryAndQuality"),
      href: "/factory-and-quality",
      children: [
        {
          label: tPath("navigation.equipment"),
          href: "/factory-and-quality/equipment",
        },
        {
          label: tPath("navigation.quality"),
          href: "/factory-and-quality/quality",
        },
      ],
    },
    {
      label: tPath("navigation.news"),
      href: "/news",
    },
    {
      label: tPath("navigation.recruit"),
      href: "/recruit",
      leftIcon: (
        <button
          onClick={() => {
            navigator.clipboard.writeText("090-1234-5678");
          }}
          className="text-web-main"
        >
          <Copy />
        </button>
      ),
    },
  ];
  return (
    <Sheet>
      <SheetTrigger
        className={cn("text-web-main md:text-white", {
          "text-web-main md:text-black": isScrolled,
        })}
      >
        <Hamburger />
      </SheetTrigger>
      <SheetTitle className="hidden" />
      <SheetContent className="bg-web-main px-12 pt-[102px] pb-[46px] border-l-0 z-[9999999999] text-white w-[303px] flex flex-col justify-between">
        <div className="space-y-4">
          {navbarItems.map((item) =>
            item.children ? (
              <Accordion type="single" collapsible key={item.label}>
                <AccordionItem value="item-1">
                  <Link href={item.href}>
                    <AccordionTrigger className="text-white text-sm font-bold tracking-[-0.015em] py-0">
                      {item.label}
                    </AccordionTrigger>
                  </Link>
                  <AccordionContent className="space-y-4 px-4 text-white pt-4">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="text-white block text-sm font-bold tracking-[-0.015em] hover:opacity-30"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
              <div key={item.label}>
                <Link
                  href={item.href}
                  className="text-white text-sm font-bold tracking-[-0.015em] hover:opacity-30"
                >
                  {item.label}
                </Link>
              </div>
            )
          )}
        </div>

        <div className="flex flex-col items-center gap-[62px]">
          <Button
            onClick={() => router.push("/contact")}
            className="bg-white text-web-main hover:bg-white/80"
          >
            {tPath("common.contact")}
          </Button>
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex shrink-0 items-center gap-[6px] text-sm -tracking-[1.5%] text-white font-bold">
                  <Globe className="size-6" />
                  <p className="shrink-0">
                    {locale === "ja" ? "日本語" : "EN"}
                  </p>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="z-[9999999999999]">
                <DropdownMenuItem
                  onClick={() => handleLanguageChange("en")}
                  className={cn(
                    locale === "en" && "bg-web-main/10 text-web-main"
                  )}
                >
                  English
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleLanguageChange("ja")}
                  className={cn(
                    locale === "ja" && "bg-web-main/10 text-web-main"
                  )}
                >
                  日本語
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
