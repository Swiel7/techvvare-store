import { db } from "@/db";
import { reviews, users } from "@/db/schema";
import { REVIEWS_PER_PAGE } from "@/lib/constants";
import { TRatingCounts, TReviewWithAuthor } from "@/types";
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

export const getReviewsByProductId = async (
  productId: string,
  page = "1",
  limit = REVIEWS_PER_PAGE,
): Promise<TReviewWithAuthor[]> => {
  const pageNum = parseInt(String(page), 10) || 1;
  const offset = limit ? (pageNum - 1) * limit : 0;

  const sq = db.$with("sq").as(
    db
      .select({
        ...getTableColumns(reviews),
        firstName: users.firstName,
        lastName: users.lastName,
      })
      .from(reviews)
      .innerJoin(users, eq(reviews.userId, users.id))
      .where(eq(reviews.productId, productId))
      .orderBy(desc(reviews.createdAt))
      .offset(offset),
  );

  if (!limit) return await db.with(sq).select().from(sq);

  return await db.with(sq).select().from(sq).limit(limit);
};

export const getReviewsCount = async (
  productId: string,
): Promise<{ totalReviews: number; totalPages: number }> => {
  const [totalResult] = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(reviews)
    .where(eq(reviews.productId, productId));

  const totalReviews = totalResult?.count || 0;
  const totalPages = Math.ceil(totalReviews / REVIEWS_PER_PAGE);

  return { totalReviews, totalPages };
};

export const getRatingCounts = async (
  productId: string,
): Promise<TRatingCounts> => {
  const ratingResults = await db
    .select({
      rating: reviews.rating,
      count: sql<number>`COUNT(*)`,
    })
    .from(reviews)
    .where(eq(reviews.productId, productId))
    .groupBy(reviews.rating);

  const ratingCounts: TRatingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

  for (const r of ratingResults) {
    if (r.rating >= 1 && r.rating <= 5) {
      ratingCounts[r.rating as keyof TRatingCounts] = r.count;
    }
  }

  return ratingCounts;
};
