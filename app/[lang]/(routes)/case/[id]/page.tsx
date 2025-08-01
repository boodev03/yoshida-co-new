import CaseDetail from "@/modules/case/CaseDetail";
import { getCaseByIdServer, getCaseSEODataServer } from "@/lib/cloudflare-d1-server";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface CaseDetailPageProps {
  params: Promise<{
    lang: "en" | "ja";
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: CaseDetailPageProps): Promise<Metadata> {
  const { lang, id } = await params;

  try {
    const seoData = await getCaseSEODataServer(id, lang);

    if (!seoData) {
      return {
        title: lang === "ja" ? "ケースが見つかりません" : "Case Not Found",
        description: lang === "ja" 
          ? "リクエストされたケースが見つかりませんでした。" 
          : "The requested case could not be found.",
      };
    }

    return {
      title: seoData.metaTitle,
      description: seoData.metaDescription,
      keywords: seoData.metaKeywords,
      openGraph: {
        title: seoData.metaTitle,
        description: seoData.metaDescription,
        images: [
          {
            url: seoData.ogImage,
            width: 1200,
            height: 630,
            alt: seoData.metaTitle,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: seoData.metaTitle,
        description: seoData.metaDescription,
        images: [seoData.ogImage],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: lang === "ja" ? "ケース詳細" : "Case Detail",
      description: lang === "ja" ? "ケース詳細を表示" : "View case details",
    };
  }
}

export default async function CaseDetailPage({ params }: CaseDetailPageProps) {
  const { lang, id } = await params;

  // Verify the case exists
  const caseData = await getCaseByIdServer(id, lang);

  if (!caseData) {
    notFound();
  }

  return <CaseDetail caseId={id} />;
}
