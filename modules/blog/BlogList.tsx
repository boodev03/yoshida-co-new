"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import BlogItem from "./BlogItem";
import { ChevronRight } from "@/components/icons/ChevronRight";
import { useGetNewsWithPagePagination } from "@/hooks/useGetNews";
import { useTranslations } from "@/providers/translation-provider";

const ITEMS_PER_PAGE = 6; // Show 6 items per page

export default function BlogList() {
  const { news: newsTranslations, locale } = useTranslations();
  const [currentPage, setCurrentPage] = useState(1);
  const [estimatedTotalPages, setEstimatedTotalPages] = useState(1);
  const { data, isLoading, error } = useGetNewsWithPagePagination(
    currentPage,
    ITEMS_PER_PAGE,
    locale
  );

  // Update estimated total pages based on current data
  if (data && data.hasMore && currentPage >= estimatedTotalPages) {
    setEstimatedTotalPages(currentPage + 1);
  }

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1) {
      setCurrentPage(pageNumber);
      // Smooth scroll to top for better UX
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < estimatedTotalPages) setCurrentPage((prev) => prev + 1);
  };

  if (isLoading) {
    return (
      <div className="space-y-16 px-6 sm:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 aspect-video rounded-lg mb-4"></div>
              <div className="bg-gray-200 h-4 rounded mb-2"></div>
              <div className="bg-gray-200 h-4 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-16 px-6 sm:px-0">
        <div className="text-center text-red-500">Error loading news</div>
      </div>
    );
  }

  const news = data?.cases || [];
  const hasMore = data?.hasMore || false;

  // Transform news data to match BlogItem props
  const transformedItems = news.map((newsItem) => ({
    image: newsItem.thumbnail,
    category: newsItem.category,
    title: newsItem.title,
    shortDesc: newsItem.cardDescription,
    date: newsItem.createdAt
      ? new Date(newsItem.createdAt).toLocaleDateString(
          locale === "ja" ? "ja-JP" : "en-US"
        )
      : "",
    href: `/${locale}/news/${newsItem.id}`,
  }));

  // Generate page numbers array
  const pageNumbers = [];
  for (let i = 1; i <= estimatedTotalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="space-y-16 px-6 sm:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12">
        {transformedItems.map((blog, index) => (
          <BlogItem key={`${blog.href}-${index}`} {...blog} index={index} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-14">
        <button
          onClick={handlePrevPage}
          className="p-2 text-web-main transition-colors rotate-180 disabled:!cursor-not-allowed"
          disabled={currentPage === 1}
        >
          <ChevronRight />
        </button>

        <div className="flex items-center gap-8">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={cn(
                "w-6 h-auto block relative text-normal transition-all duration-300",
                currentPage === number
                  ? "text-web-dark after:absolute after:-bottom-3 after:left-0 after:w-full after:h-0.5 after:bg-web-main"
                  : "hover:opacity-30"
              )}
            >
              {number}
            </button>
          ))}
        </div>

        {estimatedTotalPages > pageNumbers.length && (
          <span className="px-2">...</span>
        )}

        <button
          onClick={handleNextPage}
          className="p-2 text-web-main transition-colors"
          disabled={currentPage === estimatedTotalPages || !hasMore}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
