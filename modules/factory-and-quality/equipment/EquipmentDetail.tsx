"use client";

import { useRouter } from "next/navigation";
import { useGetEquipmentById } from "@/hooks/useGetEquipments";
import { ContentSection } from "@/hooks/useGetCases";
import {
  CaseHeader,
  NormalContent,
  GalleryContent,
  TextContent,
  VideoContent,
  RichTextContent,
  CaseNavigation,
} from "../../case/components";
import LinkContent from "../../case/components/LinkContent";
import { useTranslations } from "@/providers/translation-provider";

interface EquipmentDetailProps {
  equipmentId: string;
}

export default function EquipmentDetail({ equipmentId }: EquipmentDetailProps) {
  const { equipment: equipmentTranslations, locale } = useTranslations();
  const router = useRouter();
  const {
    data: equipmentData,
    isLoading,
    error,
  } = useGetEquipmentById(equipmentId, locale);

  const onBack = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-web-main mx-auto mb-4"></div>
          <p className="text-jp-p2 text-web-dark">{"Loading..."}</p>
        </div>
      </div>
    );
  }

  if (error || !equipmentData) {
    return (
      <section className="pt-[82px] mlg:pt-[90px]">
        <div className="container mx-auto flex justify-center items-center min-h-[400px]">
          <p className="text-jp-p2 text-web-dark">{"Equipment not found"}</p>
        </div>
      </section>
    );
  }

  // Format date based on locale
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    if (locale === "ja") {
      return `${date.getFullYear()}年${
        date.getMonth() + 1
      }月${date.getDate()}日`;
    } else {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
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
  const sortedSections = [...equipmentData.sections].sort(
    (a, b) => a.order - b.order
  );

  return (
    <section className="pt-[82px] mlg:pt-[90px] pb-[60px] mlg:pb-[390px]">
      <CaseHeader
        title={equipmentData.title}
        category={equipmentData.category.split(",")[0] || "N/A"}
        date={
          equipmentData.date ||
          formatDate(
            equipmentData.updatedAt || equipmentData.createdAt || Date.now()
          )
        }
      />

      {/* Render dynamic content sections */}
      {sortedSections.map((section) => renderContentSection(section))}

      <CaseNavigation onBack={onBack} />
    </section>
  );
}
