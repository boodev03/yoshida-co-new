import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { Case } from "./useGetCases"; // Reusing Case interface since structure is the same

/**
 * Fetches all news from the D1 database with pagination
 * @param options Optional parameters for pagination and sorting
 * @returns Object containing news array and pagination info
 */
export const getAllNews = async (options?: {
  pageSize?: number;
  offset?: number;
  locale?: "en" | "ja";
}): Promise<{
  cases: Case[]; // Using Case interface for news items
  hasMore: boolean;
  total: number;
}> => {
  const params = new URLSearchParams();
  
  if (options?.pageSize) {
    params.append('pageSize', options.pageSize.toString());
  }
  
  if (options?.offset) {
    params.append('offset', options.offset.toString());
  }

  if (options?.locale) {
    params.append('locale', options.locale);
  }

  params.append('type', 'news'); // Specify news type

  const response = await fetch(`/api/posts?${params}`);
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

/**
 * Fetches news with page-based pagination from D1 database
 * @param options Parameters for page-based pagination
 * @returns Object containing news array and pagination info
 */
export const getNewsWithPagePagination = async (options: {
  page: number;
  pageSize: number;
  locale?: "en" | "ja";
}): Promise<{
  cases: Case[]; // Using Case interface for news items
  hasMore: boolean;
  currentPage: number;
  pageSize: number;
  total: number;
}> => {
  const { page, pageSize, locale } = options;
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
    type: 'news',
  });

  if (locale) {
    params.append('locale', locale);
  }

  const response = await fetch(`/api/posts?${params}`);
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

/**
 * Fetches a single news item by ID
 * @param id The news ID to fetch
 * @param locale Language code for multilingual support
 * @returns Promise containing the news data or null if not found
 */
export const getNewsById = async (id: string, locale?: "en" | "ja"): Promise<Case | null> => {
  const params = new URLSearchParams();
  if (locale) {
    params.append('locale', locale);
  }
  
  const url = `/api/posts/${id}${params.toString() ? `?${params}` : ''}`;
  const response = await fetch(url);
  
  if (response.status === 404) {
    return null;
  }
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

/**
 * Hook to fetch news with pagination using TanStack Query
 * @param pageSize Number of news items to fetch per page
 * @param locale Language code for multilingual support
 * @returns Query result with news data and pagination info
 */
export const useGetNews = (pageSize: number = 10, locale?: "en" | "ja") => {
  return useQuery({
    queryKey: ["news", pageSize, locale],
    queryFn: () => getAllNews({ pageSize, locale }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

/**
 * Hook to fetch news with page-based pagination using TanStack Query
 * @param page Current page number (1-based)
 * @param pageSize Number of news items to fetch per page
 * @param locale Language code for multilingual support
 * @returns Query result with news data and pagination info
 */
export const useGetNewsWithPagePagination = (page: number = 1, pageSize: number = 6, locale?: "en" | "ja") => {
  return useQuery({
    queryKey: ["news-page", page, pageSize, locale],
    queryFn: () => getNewsWithPagePagination({ page, pageSize, locale }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

/**
 * Hook to fetch a single news item by ID using TanStack Query
 * @param id The news ID to fetch
 * @param locale Language code for multilingual support
 * @returns Query result with news data
 */
export const useGetNewsById = (id: string, locale?: "en" | "ja") => {
  return useQuery({
    queryKey: ["news", id, locale],
    queryFn: () => getNewsById(id, locale),
    enabled: !!id, // Only run query if id is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

/**
 * Hook to fetch news with infinite pagination using TanStack Query
 * @param pageSize Number of news items to fetch per page
 * @param locale Language code for multilingual support
 * @returns Infinite query result with news data and pagination controls
 */
export const useGetNewsInfinite = (pageSize: number = 10, locale?: "en" | "ja") => {
  return useInfiniteQuery({
    queryKey: ["news-infinite", pageSize, locale],
    queryFn: ({
      pageParam = 0,
    }: {
      pageParam?: number;
    }) =>
      getAllNews({
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