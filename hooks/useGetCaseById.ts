import { useQuery } from "@tanstack/react-query";
import { Case } from "./useGetCases";
import { getCaseById as d1GetCaseById } from "@/services/cloudflare-d1";

/**
 * Fetches a single case by ID from the D1 database
 * @param id The case ID to fetch
 * @param locale Language code for multilingual support
 * @returns Promise containing the case data or null if not found
 */
export const getCaseById = async (id: string, locale?: "en" | "ja"): Promise<Case | null> => {
  return d1GetCaseById(id, locale);
};

/**
 * Hook to fetch a single case by ID using TanStack Query
 * @param id The case ID to fetch
 * @param locale Language code for multilingual support
 * @returns Query result with case data
 */
export const useGetCaseById = (id: string, locale?: "en" | "ja") => {
  return useQuery({
    queryKey: ["case", id, locale],
    queryFn: () => getCaseById(id, locale),
    enabled: !!id, // Only run query if id is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
