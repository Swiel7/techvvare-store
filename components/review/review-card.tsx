import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Rating } from "@/components/ui/rating";
import { cn, formatDate } from "@/lib/utils";
import { TReviewWithAuthor } from "@/types";

const ReviewCard = ({
  review,
  className,
}: {
  review: TReviewWithAuthor;
  className?: string;
}) => {
  const { createdAt, description, rating, firstName, lastName } = review;

  return (
    <Card className={cn("border-none", className)}>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Rating value={rating} disabled size={24} />
          <span className="text-sm group-first:hidden">
            {formatDate(createdAt)}
          </span>
        </div>
        <p className="text-muted-foreground">{description}</p>
        <div className="mt-auto flex items-center gap-3">
          <Avatar className="size-10">
            <AvatarFallback>
              {firstName[0]}
              {lastName[0]}
            </AvatarFallback>
          </Avatar>
          <h3 className="text-lg font-medium">
            {firstName} {lastName}
          </h3>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
