import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { Case } from "./useGetCases"; // Reusing Case interface since structure is the same

/**
 * Fetches all equipment from the D1 database with pagination
 * @param options Optional parameters for pagination and sorting
 * @returns Object containing equipment array and pagination info
 */
export const getAllEquipments = async (options?: {
  pageSize?: number;
  offset?: number;
  locale?: "en" | "ja";
}): Promise<{
  cases: Case[]; // Using Case interface for equipment items
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

  params.append('type', 'equipments'); // Specify equipment type

  const response = await fetch(`/api/posts?${params}`);
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

/**
 * Fetches equipment with page-based pagination from D1 database
 * @param options Parameters for page-based pagination
 * @returns Object containing equipment array and pagination info
 */
export const getEquipmentsWithPagePagination = async (options: {
  page: number;
  pageSize: number;
  locale?: "en" | "ja";
}): Promise<{
  cases: Case[]; // Using Case interface for equipment items
  hasMore: boolean;
  currentPage: number;
  pageSize: number;
  total: number;
}> => {
  const { page, pageSize, locale } = options;
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
    type: 'equipments',
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
 * Fetches a single equipment item by ID
 * @param id The equipment ID to fetch
 * @param locale Language code for multilingual support
 * @returns Promise containing the equipment data or null if not found
 */
export const getEquipmentById = async (id: string, locale?: "en" | "ja"): Promise<Case | null> => {
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
 * Hook to fetch equipment with pagination using TanStack Query
 * @param pageSize Number of equipment items to fetch per page
 * @param locale Language code for multilingual support
 * @returns Query result with equipment data and pagination info
 */
export const useGetEquipments = (pageSize: number = 10, locale?: "en" | "ja") => {
  return useQuery({
    queryKey: ["equipments", pageSize, locale],
    queryFn: () => getAllEquipments({ pageSize, locale }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

/**
 * Hook to fetch equipment with page-based pagination using TanStack Query
 * @param page Current page number (1-based)
 * @param pageSize Number of equipment items to fetch per page
 * @param locale Language code for multilingual support
 * @returns Query result with equipment data and pagination info
 */
export const useGetEquipmentsWithPagePagination = (page: number = 1, pageSize: number = 9, locale?: "en" | "ja") => {
  return useQuery({
    queryKey: ["equipments-page", page, pageSize, locale],
    queryFn: () => getEquipmentsWithPagePagination({ page, pageSize, locale }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

/**
 * Hook to fetch a single equipment item by ID using TanStack Query
 * @param id The equipment ID to fetch  
 * @param locale Language code for multilingual support
 * @returns Query result with equipment data
 */
export const useGetEquipmentById = (id: string, locale?: "en" | "ja") => {
  return useQuery({
    queryKey: ["equipment", id, locale],
    queryFn: () => getEquipmentById(id, locale),
    enabled: !!id, // Only run query if id is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

/**
 * Hook to fetch equipment with infinite pagination using TanStack Query
 * @param pageSize Number of equipment items to fetch per page
 * @param locale Language code for multilingual support
 * @returns Infinite query result with equipment data and pagination controls
 */
export const useGetEquipmentsInfinite = (pageSize: number = 10, locale?: "en" | "ja") => {
  return useInfiniteQuery({
    queryKey: ["equipments-infinite", pageSize, locale],
    queryFn: ({
      pageParam = 0,
    }: {
      pageParam?: number;
    }) =>
      getAllEquipments({
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