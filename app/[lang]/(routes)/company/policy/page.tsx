import Policy from "@/modules/corporate/policy/Policy";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー | 株式会社ヨシダ",
  description:
    "株式会社ヨシダのプライバシーポリシーをご確認いただけます。個人情報の取り扱いに関する基本方針や利用目的、第三者提供について詳しく説明しています。",
  keywords: "プライバシーポリシー,個人情報保護,個人情報取扱,株式会社ヨシダ",
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
    url: "https://yoshida-co.vercel.app/company/policy",
    siteName: "株式会社ヨシダ",
    title: "プライバシーポリシー | 株式会社ヨシダ",
    description:
      "株式会社ヨシダのプライバシーポリシーをご確認いただけます。個人情報の取り扱いに関する基本方針や利用目的、第三者提供について詳しく説明しています。",
  },
  twitter: {
    card: "summary",
    title: "プライバシーポリシー | 株式会社ヨシダ",
    description:
      "株式会社ヨシダのプライバシーポリシーをご確認いただけます。個人情報の取り扱いに関する基本方針や利用目的、第三者提供について詳しく説明しています。",
  },
  alternates: {
    canonical: "https://yoshida-co.vercel.app/company/policy",
  },
};

export default function PolicyPage() {
  return <Policy />;
}
