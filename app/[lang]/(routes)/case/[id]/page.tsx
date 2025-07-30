import CaseDetail from "@/modules/case/CaseDetail";
import { getCaseById, getCaseSEOData } from "@/services/product";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface CaseDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: CaseDetailPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const seoData = await getCaseSEOData(id);

    if (!seoData) {
      return {
        title: "Case Not Found",
        description: "The requested case could not be found.",
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
      title: "Case Detail",
      description: "View case details",
    };
  }
}

export default async function CaseDetailPage({ params }: CaseDetailPageProps) {
  const { id } = await params;

  // Verify the case exists
  const caseData = await getCaseById(id);

  if (!caseData) {
    notFound();
  }

  return <CaseDetail caseId={id} />;
}
