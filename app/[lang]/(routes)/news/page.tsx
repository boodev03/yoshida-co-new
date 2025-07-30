import Blog from "@/modules/blog/Blog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "新着情報 | 株式会社ヨシダ | 製缶・溶接・機械加工のプロフェッショナル",
  description:
    "株式会社ヨシダの新着情報・お知らせをご覧いただけます。研究開発の最新情報、企業の取り組み、技術革新など、弊社の最新動向をお届けします。",
  keywords:
    "新着情報,お知らせ,研究開発,技術革新,企業情報,株式会社ヨシダ,茨城県,水戸市,製缶,溶接,機械加工",
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
    url: "https://yoshida-co.vercel.app/news",
    siteName: "株式会社ヨシダ",
    title:
      "新着情報 | 株式会社ヨシダ | 製缶・溶接・機械加工のプロフェッショナル",
    description:
      "株式会社ヨシダの新着情報・お知らせをご覧いただけます。研究開発の最新情報、企業の取り組み、技術革新など、弊社の最新動向をお届けします。",
    images: [
      {
        url: "https://yoshida-co.vercel.app/images/achivement.png",
        width: 1200,
        height: 630,
        alt: "株式会社ヨシダ - 新着情報",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "新着情報 | 株式会社ヨシダ | 製缶・溶接・機械加工のプロフェッショナル",
    description:
      "株式会社ヨシダの新着情報・お知らせをご覧いただけます。研究開発の最新情報、企業の取り組み、技術革新など、弊社の最新動向をお届けします。",
    images: ["https://yoshida-co.vercel.app/images/achivement.png"],
  },
  alternates: {
    canonical: "https://yoshida-co.vercel.app/news",
  },
};

export default function NewsPage() {
  return <Blog />;
}
