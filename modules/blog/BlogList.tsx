"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import BlogItem from "./BlogItem";
import { ChevronRight } from "@/components/icons/ChevronRight";

const blogList = [
  {
    image: "/images/news-1.png",
    category: "お知らせ",
    title: "タイトル",
    shortDesc:
      "11月3日に弊社社員 小泉英雄が秋の褒章『黄綬褒章』を受章いたしました。 これもひとえに、皆様方のご指導の賜物と改めて感謝申し上げる次第です。 11月26... ",
    date: "2025/01/01",
    href: "/",
  },
  {
    image: "/images/news-1.png",
    category: "お知らせ",
    title: "タイトル",
    shortDesc:
      "11月3日に弊社社員 小泉英雄が秋の褒章『黄綬褒章』を受章いたしました。 これもひとえに、皆様方のご指導の賜物と改めて感謝申し上げる次第です。 11月26... ",
    date: "2025/01/01",
    href: "/blog/2",
  },
  {
    image: "/images/news-1.png",
    category: "お知らせ",
    title: "タイトル",
    shortDesc:
      "11月3日に弊社社員 小泉英雄が秋の褒章『黄綬褒章』を受章いたしました。 これもひとえに、皆様方のご指導の賜物と改めて感謝申し上げる次第です。 11月26... ",
    date: "2025/01/01",
    href: "/blog/3",
  },
  {
    image: "/images/news-1.png",
    category: "お知らせ",
    title: "タイトル",
    shortDesc:
      "11月3日に弊社社員 小泉英雄が秋の褒章『黄綬褒章』を受章いたしました。 これもひとえに、皆様方のご指導の賜物と改めて感謝申し上げる次第です。 11月26... ",
    date: "2025/01/01",
    href: "/blog/4",
  },
  {
    image: "/images/news-1.png",
    category: "お知らせ",
    title: "タイトル",
    shortDesc:
      "11月3日に弊社社員 小泉英雄が秋の褒章『黄綬褒章』を受章いたしました。 これもひとえに、皆様方のご指導の賜物と改めて感謝申し上げる次第です。 11月26... ",
    date: "2025/01/01",
    href: "/blog/5",
  },
  {
    image: "/images/news-1.png",
    category: "お知らせ",
    title: "タイトル",
    shortDesc:
      "11月3日に弊社社員 小泉英雄が秋の褒章『黄綬褒章』を受章いたしました。 これもひとえに、皆様方のご指導の賜物と改めて感謝申し上げる次第です。 11月26... ",
    date: "2025/01/01",
    href: "/blog/6",
  },
  {
    image: "/images/news-1.png",
    category: "お知らせ",
    title: "タイトル",
    shortDesc:
      "11月3日に弊社社員 小泉英雄が秋の褒章『黄綬褒章』を受章いたしました。 これもひとえに、皆様方のご指導の賜物と改めて感謝申し上げる次第です。 11月26... ",
    date: "2025/01/01",
    href: "/blog/7",
  },
  {
    image: "/images/news-1.png",
    category: "お知らせ",
    title: "タイトル",
    shortDesc:
      "11月3日に弊社社員 小泉英雄が秋の褒章『黄綬褒章』を受章いたしました。 これもひとえに、皆様方のご指導の賜物と改めて感謝申し上げる次第です。 11月26... ",
    date: "2025/01/01",
    href: "/blog/8",
  },
  {
    image: "/images/news-1.png",
    category: "お知らせ",
    title: "タイトル",
    shortDesc:
      "11月3日に弊社社員 小泉英雄が秋の褒章『黄綬褒章』を受章いたしました。 これもひとえに、皆様方のご指導の賜物と改めて感謝申し上げる次第です。 11月26... ",
    date: "2025/01/01",
    href: "/blog/9",
  },
];

const ITEMS_PER_PAGE = 6; // Show 6 items per page

export default function BlogList() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(blogList.length / ITEMS_PER_PAGE);

  // Get current page items
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = blogList.slice(indexOfFirstItem, indexOfLastItem);

  // Generate page numbers array
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="space-y-16 px-6 sm:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12">
        {currentItems.map((blog, index) => (
          <BlogItem key={index} {...blog} index={index} />
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

        {totalPages > pageNumbers.length && <span className="px-2">...</span>}

        <button
          onClick={handleNextPage}
          className="p-2 text-web-main transition-colors"
          disabled={currentPage === totalPages}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
