"use client";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/providers/translation-provider";
import { useBlogContext } from "./BlogContext";

export default function Category() {
  const { news } = useTranslations();
  const { categories } = news;
  const categoryList = [categories.all, categories.announcement, categories.development];
  const { activeCategory, setActiveCategory } = useBlogContext();

  return (
    <div className="flex gap-4 md:gap-8 items-center flex-wrap">
      {categoryList.map((item) => (
        <Button
          className={`min-w-[160px] ${
            activeCategory === item
              ? "hover:bg-web-main hover:text-white"
              : "bg-white border border-web-main text-web-main hover:opacity-30"
          }`}
          key={item}
          onClick={() => setActiveCategory(item)}
        >
          {item}
        </Button>
      ))}
    </div>
  );
}
