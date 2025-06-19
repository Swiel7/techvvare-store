"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { TProduct } from "@/types";

type AddToCartButtonProps = {
  product: TProduct;
  productVariant: TProduct["variants"][0];
  quantity: number;
} & React.ComponentProps<typeof Button>;

const AddToCartButton = ({
  product,
  productVariant,
  quantity,
  ...props
}: AddToCartButtonProps) => {
  const { addItem } = useCart();
  const outOfStock = product.variants.every((variant) => variant.stock === 0);

  return (
    <Button
      variant="secondary"
      disabled={outOfStock}
      onClick={() => addItem(product, productVariant, quantity)}
      {...props}
    >
      {outOfStock ? "Out of Stock" : "Add To Cart"}
    </Button>
  );
};

export default AddToCartButton;
