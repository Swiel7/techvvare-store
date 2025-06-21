"use server";

import { db } from "@/db";
import { products, reviews } from "@/db/schema";
import { authenticateUser } from "@/lib/actions/auth.actions";
import { checkUserBoughtProduct } from "@/lib/services/product.service";
import { handleErrorResponse } from "@/lib/utils";
import { reviewSchema } from "@/lib/validations";
import { TActionResult, TProduct, TReview } from "@/types";
import { eq, avg, sql, count } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const updateProductRatingAndNumReviews = async (
  productId: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tx: any,
): Promise<TProduct> => {
  const rating = db.$with("rating").as(
    db
      .select({ value: avg(reviews.rating).as("value") })
      .from(reviews)
      .where(eq(reviews.productId, productId)),
  );

  const numReviews = db.$with("num_reviews").as(
    db
      .select({ value: count().as("value") })
      .from(reviews)
      .where(eq(reviews.productId, productId)),
  );

  const [product] = await tx
    .with(rating, numReviews)
    .update(products)
    .set({
      rating: sql`(select * from ${rating})`,
      numReviews: sql`(select * from ${numReviews})`,
    })
    .where(eq(products.id, productId))
    .returning();

  return product as TProduct;
};

export const createReview = async (
  values: z.infer<typeof reviewSchema>,
  productId: string,
): Promise<TActionResult<TReview>> => {
  try {
    const user = await authenticateUser();

    const validationResult = reviewSchema.safeParse(values);

    if (!validationResult.success) {
      return { success: false, message: "Invalid review data!" };
    }

    const product = await db.query.products.findFirst({
      where: eq(products.id, productId),
    });

    if (!product) return { success: false, message: "Product not found!" };

    const isUserBoughtProduct = await checkUserBoughtProduct(
      user.id,
      productId,
    );

    if (!isUserBoughtProduct) {
      return {
        success: false,
        message: "You must buy this product to review it!",
      };
    }

    const newReview = await db.transaction(async (tx) => {
      const [review] = await tx
        .insert(reviews)
        .values({ ...validationResult.data, productId, userId: user.id })
        .returning();

      await updateProductRatingAndNumReviews(productId, tx);

      return review;
    });

    revalidatePath(`/products/${product.slug}`);

    return {
      success: true,
      message: "Review created successfully!",
      data: newReview,
    };
  } catch (error) {
    return handleErrorResponse(error, "An unexpected error occurred!");
  }
};

export const deleteReview = async (
  reviewId: string,
): Promise<TActionResult> => {
  try {
    const user = await authenticateUser();

    const [reviewToDelete] = await db
      .select()
      .from(reviews)
      .where(eq(reviews.id, reviewId));

    if (!reviewToDelete)
      return { success: false, message: "Review not found!" };

    const canDeleteReview = user.id === reviewToDelete.userId;

    if (!canDeleteReview)
      return {
        success: false,
        message: "You can only delete your own reviews!",
      };

    await db.transaction(async (tx) => {
      await tx.delete(reviews).where(eq(reviews.id, reviewId));

      const product = await updateProductRatingAndNumReviews(
        reviewToDelete.productId,
        tx,
      );

      revalidatePath(`/products/${product.slug}`);
    });

    return { success: true, message: "Review deleted successfully!" };
  } catch (error) {
    return handleErrorResponse(error, "An unexpected error occurred!");
  }
};
