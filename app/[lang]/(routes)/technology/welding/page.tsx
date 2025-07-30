import Welding from "@/modules/corporate/welding/Welding";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "製缶・溶接 | 株式会社ヨシダ | 原子力製品に対応する溶接品質・0.1mm〜150mm厚、ステンレスからチタンまで対応",
  description:
    "製缶・溶接棟には、揚程12m、30tクレーンを付設し、TIG溶接、アーク溶接、プラズマ溶接、ファイバーレーザー溶接、ロボット溶接を配置。日本溶接協会および原子炉等規制法に係る溶接士が在籍し、薄板から厚板、ステンレスからアルミ、インコネル、チタンなど多様な溶接に対応しています。",
  keywords:
    "製缶,溶接,TIG溶接,アーク溶接,プラズマ溶接,ファイバーレーザー溶接,ロボット溶接,30tクレーン,原子力製品,ステンレス,アルミ,インコネル,チタン,株式会社ヨシダ,茨城県,水戸市",
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
    url: "https://yoshida-co.vercel.app/technology/welding",
    siteName: "株式会社ヨシダ",
    title:
      "製缶・溶接 | 株式会社ヨシダ | 原子力製品に対応する溶接品質・0.1mm〜150mm厚、ステンレスからチタンまで対応",
    description:
      "製缶・溶接棟には、揚程12m、30tクレーンを付設し、TIG溶接、アーク溶接、プラズマ溶接、ファイバーレーザー溶接、ロボット溶接を配置。日本溶接協会および原子炉等規制法に係る溶接士が在籍し、薄板から厚板、ステンレスからアルミ、インコネル、チタンなど多様な溶接に対応しています。",
    images: [
      {
        url: "https://yoshida-co.vercel.app/images/welding/banner.webp",
        width: 1200,
        height: 630,
        alt: "株式会社ヨシダ - 製缶・溶接",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "製缶・溶接 | 株式会社ヨシダ | 原子力製品に対応する溶接品質・0.1mm〜150mm厚、ステンレスからチタンまで対応",
    description:
      "製缶・溶接棟には、揚程12m、30tクレーンを付設し、TIG溶接、アーク溶接、プラズマ溶接、ファイバーレーザー溶接、ロボット溶接を配置。日本溶接協会および原子炉等規制法に係る溶接士が在籍し、薄板から厚板、ステンレスからアルミ、インコネル、チタンなど多様な溶接に対応しています。",
    images: ["https://yoshida-co.vercel.app/images/welding/banner.webp"],
  },
  alternates: {
    canonical: "https://yoshida-co.vercel.app/technology/welding",
  },
};

export default function WeldingPage() {
  return <Welding />;
}
