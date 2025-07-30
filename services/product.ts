'use server'
import { Case } from "@/hooks/useGetCases";
import {
    getCaseByIdServer as d1GetCaseById,
    getCaseSEODataServer as d1GetCaseSEOData,
} from "@/lib/cloudflare-d1-server";

/**
 * Fetches a single case by ID from the D1 database
 * @param id The case ID to fetch
 * @returns Case object with SEO fields or null if not found
 */
export const getCaseById = async (id: string): Promise<Case | null> => {
    return d1GetCaseById(id);
};

/**
 * Fetches SEO metadata for a specific case from D1 database
 * @param id The case ID to fetch SEO data for
 * @returns Object containing SEO fields or null if not found
 */
export const getCaseSEOData = async (id: string): Promise<{
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    ogImage: string;
} | null> => {
    return d1GetCaseSEOData(id);
};
