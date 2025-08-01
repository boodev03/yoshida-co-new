import { Hamburger } from "@/components/icons/Hamburger";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  isScrolled: boolean;
  isWhite?: boolean;
}

const navbarItems = [
  {
    label: "Top",
    href: "/",
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
  return (
    <Sheet>
      <SheetTrigger
        className={cn("text-web-main md:text-white", {
          "text-web-main md:text-black": isScrolled,
          "text-white": isWhite,
        })}
      >
        <Hamburger />
      </SheetTrigger>
      <SheetTitle className="hidden" />
      <SheetContent className="bg-web-main px-12 pt-[102px] pb-[46px] border-l-0 z-[999999] text-white w-[303px] flex flex-col justify-between">
        <div className="space-y-12">
          {navbarItems.map((item) => (
            <div key={item.label}>
              <Link
                href={item.href}
                className="font-shippori-mincho text-white flex justify-center text-sm font-bold tracking-[-0.015em] hover:opacity-30"
              >
                {item.label}
              </Link>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-[62px]">
          <Button className="font-shippori-mincho bg-white hover:border-white text-web-main rounded-[3px] hover:bg-web-main hover:text-white">
            エントリー
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
            <button className="font-shippori-mincho flex shrink-0 items-center gap-[6px] text-sm -tracking-[1.5%] text-white font-bold">
              <Image
                src="/images/global-white.png"
                alt="language"
                width={24}
                height={24}
                className="size-6"
              />
              <p className="shrink-0">日本語</p>
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
