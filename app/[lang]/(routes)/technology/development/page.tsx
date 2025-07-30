import RaD from "@/modules/corporate/rad/RaD";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "研究開発 | 株式会社ヨシダ | FROM DECOMMISSIONING TO SPACE（廃炉から宇宙まで）",
  description:
    "『FROM DECOMMISSIONING TO SPACE（廃炉から宇宙まで）』のテーマのもと、大学や研究機関、ベンチャー企業とさまざまな共同研究を実施。ロボットアーム遠隔操作型次世代グローブボックスや有機溶媒の水分分離プロセスなど、革新的な技術開発に取り組んでいます。",
  keywords:
    "研究開発,R&D,グローブボックス,ロボットアーム,遠隔操作,有機溶媒,水分分離,廃炉,宇宙,共同研究,株式会社ヨシダ,茨城県,水戸市",
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
    url: "https://yoshida-co.vercel.app/technology/development",
    siteName: "株式会社ヨシダ",
    title:
      "研究開発 | 株式会社ヨシダ | FROM DECOMMISSIONING TO SPACE（廃炉から宇宙まで）",
    description:
      "『FROM DECOMMISSIONING TO SPACE（廃炉から宇宙まで）』のテーマのもと、大学や研究機関、ベンチャー企業とさまざまな共同研究を実施。ロボットアーム遠隔操作型次世代グローブボックスや有機溶媒の水分分離プロセスなど、革新的な技術開発に取り組んでいます。",
    images: [
      {
        url: "https://yoshida-co.vercel.app/images/RandD/banner.webp",
        width: 1200,
        height: 630,
        alt: "株式会社ヨシダ - 研究開発",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "研究開発 | 株式会社ヨシダ | FROM DECOMMISSIONING TO SPACE（廃炉から宇宙まで）",
    description:
      "『FROM DECOMMISSIONING TO SPACE（廃炉から宇宙まで）』のテーマのもと、大学や研究機関、ベンチャー企業とさまざまな共同研究を実施。ロボットアーム遠隔操作型次世代グローブボックスや有機溶媒の水分分離プロセスなど、革新的な技術開発に取り組んでいます。",
    images: ["https://yoshida-co.vercel.app/images/RandD/banner.webp"],
  },
  alternates: {
    canonical: "https://yoshida-co.vercel.app/technology/development",
  },
};

export default function RaDPage() {
  return <RaD />;
}
