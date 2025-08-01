"use client";

import { Copy } from "./icons/Copy";
import NavbarItem from "./NavbarItem";
import { useTranslations } from "@/providers/translation-provider";

export default function Navbar() {
  const { tPath } = useTranslations();

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
    <nav className="flex items-center h-full">
      {navbarItems.map((item) => (
        <NavbarItem key={item.label} {...item} />
      ))}
    </nav>
  );
}
