import Corporate from "@/modules/corporate/Corporate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "会社概要 | 株式会社ヨシダ | 製缶・溶接・機械加工のプロフェッショナル",
  description:
    "株式会社ヨシダの会社概要をご紹介します。企業理念、沿革、資格・認証、アクセス情報など、弊社の基本情報をご確認いただけます。",
  keywords: "会社概要,企業理念,沿革,資格,認証,アクセス,株式会社ヨシダ,茨城県,水戸市,製缶,溶接,機械加工",
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
    url: "https://yoshida-co.vercel.app/company",
    siteName: "株式会社ヨシダ",
    title: "会社概要 | 株式会社ヨシダ | 製缶・溶接・機械加工のプロフェッショナル",
    description:
      "株式会社ヨシダの会社概要をご紹介します。企業理念、沿革、資格・認証、アクセス情報など、弊社の基本情報をご確認いただけます。",
    images: [
      {
        url: "https://yoshida-co.vercel.app/images/company/banner.webp",
        width: 1200,
        height: 630,
        alt: "株式会社ヨシダ - 会社概要",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "会社概要 | 株式会社ヨシダ | 製缶・溶接・機械加工のプロフェッショナル",
    description:
      "株式会社ヨシダの会社概要をご紹介します。企業理念、沿革、資格・認証、アクセス情報など、弊社の基本情報をご確認いただけます。",
    images: ["https://yoshida-co.vercel.app/images/company/banner.webp"],
  },
  alternates: {
    canonical: "https://yoshida-co.vercel.app/company",
  },
};

export default async function CorporatePage() {
  return <Corporate />;
}
