"use client";

import { Button } from "@/components/ui/button";
import { addToWishlist, removeFromWishlist } from "@/lib/actions/user.actions";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { toast } from "sonner";

type WishlistButtonProps = {
  productId: string;
  isOnWishlist: boolean;
  withText?: boolean;
} & React.ComponentProps<typeof Button>;

const WishlistButton = ({
  productId,
  isOnWishlist,
  withText = false,
  ...props
}: WishlistButtonProps) => {
  const handleClick = async (action: "add" | "remove") => {
    const { success, message } =
      action === "add"
        ? await addToWishlist(productId)
        : await removeFromWishlist(productId);

    if (success) {
      toast.success("Success", { description: message });
    } else {
      toast.error("Error", { description: message });
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => handleClick(isOnWishlist ? "remove" : "add")}
      {...props}
    >
      <Heart className={cn(isOnWishlist && "fill-primary")} />
      {withText && (
        <span>{isOnWishlist ? "Remove From Wishlist" : "Add To Wishlist"}</span>
      )}
    </Button>
  );
};

export default WishlistButton;
