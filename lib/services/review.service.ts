import { db } from "@/db";
import { reviews, users } from "@/db/schema";
import { TReviewWithAuthor } from "@/types";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";

export const getTestimonials = async (
  limit = 6,
): Promise<TReviewWithAuthor[]> => {
  if (limit <= 0) return [];

  const sq = db
    .selectDistinctOn([reviews.userId], {
      ...getTableColumns(reviews),
      firstName: users.firstName,
      lastName: users.lastName,
    })
    .from(reviews)
    .innerJoin(users, eq(reviews.userId, users.id))
    .where(eq(reviews.rating, 5))
    .orderBy(reviews.userId, desc(sql<number>`length(${reviews.description})`))
    .as("sq");

  return await db
    .select()
    .from(sq)
    .orderBy(desc(sql<number>`length(${sq.description})`))
    .limit(limit);
};
