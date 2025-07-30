import BlogDetail from "@/modules/blog/BlogDetail";
import { getCaseById, getCaseSEOData } from "@/services/product";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface BlogDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const seoData = await getCaseSEOData(id);

    if (!seoData) {
      return {
        title: "News Not Found",
        description: "The requested news could not be found.",
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
      title: "News Detail",
      description: "View news details",
    };
  }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { id } = await params;

  // Verify the news exists
  const newsData = await getCaseById(id);

  if (!newsData) {
    notFound();
  }

  return <BlogDetail blogId={id} />;
}
