import Technology from "@/modules/corporate/technology/Technology";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "ヨシダの技術 | 株式会社ヨシダ | 製缶・溶接・機械加工のプロフェッショナル",
  description:
    "株式会社ヨシダの技術力をご紹介します。遮へい・隔離技術、大型製缶・溶接、機械加工、そして医療・宇宙への展開まで。原子力分野で培った技術を活用し、設計から製造まで一貫したサービスを提供します。",
  keywords:
    "技術,遮へい技術,隔離技術,製缶,溶接,機械加工,設計,製造,原子力,医療,宇宙,株式会社ヨシダ,茨城県,水戸市",
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
    url: "https://yoshida-co.vercel.app/technology",
    siteName: "株式会社ヨシダ",
    title:
      "ヨシダの技術 | 株式会社ヨシダ | 製缶・溶接・機械加工のプロフェッショナル",
    description:
      "株式会社ヨシダの技術力をご紹介します。遮へい・隔離技術、大型製缶・溶接、機械加工、そして医療・宇宙への展開まで。原子力分野で培った技術を活用し、設計から製造まで一貫したサービスを提供します。",
    images: [
      {
        url: "https://yoshida-co.vercel.app/images/technology/banner.webp",
        width: 1200,
        height: 630,
        alt: "株式会社ヨシダ - ヨシダの技術",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "ヨシダの技術 | 株式会社ヨシダ | 製缶・溶接・機械加工のプロフェッショナル",
    description:
      "株式会社ヨシダの技術力をご紹介します。遮へい・隔離技術、大型製缶・溶接、機械加工、そして医療・宇宙への展開まで。原子力分野で培った技術を活用し、設計から製造まで一貫したサービスを提供します。",
    images: ["https://yoshida-co.vercel.app/images/technology/banner.webp"],
  },
  alternates: {
    canonical: "https://yoshida-co.vercel.app/technology",
  },
};

export default function TechnologyPage() {
  return <Technology />;
}
