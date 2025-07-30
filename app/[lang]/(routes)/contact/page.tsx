import Contact from "@/modules/contact/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "お問い合わせ | 株式会社ヨシダ | 製缶・溶接・機械加工のプロフェッショナル",
  description:
    "株式会社ヨシダへのお問い合わせフォームです。製缶・溶接・機械加工に関するご相談、お見積りのご依頼など、お気軽にお問い合わせください。",
  keywords: "お問い合わせ,相談,見積,製缶,溶接,機械加工,株式会社ヨシダ,茨城県,水戸市",
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
    url: "https://yoshida-co.vercel.app/contact",
    siteName: "株式会社ヨシダ",
    title: "お問い合わせ | 株式会社ヨシダ | 製缶・溶接・機械加工のプロフェッショナル",
    description:
      "株式会社ヨシダへのお問い合わせフォームです。製缶・溶接・機械加工に関するご相談、お見積りのご依頼など、お気軽にお問い合わせください。",
    images: [
      {
        url: "https://yoshida-co.vercel.app/images/contact/banner.webp",
        width: 1200,
        height: 630,
        alt: "株式会社ヨシダ - お問い合わせ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "お問い合わせ | 株式会社ヨシダ | 製缶・溶接・機械加工のプロフェッショナル",
    description:
      "株式会社ヨシダへのお問い合わせフォームです。製缶・溶接・機械加工に関するご相談、お見積りのご依頼など、お気軽にお問い合わせください。",
    images: ["https://yoshida-co.vercel.app/images/contact/banner.webp"],
  },
  alternates: {
    canonical: "https://yoshida-co.vercel.app/contact",
  },
};

export default function ContactPage() {
  return <Contact />;
}
