import Design from "@/modules/corporate/design/Design";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "設計 | 株式会社ヨシダ | 製造過程を理解した設計・ヒアリングから製造までシームレスに対応",
  description:
    "機械・電気・制御設計から耐震解析までをワンストップで対応。設計者自らが工場へ足を運び、製造部門と打合せや進捗確認を行うことで、お客様の要求を最大限実現できる体制を整えています。",
  keywords:
    "設計,機械設計,電気設計,制御設計,耐震解析,概念設計,製作設計,FEM解析,株式会社ヨシダ,茨城県,水戸市",
  authors: [{ name: "株式会社ヨシダ" }],
  creator: "株式会社ヨシダ",
  publisher: "株式会社ヨシダ",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://yoshida-co.vercel.app/technology/design",
    siteName: "株式会社ヨシダ",
    title:
      "設計 | 株式会社ヨシダ | 製造過程を理解した設計・ヒアリングから製造までシームレスに対応",
    description:
      "機械・電気・制御設計から耐震解析までをワンストップで対応。設計者自らが工場へ足を運び、製造部門と打合せや進捗確認を行うことで、お客様の要求を最大限実現できる体制を整えています。",
    images: [
      {
        url: "https://yoshida-co.vercel.app/images/design/banner.webp",
        width: 1200,
        height: 630,
        alt: "株式会社ヨシダ - 設計",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "設計 | 株式会社ヨシダ | 製造過程を理解した設計・ヒアリングから製造までシームレスに対応",
    description:
      "機械・電気・制御設計から耐震解析までをワンストップで対応。設計者自らが工場へ足を運び、製造部門と打合せや進捗確認を行うことで、お客様の要求を最大限実現できる体制を整えています。",
    images: ["https://yoshida-co.vercel.app/images/design/banner.webp"],
  },
  alternates: {
    canonical: "https://yoshida-co.vercel.app/technology/design",
  },
};

export default function DesignPage() {
  return <Design />;
}
