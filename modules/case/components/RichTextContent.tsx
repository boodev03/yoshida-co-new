"use client";

import { RichTextData } from "@/hooks/useGetCases";

interface RichTextContentProps {
  data: RichTextData;
}

export default function RichTextContent({ data }: RichTextContentProps) {
  const { content } = data;

  return (
    <div className="container mx-auto my-8 md:my-16">
      <div
        className="prose prose-lg max-w-none text-jp-p2 text-web-dark"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
