"use client";

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardHeader } from "@/components/ui/card";
import { QuantityButton } from "@/components/ui/quantity-button";
import { formatPrice } from "@/lib/utils";
import { TCartItem } from "@/types";
import { XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const CartItem = ({ item }: { item: TCartItem; className?: string }) => {
  const { productId, name, slug, image, color, price, quantity, variantId } =
    item;
  console.log(productId, name, slug, image, color, price, quantity, variantId);

  const [selectedQuantity, setSelectedQuantity] = useState<number>(quantity);

  const handleQuantityChange = (value: number) => {
    setSelectedQuantity(value);
  };

  return (
    <Card>
      <CardHeader className="grid-cols-[160px_1fr] gap-4">
        <CardAction>
          <Button variant="ghost" size="sm">
            <XIcon />
          </Button>
        </CardAction>
        <div className="grid aspect-square rounded-lg border">
          <Link
            href={`/products/${slug}`}
            className="relative m-auto size-[80%]"
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!}${image}`}
              alt={name}
              fill
              className="object-contain"
              sizes="160px"
            />
          </Link>
        </div>
        <div className="flex flex-col items-start gap-1.5">
          <Link href={`/products/${slug}`} className="hover:underline">
            <h3 className="font-bold">{name}</h3>
          </Link>
          <span className="font-medium">Color: {color}</span>
          <span className="font-medium">{formatPrice(price)}</span>
          <QuantityButton
            className="h-8 [&_input]:text-sm [&&_svg]:size-4"
            quantity={selectedQuantity}
            onQuantityChange={(value) => handleQuantityChange(value)}
          />
        </div>
      </CardHeader>
    </Card>
  );
};

export default CartItem;
