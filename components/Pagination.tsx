import { ChevronRight } from "@/components/icons/ChevronRight";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasNextPage?: boolean;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  hasNextPage = false,
  className = "",
}: PaginationProps) {
  // Generate page numbers with ellipsis logic
  const getVisiblePageNumbers = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    // Always show first page
    range.push(1);

    // Calculate range around current page
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    // Always show last page if more than 1 page
    if (totalPages > 1) {
      range.push(totalPages);
    }

    // Remove duplicates and sort
    const uniqueRange = [...new Set(range)].sort((a, b) => a - b);

    // Add dots where there are gaps
    let prev = 0;
    for (const page of uniqueRange) {
      if (page - prev > 1) {
        rangeWithDots.push("...");
      }
      rangeWithDots.push(page);
      prev = page;
    }

    return rangeWithDots;
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages || hasNextPage) {
      onPageChange(currentPage + 1);
    }
  };

  const visiblePageNumbers = getVisiblePageNumbers();

  return (
    <div className={cn("flex items-center justify-center gap-1", className)}>
      {/* Previous page button */}
      <button
        onClick={handlePrevPage}
        className={cn(
          "w-8 h-8 flex items-center justify-center text-gray-600 hover:text-web-main transition-colors rotate-180",
          currentPage === 1 &&
            "cursor-not-allowed opacity-30 hover:text-gray-600"
        )}
        disabled={currentPage === 1}
        title="Previous page"
      >
        <ChevronRight />
      </button>

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {visiblePageNumbers.map((pageNumber, index) => (
          <div key={index}>
            {pageNumber === "..." ? (
              <span className="w-8 h-8 flex items-center justify-center text-gray-400 text-sm">
                ...
              </span>
            ) : (
              <button
                onClick={() => onPageChange(pageNumber as number)}
                className={cn(
                  "w-8 h-8 flex items-center justify-center text-sm font-medium transition-all duration-200 border-b-2",
                  currentPage === pageNumber
                    ? "text-web-main border-web-main"
                    : "text-gray-600 border-transparent hover:text-web-main hover:border-web-main"
                )}
                title={`Go to page ${pageNumber}`}
              >
                {pageNumber}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Next page button */}
      <button
        onClick={handleNextPage}
        className={cn(
          "w-8 h-8 flex items-center justify-center text-gray-600 hover:text-web-main transition-colors",
          currentPage >= totalPages &&
            !hasNextPage &&
            "cursor-not-allowed opacity-30 hover:text-gray-600"
        )}
        disabled={currentPage >= totalPages && !hasNextPage}
        title="Next page"
      >
        <ChevronRight />
      </button>
    </div>
  );
}
