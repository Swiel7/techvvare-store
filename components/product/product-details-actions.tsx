"use client";

import AddToCartButton from "@/components/product/add-to-cart-button";
import { Button } from "@/components/ui/button";
import { Color } from "@/components/ui/color";
import { QuantityButton } from "@/components/ui/quantity-button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useCart } from "@/hooks/use-cart";
import { TProduct } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const ProductDetailsActions = ({ product }: { product: TProduct }) => {
  const { addItem } = useCart();
  const router = useRouter();

  const [selectedVariant, setSelectedVariant] = useState<
    TProduct["variants"][0] | null
  >(() => product.variants.find((v) => v.stock > 0) || null);

  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);

  const outOfStock = selectedVariant === null;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="text-muted-foreground flex gap-1.5 text-sm font-medium">
          Color:
          <span className="text-foreground">
            {selectedVariant?.colorName || "Out Of Stock"}
          </span>
        </div>
        <ToggleGroup
          type="single"
          variant="outline"
          className="flex-wrap gap-4 !shadow-none"
          value={JSON.stringify(selectedVariant)}
          disabled={outOfStock}
          onValueChange={(value) => {
            if (value) setSelectedVariant(JSON.parse(value));
          }}
        >
          {product.variants.map((v) => (
            <ToggleGroupItem
              asChild
              key={v.id}
              value={JSON.stringify(v)}
              disabled={v.stock < 1}
              size="lg"
              className="!bg-background data-[state=on]:border-primary flex-none rounded-lg !border"
            >
              <Color item={v} />
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        {!outOfStock && (
          <p className="text-destructive text-sm">
            {selectedVariant?.stock} items in stock
          </p>
        )}
      </div>
      {!outOfStock ? (
        <div className="flex flex-wrap gap-4">
          <QuantityButton
            key={selectedVariant?.id}
            size="lg"
            stockAmount={selectedVariant?.stock}
            quantity={selectedQuantity}
            onQuantityChange={setSelectedQuantity}
          />
          <AddToCartButton
            size="lg"
            variant="secondary"
            className="grow"
            product={product}
            productVariant={selectedVariant}
            quantity={selectedQuantity}
          />
          <Button
            size="lg"
            className="w-full"
            onClick={() => {
              if (!selectedVariant) {
                toast.error(
                  "Please select a product variant before purchasing.",
                );
                return;
              }
              addItem(product, selectedVariant, selectedQuantity);
              router.push("/checkout");
            }}
          >
            Buy Now
          </Button>
        </div>
      ) : (
        <Button size="lg" className="w-full" disabled>
          Out Of Stock
        </Button>
      )}
    </div>
  );
};

export default ProductDetailsActions;
