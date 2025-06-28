import { auth } from "@/auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Rating } from "@/components/ui/rating";
import { ResponsiveAlertDialog } from "@/components/ui/responsive-alert-dialog";
import { deleteReview } from "@/lib/actions/review.actions";
import { cn, formatDate } from "@/lib/utils";
import { TReviewWithAuthor } from "@/types";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

const ReviewCard = async ({
  review,
  className,
}: {
  review: TReviewWithAuthor;
  className?: string;
}) => {
  const { createdAt, description, rating, firstName, lastName, userId } =
    review;

  const session = await auth();
  const canDeleteReview = session?.user?.id === userId;

  const handleDelete = async () => {
    const { success, message } = await deleteReview(review.id);

    if (success) {
      toast.success("Success", { description: message });
    } else {
      toast.error("Error", { description: message });
    }
  };

  return (
    <Card className={cn("border-none", className)}>
      <CardContent className="flex grow flex-col gap-4">
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
          {canDeleteReview && (
            <ResponsiveAlertDialog
              onConfirm={handleDelete}
              title="Delete Review"
              description="This action cannot be undone. This will permanently delete your
            review from our database."
              trigger={
                <Button
                  variant="secondary"
                  size="icon"
                  className="ml-auto size-10"
                >
                  <Trash2 />
                </Button>
              }
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
