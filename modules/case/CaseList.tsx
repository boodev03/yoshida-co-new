"use client";

import { useGetCasesWithPagePagination } from "@/hooks/useGetCases";
import { useState } from "react";
import CaseItem from "./CaseItem";
import Pagination from "@/components/Pagination";
import { useTranslations } from "@/providers/translation-provider";

const ITEMS_PER_PAGE = 9; // Show 9 items per page (3x3 grid)

export default function CaseList() {
  const { case: caseTranslations, locale } = useTranslations();
  const [currentPage, setCurrentPage] = useState(1);
  const [estimatedTotalPages, setEstimatedTotalPages] = useState(1);
  const { data, isLoading, error } = useGetCasesWithPagePagination(
    currentPage,
    ITEMS_PER_PAGE,
    locale
  );

  // Update estimated total pages based on current data
  if (data && data.hasMore && currentPage >= estimatedTotalPages) {
    setEstimatedTotalPages(currentPage + 1);
  }

  if (isLoading) {
    return (
      <div className="space-y-16 px-6 sm:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12">
          {Array.from({ length: 9 }).map((_, index) => (
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
        <div className="text-center text-red-500">
          {caseTranslations.list.error}
        </div>
      </div>
    );
  }

  const cases = data?.cases || [];
  const hasMore = data?.hasMore || false;

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1) {
      setCurrentPage(pageNumber);
      // Smooth scroll to top for better UX
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Transform case data to match CaseItem props
  const transformedItems = cases.map((caseItem) => ({
    image: caseItem.thumbnail,
    category: caseItem.category,
    title: caseItem.title,
    shortDesc: caseItem.cardDescription,
    date: caseItem.createdAt
      ? new Date(caseItem.createdAt).toLocaleDateString(locale === "ja" ? "ja-JP" : "en-US")
      : "",
    href: `/${locale}/case/${caseItem.id}`,
  }));

  return (
    <div className="space-y-16 px-6 sm:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12">
        {transformedItems.map((item, index) => (
          <CaseItem key={`${item.href}-${index}`} {...item} index={index} />
        ))}
      </div>

      {/* Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalPages={estimatedTotalPages}
        onPageChange={handlePageChange}
        hasNextPage={hasMore}
        className="mt-16"
      />
    </div>
  );
}
