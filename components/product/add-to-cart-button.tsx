"use client";

import { Button } from "@/components/ui/button";
import { TProduct } from "@/types";
import { toast } from "sonner";

type AddToCartButtonProps = {
  product: TProduct;
  productVariant: TProduct["variants"][0];
  quantity: number;
} & React.ComponentProps<typeof Button>;

const AddToCartButton = ({ product, ...props }: AddToCartButtonProps) => {
  const outOfStock = product.variants.every((variant) => variant.stock === 0);

  const handleClick = () => {
    toast.success("Item added to cart");
  };

  return (
    <Button
      variant="secondary"
      disabled={outOfStock}
      onClick={handleClick}
      {...props}
    >
      {outOfStock ? "Out of Stock" : "Add To Cart"}
    </Button>
  );
};

export default AddToCartButton;
