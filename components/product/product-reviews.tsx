import { ReviewForm } from "@/components/form";
import ReviewCard from "@/components/review/review-card";
import { Pagination } from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import { Rating } from "@/components/ui/rating";
import { authenticateUser } from "@/lib/actions/auth.actions";
import { checkUserBoughtProduct } from "@/lib/services/product.service";
import {
  getRatingCounts,
  getReviewsByProductId,
  getReviewsCount,
} from "@/lib/services/review.service";
import { TProduct, TRatingCounts } from "@/types";
import { Star } from "lucide-react";
import { cache } from "react";

const ProductReviews = async ({
  product,
  page,
}: {
  product: TProduct & { category: string };
  page: string;
}) => {
  const user = await authenticateUser();

  const [reviews, totals, ratingCounts, isUserBoughtProduct] = await cache(() =>
    Promise.all([
      getReviewsByProductId(product.id, page),
      getReviewsCount(product.id),
      getRatingCounts(product.id),
      checkUserBoughtProduct(user.id, product.id),
    ]),
  )();

  const { totalPages, totalReviews } = totals;

  return (
    <div className="grid items-start gap-x-16 gap-y-8 lg:grid-cols-2">
      <div className="flex gap-6 rounded-lg border p-4 lg:gap-8 lg:p-6">
        <div className="flex flex-col items-center gap-4">
          <span className="text-2xl font-bold">{product.rating}</span>
          <div className="flex flex-col gap-2">
            <span className="text-muted-foreground text-center text-sm">
              {totalReviews} reviews
            </span>
            <Rating value={Number(product.rating)} disabled />
          </div>
          <ReviewForm
            productId={product.id}
            isUserBoughtProduct={isUserBoughtProduct}
          />
        </div>
        <ul className="flex grow flex-col gap-4">
          {Array.from({ length: 5 }, (_, i) => {
            const number = 5 - i;
            const sliderValue =
              (ratingCounts[number as keyof TRatingCounts] * 100) /
              totalReviews;

            return (
              <li key={number} className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-1.5 font-medium">
                  <Star className="fill-chart-4 size-4 stroke-0" />
                  <span>{number}</span>
                </div>
                <Progress
                  value={sliderValue}
                  className="*:data-[slot=progress-indicator]:bg-chart-4 grow"
                />
                <span>{ratingCounts[number as keyof TRatingCounts]}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex flex-col gap-2 lg:gap-6">
        <ul className="divide-y">
          {reviews.map((review) => (
            <li key={review.id} className="first:*:pt-0">
              <ReviewCard review={review} className="*:px-0" />
            </li>
          ))}
        </ul>
        {totalPages > 1 && <Pagination totalPages={totalPages} />}
      </div>
    </div>
  );
};

export default ProductReviews;
