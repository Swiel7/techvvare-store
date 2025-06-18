import { sortValues } from "@/data";
import { db } from "@/db";
import { categories, products } from "@/db/schema";
import { PRODUCTS_PER_PAGE } from "@/lib/constants";
import { getFilterConditions } from "@/lib/services/filter.service";
import {
  TCategory,
  TFilterURLSearchParams,
  TProduct,
  TSortValue,
} from "@/types";
import { asc, eq, isNotNull, sql, SQL } from "drizzle-orm";

export const getCategoriesWithImages = async (): Promise<TCategory[]> => {
  return await db.select().from(categories).where(isNotNull(categories.image));
};

export const getFeaturedProducts = async (limit = 4): Promise<TProduct[]> => {
  if (limit <= 0) return [];

  return await db
    .select()
    .from(products)
    .where(eq(products.isFeatured, true))
    .orderBy(asc(products.name))
    .limit(limit);
};

export const getOnSaleProducts = async (limit = 4): Promise<TProduct[]> => {
  if (limit <= 0) return [];

  return await db
    .select()
    .from(products)
    .where(eq(products.onSale, true))
    .orderBy(asc(products.name))
    .limit(limit);
};

export const getFilteredProducts = async (
  searchParams: TFilterURLSearchParams,
): Promise<{
  products: TProduct[];
  total: number;
  totalPages: number;
  currentPage: number;
}> => {
  // TODO: Consider caching query results for common filter combinations to improve performance
  // TODO: Ensure database indexes are created for fields used in filtering and sorting (e.g., regularPrice, discountPrice, categoryId)
  const page = parseInt(String(searchParams.page), 10) || 1;
  const sort =
    typeof searchParams.sort === "string" &&
    sortValues.includes(searchParams.sort as TSortValue)
      ? searchParams.sort
      : "default";

  const conditions = await getFilterConditions(searchParams);
  const offset = (page - 1) * PRODUCTS_PER_PAGE;

  const sortOptions: Record<TSortValue, SQL> = {
    default: sql`name ASC`,
    rating: sql`rating DESC`,
    price_asc: sql`COALESCE(discountPrice, regularPrice) ASC`,
    price_desc: sql`COALESCE(discountPrice, regularPrice) DESC`,
    latest: sql`createdAt DESC`,
  };

  const [items, total] = await Promise.all([
    db
      .select()
      .from(products)
      .where(conditions)
      .orderBy(sortOptions[sort as TSortValue])
      .offset(offset)
      .limit(PRODUCTS_PER_PAGE),

    db
      .select({ count: sql<number>`COUNT(*)` })
      .from(products)
      .where(conditions),
  ]);

  const totalCount = total[0]?.count ?? 0;

  return {
    products: items,
    total: totalCount,
    totalPages: Math.ceil(totalCount / PRODUCTS_PER_PAGE),
    currentPage: page,
  };
};
