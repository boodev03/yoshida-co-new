"use client";

import Image from "next/image";
import { TextContentData } from "@/hooks/useGetCases";
import parse from "html-react-parser";

interface TextContentProps {
  data: TextContentData;
}

export default function TextContent({ data }: TextContentProps) {
  const {
    title,
    content,
    titleType = "h2",
    image,
    imagePosition,
    imageCaption,
  } = data;

  const TitleComponent =
    titleType === "h1" ? "h1" : titleType === "h3" ? "h3" : "h2";
  const titleClass =
    titleType === "h1"
      ? "text-jp-h1 text-web-dark font-bold"
      : titleType === "h3"
      ? "text-jp-h3 font-bold text-web-dark"
      : "text-jp-h2 text-web-dark";

  if (!image) {
    // Text only with title
    return (
      <div className="container mx-auto space-y-4 md:space-y-8 my-8 md:my-16">
        <TitleComponent className={titleClass}>{title}</TitleComponent>
        <div className="text-jp-p2 font-normal text-web-dark whitespace-pre-wrap">
          {parse(content)}
        </div>
      </div>
    );
  }

  // Text with image
  return (
    <div className="container mx-auto my-8 md:my-16">
      <div className="flex flex-col md:flex-row md:items-center gap-8">
        {imagePosition === "right" ? (
          <>
            <div className="space-y-4 md:space-y-6 flex-1">
              <TitleComponent className={titleClass}>{title}</TitleComponent>
              <div className="text-jp-p2 font-normal text-web-dark whitespace-pre-wrap">
                {parse(content)}
              </div>
            </div>
            <div className="space-y-2 flex-1">
              <div className="aspect-video relative">
                <Image src={image.src} alt={image.alt} fill />
              </div>
              <p className="text-jp-p2 text-web-dark font-normal">
                {imageCaption}
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="space-y-2 flex-1">
              <div className="aspect-video relative">
                <Image src={image.src} alt={image.alt} fill />
              </div>
              <p className="text-jp-p2 text-web-dark font-normal">
                {imageCaption}
              </p>
            </div>
            <div className="space-y-4 md:space-y-6 flex-1">
              <TitleComponent className={titleClass}>{title}</TitleComponent>
              <div className="text-jp-p2 font-normal text-web-dark whitespace-pre-wrap">
                {parse(content)}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
