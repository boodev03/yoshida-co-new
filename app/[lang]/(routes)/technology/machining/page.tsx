import Machining from "@/modules/corporate/machining/Machining";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "機械加工 | 株式会社ヨシダ | 大型ワークの一貫体制・30tクレーン × 機械加工ライン",
  description:
    "機械加工棟には、揚程12m、30tクレーンを付設。5軸加工機、門型5面加工機、横中ぐりフライス盤、立旋盤（φ2.5m）、長尺旋盤などを配置。大型品の機械加工から溶接品の加工まで、高精度かつ短納期を実現します。",
  keywords:
    "機械加工,5軸加工機,門型5面加工機,横中ぐりフライス盤,立旋盤,長尺旋盤,30tクレーン,大型品加工,溶接品加工,高精度加工,株式会社ヨシダ,茨城県,水戸市",
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
    url: "https://yoshida-co.vercel.app/technology/machining",
    siteName: "株式会社ヨシダ",
    title:
      "機械加工 | 株式会社ヨシダ | 大型ワークの一貫体制・30tクレーン × 機械加工ライン",
    description:
      "機械加工棟には、揚程12m、30tクレーンを付設。5軸加工機、門型5面加工機、横中ぐりフライス盤、立旋盤（φ2.5m）、長尺旋盤などを配置。大型品の機械加工から溶接品の加工まで、高精度かつ短納期を実現します。",
    images: [
      {
        url: "https://yoshida-co.vercel.app/images/machining/banner.webp",
        width: 1200,
        height: 630,
        alt: "株式会社ヨシダ - 機械加工",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "機械加工 | 株式会社ヨシダ | 大型ワークの一貫体制・30tクレーン × 機械加工ライン",
    description:
      "機械加工棟には、揚程12m、30tクレーンを付設。5軸加工機、門型5面加工機、横中ぐりフライス盤、立旋盤（φ2.5m）、長尺旋盤などを配置。大型品の機械加工から溶接品の加工まで、高精度かつ短納期を実現します。",
    images: ["https://yoshida-co.vercel.app/images/machining/banner.webp"],
  },
  alternates: {
    canonical: "https://yoshida-co.vercel.app/technology/machining",
  },
};

export default function MachiningPage() {
  return <Machining />;
}
