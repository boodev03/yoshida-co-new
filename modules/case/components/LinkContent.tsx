"use client";

import { useTranslations } from "@/providers/translation-provider";

interface LinkItem {
  id: string;
  text: string;
  url: string;
}

interface LinkList {
  id: string;
  type: "bullet" | "numbered";
  items: LinkItem[];
}

interface LinksData {
  linkLists: LinkList[];
}

interface LinkContentProps {
  data: LinksData;
}

export default function LinkContent({ data }: LinkContentProps) {
  const { case: caseTranslations } = useTranslations();
  const { linkLists } = data;

  return (
    <div className="container mx-auto my-8 md:my-16">
      <div className="space-y-6">
        <p className="text-jp-p2 font-normal text-[#0094FF] underline whitespace-pre-wrap">
          {caseTranslations.detail.links.title}
        </p>

        {linkLists.map((linkList) => (
          <div key={linkList.id} className="space-y-2">
            {linkList.type === "bullet" ? (
              <ul className="list-disc list-inside pl-2 space-y-1">
                {linkList.items.map((item) => (
                  <li
                    key={item.id}
                    className="text-jp-p2 font-normal text-web-dark"
                  >
                    <a
                      href={item.url}
                      className="text-web-dark hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <ol className="list-decimal list-inside pl-2 space-y-1">
                {linkList.items.map((item) => (
                  <li
                    key={item.id}
                    className="text-jp-p2 font-normal text-web-dark"
                  >
                    <a
                      href={item.url}
                      className="text-web-dark hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ol>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
