import Case from "@/modules/case/Case";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "実例紹介 | 株式会社ヨシダ | 製缶・溶接・機械加工のプロフェッショナル",
  description:
    "株式会社ヨシダの実例紹介をご覧ください。製缶・溶接・機械加工の豊富な実績と技術力を具体的な事例でご紹介します。設計から製造まで一貫したサービスの成果をご確認いただけます。",
  keywords:
    "実例紹介,事例,実績,製缶,溶接,機械加工,設計,製造,株式会社ヨシダ,茨城県,水戸市",
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
    url: "https://yoshida-co.vercel.app/case",
    siteName: "株式会社ヨシダ",
    title:
      "実例紹介 | 株式会社ヨシダ | 製缶・溶接・機械加工のプロフェッショナル",
    description:
      "株式会社ヨシダの実例紹介をご覧ください。製缶・溶接・機械加工の豊富な実績と技術力を具体的な事例でご紹介します。設計から製造まで一貫したサービスの成果をご確認いただけます。",
    images: [
      {
        url: "https://yoshida-co.vercel.app/images/case/banner.webp",
        width: 1200,
        height: 630,
        alt: "株式会社ヨシダ - 実例紹介",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "実例紹介 | 株式会社ヨシダ | 製缶・溶接・機械加工のプロフェッショナル",
    description:
      "株式会社ヨシダの実例紹介をご覧ください。製缶・溶接・機械加工の豊富な実績と技術力を具体的な事例でご紹介します。設計から製造まで一貫したサービスの成果をご確認いただけます。",
    images: ["https://yoshida-co.vercel.app/images/case/banner.webp"],
  },
  alternates: {
    canonical: "https://yoshida-co.vercel.app/case",
  },
};

export default function CasePage() {
  return <Case />;
}
