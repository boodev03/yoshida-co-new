import { Case } from "@/hooks/useGetCases";

/**
 * Base URL for our API routes
 */
const API_BASE = '/api';

/**
 * Fetches all cases with pagination via API route
 */
export const getAllCases = async (options?: {
  pageSize?: number;
  offset?: number;
}): Promise<{
  cases: Case[];
  hasMore: boolean;
  total: number;
}> => {
  try {
    const params = new URLSearchParams();
    
    if (options?.pageSize) {
      params.append('pageSize', options.pageSize.toString());
    }
    
    if (options?.offset) {
      params.append('offset', options.offset.toString());
    }

    const response = await fetch(`${API_BASE}/cases?${params}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching cases:", error);
    throw error;
  }
};

/**
 * Fetches cases with page-based pagination via API route
 */
export const getCasesWithPagePagination = async (options: {
  page: number;
  pageSize: number;
}): Promise<{
  cases: Case[];
  hasMore: boolean;
  currentPage: number;
  pageSize: number;
  total: number;
}> => {
  try {
    const { page, pageSize } = options;
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
    });

    const response = await fetch(`${API_BASE}/cases?${params}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching cases with page pagination:", error);
    throw error;
  }
};

/**
 * Fetches a single case by ID via API route
 */
export const getCaseById = async (id: string): Promise<Case | null> => {
  try {
    const response = await fetch(`${API_BASE}/cases/${id}`);
    
    if (response.status === 404) {
      return null;
    }
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching case by ID:", error);
    throw error;
  }
};

/**
 * Fetches SEO metadata for a specific case via API route
 */
export const getCaseSEOData = async (id: string): Promise<{
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogImage: string;
} | null> => {
  try {
    const response = await fetch(`${API_BASE}/cases/${id}/seo`);
    
    if (response.status === 404) {
      return null;
    }
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching case SEO data:", error);
    throw error;
  }
};