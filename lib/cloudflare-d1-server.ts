/* eslint-disable @typescript-eslint/no-explicit-any */
import { Case } from "@/hooks/useGetCases";

// Cloudflare D1 configuration (server-side only)
const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const CLOUDFLARE_DATABASE_ID = process.env.CLOUDFLARE_DATABASE_ID;
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

if (
  !CLOUDFLARE_ACCOUNT_ID ||
  !CLOUDFLARE_DATABASE_ID ||
  !CLOUDFLARE_API_TOKEN
) {
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
async function executeD1Query(
  sql: string,
  params?: any[]
): Promise<D1QueryResponse> {
  const response = await fetch(`${D1_API_BASE}/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
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
 * Transform D1 row data to Case object from new multilingual schema
 */
function transformD1RowToCase(row: any): Case {
  return {
    id: row.id,
    title: row.title,
    category: row.category || "", // String field from post_translations
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
    date: row.date,
  };
}

/**
 * Fetches all cases from D1 database with pagination (server-side)
 */
export const getAllCasesServer = async (options?: {
  pageSize?: number;
  offset?: number;
  locale?: "en" | "ja";
}): Promise<{
  cases: Case[];
  hasMore: boolean;
  total: number;
}> => {
  try {
    const pageSize = options?.pageSize || 10;
    const offset = options?.offset || 0;
    const locale = options?.locale || "ja";

    // Get total count for cases type posts
    const countResult = await executeD1Query(
      "SELECT COUNT(*) as total FROM posts WHERE type = 'cases'"
    );
    const total = countResult.results[0]?.total || 0;

    // Get paginated results with multilingual data
    const sql = `
      SELECT 
        p.id, 
        pt.title, 
        pt.cardDescription, 
        pt.sections,
        pt.metaTitle, 
        pt.metaKeywords, 
        pt.metaDescription,
        pt.category,
        p.thumbnail, 
        p.ogImage, 
        p.ogTwitter,
        p.createdAt, 
        p.updatedAt,
        p.date
      FROM posts p
      LEFT JOIN post_translations pt ON p.id = pt.post_id AND pt.language_code = ?
      WHERE p.type = 'cases'
      ORDER BY p.updatedAt DESC 
      LIMIT ? OFFSET ?
    `;

    const result = await executeD1Query(sql, [locale, pageSize, offset]);
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
  locale?: "en" | "ja";
}): Promise<{
  cases: Case[];
  hasMore: boolean;
  currentPage: number;
  pageSize: number;
  total: number;
}> => {
  try {
    const { page, pageSize, locale } = options;
    const offset = (page - 1) * pageSize;

    const result = await getAllCasesServer({ pageSize, offset, locale });

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
export const getCaseByIdServer = async (
  id: string,
  locale?: "en" | "ja"
): Promise<Case | null> => {
  try {
    const localeCode = locale || "ja";

    const sql = `
      SELECT 
        p.id,
        p.date, 
        pt.title, 
        pt.cardDescription,
        pt.sections,
        pt.metaTitle, 
        pt.metaKeywords, 
        pt.metaDescription,
        pt.category,
        p.thumbnail, 
        p.ogImage, 
        p.ogTwitter,
        p.createdAt, 
        p.updatedAt
      FROM posts p
      LEFT JOIN post_translations pt ON p.id = pt.post_id AND pt.language_code = ?
      WHERE p.id = ? AND p.type = 'cases'
    `;

    const result = await executeD1Query(sql, [localeCode, id]);

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
export const getCaseSEODataServer = async (
  id: string,
  locale?: "en" | "ja"
): Promise<{
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogImage: string;
} | null> => {
  try {
    const localeCode = locale || "ja";

    const sql = `
      SELECT 
        pt.metaTitle, 
        pt.metaDescription, 
        pt.metaKeywords, 
        p.ogImage
      FROM posts p
      LEFT JOIN post_translations pt ON p.id = pt.post_id AND pt.language_code = ?
      WHERE p.id = ? AND p.type = 'cases'
    `;

    const result = await executeD1Query(sql, [localeCode, id]);

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

/**
 * Generic function to fetch all posts from D1 database with pagination (server-side)
 */
export const getAllPostsServer = async (options?: {
  pageSize?: number;
  offset?: number;
  locale?: "en" | "ja";
  type?: "cases" | "news" | "equipments";
}): Promise<{
  cases: Case[];
  hasMore: boolean;
  total: number;
}> => {
  try {
    const pageSize = options?.pageSize || 10;
    const offset = options?.offset || 0;
    const locale = options?.locale || "ja";
    const type = options?.type || "cases";

    // Get total count for specific post type
    const countResult = await executeD1Query(
      "SELECT COUNT(*) as total FROM posts WHERE type = ?",
      [type]
    );
    const total = countResult.results[0]?.total || 0;

    // Get paginated results with multilingual data
    const sql = `
      SELECT 
        p.id, 
        pt.title, 
        pt.cardDescription, 
        pt.sections,
        pt.metaTitle, 
        pt.metaKeywords, 
        pt.metaDescription,
        pt.category,
        p.thumbnail, 
        p.ogImage, 
        p.ogTwitter,
        p.createdAt, 
        p.updatedAt,
        p.date
      FROM posts p
      LEFT JOIN post_translations pt ON p.id = pt.post_id AND pt.language_code = ?
      WHERE p.type = ?
      ORDER BY p.updatedAt DESC 
      LIMIT ? OFFSET ?
    `;

    const result = await executeD1Query(sql, [locale, type, pageSize, offset]);
    const cases: Case[] = result.results.map(transformD1RowToCase);
    const hasMore = offset + pageSize < total;

    return {
      cases,
      hasMore,
      total,
    };
  } catch (error) {
    console.error("Error fetching posts from D1:", error);
    throw error;
  }
};

/**
 * Generic function to fetch posts with page-based pagination (server-side)
 */
export const getPostsWithPagePaginationServer = async (options: {
  page: number;
  pageSize: number;
  locale?: "en" | "ja";
  type?: "cases" | "news" | "equipments";
}): Promise<{
  cases: Case[];
  hasMore: boolean;
  currentPage: number;
  pageSize: number;
  total: number;
}> => {
  try {
    const { page, pageSize, locale, type } = options;
    const offset = (page - 1) * pageSize;

    const result = await getAllPostsServer({ pageSize, offset, locale, type });

    return {
      cases: result.cases,
      hasMore: result.hasMore,
      currentPage: page,
      pageSize,
      total: result.total,
    };
  } catch (error) {
    console.error("Error fetching posts with page pagination from D1:", error);
    throw error;
  }
};

/**
 * Generic function to fetch a single post by ID from D1 database (server-side)
 */
export const getPostByIdServer = async (
  id: string,
  locale?: "en" | "ja"
): Promise<Case | null> => {
  try {
    const localeCode = locale || "ja";

    const sql = `
      SELECT 
        p.id,
        p.date, 
        pt.title, 
        pt.cardDescription,
        pt.sections,
        pt.metaTitle, 
        pt.metaKeywords, 
        pt.metaDescription,
        pt.category,
        p.thumbnail, 
        p.ogImage, 
        p.ogTwitter,
        p.createdAt, 
        p.updatedAt
      FROM posts p
      LEFT JOIN post_translations pt ON p.id = pt.post_id AND pt.language_code = ?
      WHERE p.id = ?
    `;

    const result = await executeD1Query(sql, [localeCode, id]);

    if (result.results.length === 0) {
      return null;
    }

    return transformD1RowToCase(result.results[0]);
  } catch (error) {
    console.error("Error fetching post by ID from D1:", error);
    throw error;
  }
};

/**
 * Generic function to fetch SEO metadata for a specific post from D1 (server-side)
 */
export const getPostSEODataServer = async (
  id: string,
  locale?: "en" | "ja"
): Promise<{
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogImage: string;
} | null> => {
  try {
    const localeCode = locale || "ja";
    
    const sql = `
      SELECT 
        pt.metaTitle, 
        pt.metaDescription, 
        pt.metaKeywords, 
        p.ogImage
      FROM posts p
      LEFT JOIN post_translations pt ON p.id = pt.post_id AND pt.language_code = ?
      WHERE p.id = ?
    `;

    const result = await executeD1Query(sql, [localeCode, id]);

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
    console.error("Error fetching post SEO data from D1:", error);
    throw error;
  }
};
