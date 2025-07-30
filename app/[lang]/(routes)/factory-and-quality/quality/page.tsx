import Quality from "@/modules/factory-and-quality/quality/Quality";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "品質管理 | 株式会社ヨシダ | 製缶・溶接・機械加工のプロフェッショナル",
  description:
    "株式会社ヨシダの品質管理体制をご紹介します。徹底した品質管理と検査体制により、お客様に信頼される高品質な製品を提供いたします。",
  keywords: "品質管理,品質保証,検査,認証,ISO,株式会社ヨシダ,茨城県,水戸市,製缶,溶接,機械加工",
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
    url: "https://yoshida-co.vercel.app/factory-and-quality/quality",
    siteName: "株式会社ヨシダ",
    title: "品質管理 | 株式会社ヨシダ | 製缶・溶接・機械加工のプロフェッショナル",
    description:
      "株式会社ヨシダの品質管理体制をご紹介します。徹底した品質管理と検査体制により、お客様に信頼される高品質な製品を提供いたします。",
    images: [
      {
        url: "https://yoshida-co.vercel.app/images/quality/banner.png",
        width: 1200,
        height: 630,
        alt: "株式会社ヨシダ - 品質管理",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "品質管理 | 株式会社ヨシダ | 製缶・溶接・機械加工のプロフェッショナル",
    description:
      "株式会社ヨシダの品質管理体制をご紹介します。徹底した品質管理と検査体制により、お客様に信頼される高品質な製品を提供いたします。",
    images: ["https://yoshida-co.vercel.app/images/quality/banner.png"],
  },
  alternates: {
    canonical: "https://yoshida-co.vercel.app/factory-and-quality/quality",
  },
};

export default function QualityPage() {
  return <Quality />;
}
