import Home from "@/modules/home/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "株式会社ヨシダ | 製缶・溶接・機械加工のプロフェッショナル",
  description:
    "株式会社ヨシダは茨城県水戸市を拠点とする製缶・溶接・機械加工のプロフェッショナル企業です。設計から製造まで一貫したサービスで、お客様のニーズにお応えします。",
  keywords: "製缶,溶接,機械加工,設計,製造,茨城県,水戸市,ヨシダ,工場,品質保証",
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
    url: "https://yoshida-co.vercel.app/",
    siteName: "株式会社ヨシダ",
    title: "株式会社ヨシダ | 製缶・溶接・機械加工のプロフェッショナル",
    description:
      "株式会社ヨシダは茨城県水戸市を拠点とする製缶・溶接・機械加工のプロフェッショナル企業です。設計から製造まで一貫したサービスで、お客様のニーズにお応えします。",
    images: [
      {
        url: "https://yoshida-co.vercel.app/images/top/top-01.webp",
        width: 1200,
        height: 630,
        alt: "株式会社ヨシダ - 製缶・溶接・機械加工のプロフェッショナル",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "株式会社ヨシダ | 製缶・溶接・機械加工のプロフェッショナル",
    description:
      "株式会社ヨシダは茨城県水戸市を拠点とする製缶・溶接・機械加工のプロフェッショナル企業です。設計から製造まで一貫したサービスで、お客様のニーズにお応えします。",
    images: ["https://yoshida-co.vercel.app/images/top/top-01.webp"],
  },
  alternates: {
    canonical: "https://yoshida-co.vercel.app/",
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function HomePage() {
  return <Home />;
}
