"use client";

import { NormalContentData } from "@/hooks/useGetCases";
import Image from "next/image";

interface NormalContentProps {
  data: NormalContentData;
}

export default function NormalContent({ data }: NormalContentProps) {
  const { content, imageUrl, imageAlt, imagePosition = "left" } = data;

  // Function to render content with custom styling for links
  const renderContent = (text: string) => {
    return (
      <div className="mx-auto my-6 md:my-8 space-y-4">
        <div
          className="text-jp-p2 whitespace-pre-line text-web-dark font-normal [&_a]:text-[#0094FF]"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>
    );
  };

  if (!imageUrl) {
    // Text only content
    return <div className="container mx-auto">{renderContent(content)}</div>;
  }

  // Content with image
  return (
    <div className="container mx-auto mt-12 md:mt-20">
      <div className="flex flex-col md:flex-row md:items-center gap-8">
        {imagePosition === "left" ? (
          <>
            <div className="aspect-video relative md:w-1/2">
              <Image src={imageUrl} alt={imageAlt || ""} fill />
            </div>
            <div className="md:w-1/2">{renderContent(content)}</div>
          </>
        ) : (
          <>
            <div className="md:w-1/2">{renderContent(content)}</div>
            <div className="aspect-video relative md:w-1/2">
              <Image src={imageUrl} alt={imageAlt || ""} fill />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
