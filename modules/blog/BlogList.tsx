"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import BlogItem from "./BlogItem";
import { ChevronRight } from "@/components/icons/ChevronRight";
import { useGetNews } from "@/hooks/useGetNews";
import { useTranslations } from "@/providers/translation-provider";
import { useBlogContext } from "./BlogContext";

const ITEMS_PER_PAGE = 6; // Show 6 items per page

export default function BlogList() {
  const { news: newsTranslations, locale } = useTranslations();
  const { activeCategory } = useBlogContext();
  const [currentPage, setCurrentPage] = useState(1);
  
  // Fetch all news at once for client-side filtering and pagination
  const { data, isLoading, error } = useGetNews(100, locale); // Fetch more items

  // Reset to page 1 when category changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      // Smooth scroll to top for better UX
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
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

  // Filter news based on active category
  const filteredNews = news.filter((newsItem) => {
    // If "All" is selected, show all items
    if (activeCategory === newsTranslations.categories.all) {
      return true;
    }
    
    // For announcement category, check if category is "news" or "new" (case-insensitive)
    if (activeCategory === newsTranslations.categories.announcement) {
      const categoryLower = newsItem.category.toLowerCase();
      return categoryLower === "news" || categoryLower === "new";
    }
    
    // For development category, match exactly
    if (activeCategory === newsTranslations.categories.development) {
      return newsItem.category.toLowerCase() === "development";
    }
    
    return false;
  });

  // Calculate pagination for filtered results
  const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedNews = filteredNews.slice(startIndex, endIndex);

  // Transform paginated news data to match BlogItem props
  const transformedItems = paginatedNews.map((newsItem) => ({
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
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="space-y-16 px-6 sm:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12">
        {transformedItems.map((blog, index) => (
          <BlogItem key={`${blog.href}-${index}`} {...blog} index={index} />
        ))}
      </div>

      {/* Pagination - only show if there are multiple pages */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-14">
          <button
            onClick={handlePrevPage}
            className={cn(
              "p-2 text-web-main transition-colors rotate-180",
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:opacity-70"
            )}
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

          <button
            onClick={handleNextPage}
            className={cn(
              "p-2 text-web-main transition-colors",
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:opacity-70"
            )}
            disabled={currentPage === totalPages}
          >
            <ChevronRight />
          </button>
        </div>
      )}

      {/* Show message when no items found */}
      {filteredNews.length === 0 && !isLoading && (
        <div className="text-center text-gray-500 py-12">
          {newsTranslations.noItemsFound || "No articles found for this category."}
        </div>
      )}
    </div>
  );
}
