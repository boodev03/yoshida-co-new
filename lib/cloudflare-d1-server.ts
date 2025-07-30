/* eslint-disable @typescript-eslint/no-explicit-any */
import { Case } from "@/hooks/useGetCases";

// Cloudflare D1 configuration (server-side only)
const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const CLOUDFLARE_DATABASE_ID = process.env.CLOUDFLARE_DATABASE_ID;
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_DATABASE_ID || !CLOUDFLARE_API_TOKEN) {
  throw new Error("Missing required Cloudflare D1 environment variables");
}

const D1_API_BASE = `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/d1/database/${CLOUDFLARE_DATABASE_ID}`;

interface D1Response<T = any> {
  result: T[];
  success: boolean;
  errors: any[];
  messages: any[];
}

interface D1QueryResponse {
  results: any[];
  success: boolean;
  meta: {
    served_by: string;
    duration: number;
    changes: number;
    last_row_id: number;
    rows_read: number;
    rows_written: number;
  };
}

/**
 * Execute a SQL query against Cloudflare D1 (server-side only)
 */
async function executeD1Query(sql: string, params?: any[]): Promise<D1QueryResponse> {
  const response = await fetch(`${D1_API_BASE}/query`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${CLOUDFLARE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sql,
      params: params || [],
    }),
  });

  if (!response.ok) {
    throw new Error(`D1 API error: ${response.status} ${response.statusText}`);
  }

  const data: D1Response<D1QueryResponse> = await response.json();
  
  if (!data.success) {
    throw new Error(`D1 query failed: ${JSON.stringify(data.errors)}`);
  }

  return data.result[0];
}

/**
 * Transform D1 row data to Case object
 */
function transformD1RowToCase(row: any): Case {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    cardDescription: row.cardDescription || "",
    thumbnail: row.thumbnail || "",
    sections: row.sections ? JSON.parse(row.sections) : [],
    metaTitle: row.metaTitle || "",
    metaKeywords: row.metaKeywords || "",
    metaDescription: row.metaDescription || "",
    ogImage: row.ogImage || "",
    ogTwitter: row.ogTwitter || "",
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

/**
 * Fetches all cases from D1 database with pagination (server-side)
 */
export const getAllCasesServer = async (options?: {
  pageSize?: number;
  offset?: number;
}): Promise<{
  cases: Case[];
  hasMore: boolean;
  total: number;
}> => {
  try {
    const pageSize = options?.pageSize || 10;
    const offset = options?.offset || 0;

    // Get total count
    const countResult = await executeD1Query("SELECT COUNT(*) as total FROM products");
    const total = countResult.results[0]?.total || 0;

    // Get paginated results
    const sql = `
      SELECT id, title, category, cardDescription, thumbnail, sections, 
             metaTitle, metaKeywords, metaDescription, ogImage, ogTwitter,
             createdAt, updatedAt
      FROM products 
      ORDER BY updatedAt DESC 
      LIMIT ? OFFSET ?
    `;
    
    const result = await executeD1Query(sql, [pageSize, offset]);
    
    const cases: Case[] = result.results.map(transformD1RowToCase);
    const hasMore = offset + pageSize < total;

    return {
      cases,
      hasMore,
      total,
    };
  } catch (error) {
    console.error("Error fetching cases from D1:", error);
    throw error;
  }
};

/**
 * Fetches cases with page-based pagination (server-side)
 */
export const getCasesWithPagePaginationServer = async (options: {
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
    const offset = (page - 1) * pageSize;

    const result = await getAllCasesServer({ pageSize, offset });

    return {
      cases: result.cases,
      hasMore: result.hasMore,
      currentPage: page,
      pageSize,
      total: result.total,
    };
  } catch (error) {
    console.error("Error fetching cases with page pagination from D1:", error);
    throw error;
  }
};

/**
 * Fetches a single case by ID from D1 database (server-side)
 */
export const getCaseByIdServer = async (id: string): Promise<Case | null> => {
  try {
    const sql = `
      SELECT id, title, category, cardDescription, thumbnail, sections,
             metaTitle, metaKeywords, metaDescription, ogImage, ogTwitter,
             createdAt, updatedAt
      FROM products 
      WHERE id = ?
    `;
    
    const result = await executeD1Query(sql, [id]);
    
    if (result.results.length === 0) {
      return null;
    }

    return transformD1RowToCase(result.results[0]);
  } catch (error) {
    console.error("Error fetching case by ID from D1:", error);
    throw error;
  }
};

/**
 * Fetches SEO metadata for a specific case from D1 (server-side)
 */
export const getCaseSEODataServer = async (id: string): Promise<{
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogImage: string;
} | null> => {
  try {
    const sql = `
      SELECT metaTitle, metaDescription, metaKeywords, ogImage
      FROM products 
      WHERE id = ?
    `;
    
    const result = await executeD1Query(sql, [id]);
    
    if (result.results.length === 0) {
      return null;
    }

    const row = result.results[0];
    return {
      metaTitle: row.metaTitle || "",
      metaDescription: row.metaDescription || "",
      metaKeywords: row.metaKeywords || "",
      ogImage: row.ogImage || "",
    };
  } catch (error) {
    console.error("Error fetching case SEO data from D1:", error);
    throw error;
  }
};