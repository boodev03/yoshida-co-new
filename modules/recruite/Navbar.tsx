"use client";

import NavbarItem from "@/components/NavbarItem";
import { cn } from "@/lib/utils";
import { useTranslations } from "@/providers/translation-provider";

interface IProps {
  isWhite?: boolean;
  className?: string;
}

export default function Navbar({ isWhite, className }: IProps) {
  const { dict } = useTranslations();
  const navbarItems = dict.recruit.navbar.items;

  return (
    <nav className={cn("flex items-center gap-4 h-full", className)}>
      {navbarItems.map((item) => (
        <NavbarItem
          isWhite={isWhite}
          key={item.label}
          {...item}
          textClassName="text-web-main"
        />
      ))}
    </nav>
  );
}
