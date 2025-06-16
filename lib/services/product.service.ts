import { db } from "@/db";
import { categories, products } from "@/db/schema";
import { TCategory, TProduct } from "@/types";
import { asc, eq, isNotNull } from "drizzle-orm";

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
