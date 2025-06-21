"use client";

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardHeader } from "@/components/ui/card";
import { QuantityButton } from "@/components/ui/quantity-button";
import StyledImage from "@/components/ui/styled-image";
import { useCart } from "@/hooks/use-cart";
import { cn, formatPrice } from "@/lib/utils";
import { TCartItem } from "@/types";
import { XIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const CartItem = ({
  item,
  className,
}: {
  item: TCartItem;
  className?: string;
}) => {
  const { productId, name, slug, image, color, price, quantity, variant } =
    item;

  const { removeItem, updateItemQuantity } = useCart();
  const [selectedQuantity, setSelectedQuantity] = useState<number>(quantity);

  const handleQuantityChange = (value: number) => {
    setSelectedQuantity(value);
    updateItemQuantity(productId, variant.id, value);
  };

  return (
    <Card className={cn("!py-4", className)}>
      <CardHeader className="gap-y-0 !px-4">
        <div className="flex gap-4">
          <Link
            href={`/products/${slug}`}
            className="w-5/12 max-w-40 shrink-0 rounded-lg border"
            data-slot="cart-item-image-container"
          >
            <StyledImage src={image} alt={name} sizes="160px" />
          </Link>
          <div
            className="flex flex-col items-start gap-1.5"
            data-slot="cart-item-data"
          >
            <Link href={`/products/${slug}`} className="hover:underline">
              <h3 className="font-bold">{name}</h3>
            </Link>
            <span className="font-medium">Color: {color}</span>
            <span className="font-medium">{formatPrice(price)}</span>
            <QuantityButton
              className="h-8 [&_input]:text-sm [&&_svg]:size-4"
              quantity={selectedQuantity}
              onQuantityChange={(value) => handleQuantityChange(value)}
              stockAmount={variant.stock}
            />
          </div>
        </div>
        <CardAction>
          <Button
            variant="ghost"
            size="sm"
            className="size-8 *:!size-5"
            onClick={() => removeItem(productId, variant.id)}
          >
            <XIcon />
          </Button>
        </CardAction>
      </CardHeader>
    </Card>
  );
};

export default CartItem;
