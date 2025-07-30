import FactoryAndQuality from "@/modules/factory-and-quality/FactoryAndQuality";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "工場・品質 | 株式会社ヨシダ | 製缶・溶接・機械加工のプロフェッショナル",
  description:
    "株式会社ヨシダの工場設備と品質管理体制をご紹介します。最新の設備と徹底した品質管理により、高品質な製品を提供いたします。",
  keywords: "工場,品質管理,設備,品質保証,製造,株式会社ヨシダ,茨城県,水戸市,製缶,溶接,機械加工",
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
    url: "https://yoshida-co.vercel.app/factory-and-quality",
    siteName: "株式会社ヨシダ",
    title: "工場・品質 | 株式会社ヨシダ | 製缶・溶接・機械加工のプロフェッショナル",
    description:
      "株式会社ヨシダの工場設備と品質管理体制をご紹介します。最新の設備と徹底した品質管理により、高品質な製品を提供いたします。",
    images: [
      {
        url: "https://yoshida-co.vercel.app/images/factory/banner.webp",
        width: 1200,
        height: 630,
        alt: "株式会社ヨシダ - 工場・品質",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "工場・品質 | 株式会社ヨシダ | 製缶・溶接・機械加工のプロフェッショナル",
    description:
      "株式会社ヨシダの工場設備と品質管理体制をご紹介します。最新の設備と徹底した品質管理により、高品質な製品を提供いたします。",
    images: ["https://yoshida-co.vercel.app/images/factory/banner.webp"],
  },
  alternates: {
    canonical: "https://yoshida-co.vercel.app/factory-and-quality",
  },
};

export default function page() {
  return <FactoryAndQuality />;
}
