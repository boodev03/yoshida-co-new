"use client";

import { useRouter } from "next/navigation";
import { useGetCaseById } from "@/hooks/useGetCaseById";
import { ContentSection } from "@/hooks/useGetCases";
import {
  CaseHeader,
  NormalContent,
  GalleryContent,
  TextContent,
  VideoContent,
  RichTextContent,
  CaseNavigation,
} from "./components";
import LinkContent from "./components/LinkContent";
import { useTranslations } from "@/providers/translation-provider";

interface CaseDetailProps {
  caseId: string;
}

export default function CaseDetail({ caseId }: CaseDetailProps) {
  const { case: caseTranslations } = useTranslations();
  const router = useRouter();
  const { data: caseData, isLoading, error } = useGetCaseById(caseId);

  const onBack = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-web-main mx-auto mb-4"></div>
          <p className="text-jp-p2 text-web-dark">{caseTranslations.detail.loading}</p>
        </div>
      </div>
    );
  }

  if (error || !caseData) {
    return (
      <section className="pt-[82px] mlg:pt-[90px]">
        <div className="container mx-auto flex justify-center items-center min-h-[400px]">
          <p className="text-jp-p2 text-web-dark">
            {caseTranslations.detail.notFound}
          </p>
        </div>
      </section>
    );
  }

  // Format date
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  };

  const renderContentSection = (section: ContentSection) => {
    switch (section.type) {
      case "normal":
        return <NormalContent key={section.id} data={section.data} />;
      case "gallery":
        return <GalleryContent key={section.id} data={section.data} />;
      case "text-content":
        return <TextContent key={section.id} data={section.data} />;
      case "video":
        return <VideoContent key={section.id} data={section.data} />;
      case "rich-text":
        return <RichTextContent key={section.id} data={section.data} />;
      case "links":
        return <LinkContent key={section.id} data={section.data} />;
      default:
        return null;
    }
  };

  // Sort sections by order
  const sortedSections = [...caseData.sections].sort(
    (a, b) => a.order - b.order
  );

  return (
    <section className="pt-[82px] mlg:pt-[90px]">
      <CaseHeader
        title={caseData.title}
        category={caseData.category}
        date={formatDate(
          caseData.updatedAt || caseData.createdAt || Date.now()
        )}
      />

      {/* Render dynamic content sections */}
      {sortedSections.map((section) => renderContentSection(section))}

      <CaseNavigation onBack={onBack} />
    </section>
  );
}
