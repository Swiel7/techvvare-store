"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";

type WishlistButtonProps = {
  productId: string;
  isOnWishlist: boolean;
  withText?: boolean;
} & React.ComponentProps<typeof Button>;

const WishlistButton = ({
  isOnWishlist,
  withText = false,
  ...props
}: WishlistButtonProps) => {
  const handleClick = async (action: "add" | "remove") => {
    console.log(action);
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
