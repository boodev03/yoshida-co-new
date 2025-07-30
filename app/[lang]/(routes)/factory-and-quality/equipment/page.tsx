import EquipmentWrapper from "@/modules/factory-and-quality/equipment/EquipmentWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "設備紹介 | 株式会社ヨシダ | 製缶・溶接・機械加工のプロフェッショナル",
  description:
    "株式会社ヨシダの設備をご紹介します。最新の製缶・溶接・機械加工設備により、高品質な製品を効率的に製造いたします。",
  keywords: "設備,機械,製缶設備,溶接設備,機械加工設備,株式会社ヨシダ,茨城県,水戸市",
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
    url: "https://yoshida-co.vercel.app/factory-and-quality/equipment",
    siteName: "株式会社ヨシダ",
    title: "設備紹介 | 株式会社ヨシダ | 製缶・溶接・機械加工のプロフェッショナル",
    description:
      "株式会社ヨシダの設備をご紹介します。最新の製缶・溶接・機械加工設備により、高品質な製品を効率的に製造いたします。",
    images: [
      {
        url: "https://yoshida-co.vercel.app/images/equipment/banner.webp",
        width: 1200,
        height: 630,
        alt: "株式会社ヨシダ - 設備紹介",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "設備紹介 | 株式会社ヨシダ | 製缶・溶接・機械加工のプロフェッショナル",
    description:
      "株式会社ヨシダの設備をご紹介します。最新の製缶・溶接・機械加工設備により、高品質な製品を効率的に製造いたします。",
    images: ["https://yoshida-co.vercel.app/images/equipment/banner.webp"],
  },
  alternates: {
    canonical: "https://yoshida-co.vercel.app/factory-and-quality/equipment",
  },
};

export default function EquipmentPage() {
  return <EquipmentWrapper />;
}
