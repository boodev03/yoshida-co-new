import { useQuery } from "@tanstack/react-query";
import { Case } from "./useGetCases";
import { getCaseById as d1GetCaseById } from "@/services/cloudflare-d1";

/**
 * Fetches a single case by ID from the D1 database
 * @param id The case ID to fetch
 * @returns Promise containing the case data or null if not found
 */
export const getCaseById = async (id: string): Promise<Case | null> => {
  return d1GetCaseById(id);
};

/**
 * Hook to fetch a single case by ID using TanStack Query
 * @param id The case ID to fetch
 * @returns Query result with case data
 */
export const useGetCaseById = (id: string) => {
  return useQuery({
    queryKey: ["case", id],
    queryFn: () => getCaseById(id),
    enabled: !!id, // Only run query if id is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
