"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormControls,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Rating } from "@/components/ui/rating";
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
import { Textarea } from "@/components/ui/textarea";
import { createReview } from "@/lib/actions/review.actions";
import { reviewSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const ReviewForm = ({
  productId,
  isUserBoughtProduct,
}: {
  productId: string;
  isUserBoughtProduct: boolean;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof reviewSchema>>({
    defaultValues: { rating: 0, description: "" },
    resolver: zodResolver(reviewSchema),
  });

  const isSubmitting = form.formState.isSubmitting;

  const handleSubmit = async (values: z.infer<typeof reviewSchema>) => {
    const { success, message } = await createReview(values, productId);

    if (success) {
      onOpenChange(false);
      toast.success("Success", { description: message });
    } else {
      toast.error("Error", { description: message });
    }
  };

  const onOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    form.reset();
  };

  return isUserBoughtProduct ? (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        Write A Review
      </Button>
      <ResponsiveDialog
        title="Write A Review"
        open={open}
        onOpenChange={onOpenChange}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormControls>
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Rating</FormLabel>
                    <FormControl>
                      <Rating disabled={isSubmitting} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Review</FormLabel>
                    <FormControl>
                      <Textarea
                        className="resize-none"
                        disabled={isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormControls>
            <Button
              type="submit"
              size="lg"
              className="w-full"
              loading={isSubmitting}
            >
              Submit
            </Button>
          </form>
        </Form>
      </ResponsiveDialog>
    </>
  ) : null;
};

export default ReviewForm;
