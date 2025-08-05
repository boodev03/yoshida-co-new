"use client";

import HeadingSite from "@/components/HeadingSite";
import BlogList from "./BlogList";
import Category from "./Category";
import { useTranslations } from "@/providers/translation-provider";
import { BlogProvider } from "./BlogContext";

export default function Blog() {
  const { news } = useTranslations();
  const { heading, categories } = news;
  return (
    <section className="pt-[82px] mlg:pt-[90px]">
      {/* Decor */}
      <HeadingSite
        title={heading.title}
        subtitle={heading.subtitle}
        imageUrl="/images/news/banner.webp"
        breadcrumbs={[
          { label: heading.breadcrumbs.top },
          { label: heading.breadcrumbs.news },
        ]}
      />

      {/* Main Content */}
      <div className="my-[60px] md:my-[120px] px-0 sm:px-6 container mx-auto space-y-8 md:space-y-20 pb-[60px] mlg:pb-[390px]">
        <BlogProvider initialCategory={categories.all}>
          <Category />
          <BlogList />
        </BlogProvider>
      </div>
    </section>
  );
}
