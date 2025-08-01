import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import {
  getAllCases as d1GetAllCases,
  getCasesWithPagePagination as d1GetCasesWithPagePagination,
} from "@/services/cloudflare-d1";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ContentSection {
  id: string;
  type: "gallery" | "normal" | "text-content" | "video" | "rich-text" | "links";
  order: number;
  data: any; // Specific data for each section type
  createdAt: number;
  updatedAt: number;
}

export interface GalleryData {
  rows: Array<{
    id: string;
    images: Array<{
      id: string;
      src: string;
      alt: string;
    }>;
    imagesPerRow: number;
  }>;
}

export interface NormalContentData {
  content: string;
  imageUrl?: string;
  imageAlt?: string;
  imagePosition?: "left" | "right" | "top" | "bottom";
}

export interface TextContentData {
  title: string;
  content: string;
  titleType?: "h1" | "h2" | "h3";
  image?: {
    src: string;
    alt: string;
    file?: File;
  };
  imagePosition?: "left" | "right";
  imageCaption?: string;
}

export interface VideoData {
  url: string;
  title?: string;
}

export interface RichTextData {
  content: string; // TipTap HTML content
}

export interface Case {
  id?: string;

  // Basic Case Info
  title: string;
  category: string;
  cardDescription: string;
  thumbnail: string;
  date: string;

  // Flexible Content Sections (ordered)
  sections: ContentSection[];

  // SEO Fields
  metaTitle: string;
  metaKeywords: string;
  metaDescription: string;
  ogImage: string;
  ogTwitter: string;

  // Timestamps
  createdAt?: number;
  updatedAt?: number;
}

/**
 * Fetches all cases from the D1 database with pagination
 * @param options Optional parameters for pagination and sorting
 * @returns Object containing cases array and pagination info
 */
export const getAllCases = async (options?: {
  pageSize?: number;
  offset?: number;
  locale?: "en" | "ja";
}): Promise<{
  cases: Case[];
  hasMore: boolean;
  total: number;
}> => {
  return d1GetAllCases(options);
};

/**
 * Fetches cases with page-based pagination from D1 database
 * @param options Parameters for page-based pagination
 * @returns Object containing cases array and pagination info
 */
export const getCasesWithPagePagination = async (options: {
  page: number;
  pageSize: number;
  locale?: "en" | "ja";
}): Promise<{
  cases: Case[];
  hasMore: boolean;
  currentPage: number;
  pageSize: number;
  total: number;
}> => {
  return d1GetCasesWithPagePagination(options);
};

/**
 * Hook to fetch cases with pagination using TanStack Query
 * @param pageSize Number of cases to fetch per page
 * @param locale Language code for multilingual support
 * @returns Query result with cases data and pagination info
 */
export const useGetCases = (pageSize: number = 10, locale?: "en" | "ja") => {
  return useQuery({
    queryKey: ["cases", pageSize, locale],
    queryFn: () => getAllCases({ pageSize, locale }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

/**
 * Hook to fetch cases with page-based pagination using TanStack Query
 * @param page Current page number (1-based)
 * @param pageSize Number of cases to fetch per page
 * @param locale Language code for multilingual support
 * @returns Query result with cases data and pagination info
 */
export const useGetCasesWithPagePagination = (
  page: number = 1,
  pageSize: number = 9,
  locale?: "en" | "ja"
) => {
  return useQuery({
    queryKey: ["cases-page", page, pageSize, locale],
    queryFn: () => getCasesWithPagePagination({ page, pageSize, locale }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

/**
 * Hook to fetch cases with infinite pagination using TanStack Query
 * @param pageSize Number of cases to fetch per page
 * @param locale Language code for multilingual support
 * @returns Infinite query result with cases data and pagination controls
 */
export const useGetCasesInfinite = (
  pageSize: number = 10,
  locale?: "en" | "ja"
) => {
  return useInfiniteQuery({
    queryKey: ["cases-infinite", pageSize, locale],
    queryFn: ({ pageParam = 0 }: { pageParam?: number }) =>
      getAllCases({
        pageSize,
        offset: pageParam,
        locale,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextOffset = allPages.length * pageSize;
      return lastPage.hasMore ? nextOffset : undefined;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
