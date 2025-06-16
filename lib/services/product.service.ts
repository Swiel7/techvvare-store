import { db } from "@/db";
import { categories } from "@/db/schema";
import { TCategory } from "@/types";
import { isNotNull } from "drizzle-orm";

export const getCategoriesWithImages = async (): Promise<TCategory[]> => {
  return await db.select().from(categories).where(isNotNull(categories.image));
};
