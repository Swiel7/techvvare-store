"use client";

import { Button } from "@/components/ui/button";
import { Color } from "@/components/ui/color";
import { QuantityButton } from "@/components/ui/quantity-button";
import { Rating } from "@/components/ui/rating";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { TProduct } from "@/types";
import { ExternalLink, Package, Repeat, Truck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { MAX_QUANTITY } from "@/lib/constants";
import ProductPrices from "@/components/product/product-prices";
import AddToCartButton from "@/components/product/add-to-cart-button";
import WishlistButton from "@/components/product/wishlist-button";

const ProductDetails = ({
  product,
  isOnWishlist,
}: {
  product: TProduct;
  isOnWishlist: boolean;
}) => {
  const {
    name,
    discountPrice,
    regularPrice,
    numReviews,
    rating,
    variants,
    onSale,
  } = product;

  const [selectedVariant, setSelectedVariant] = useState<
    TProduct["variants"][0] | null
  >(() => variants.find((v) => v.stock > 0) || null);

  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);

  const outOfStock = selectedVariant === null;

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-3">
        <h3 className="text-3xl font-bold lg:text-4xl">{name}</h3>
        <div className="flex flex-wrap items-center gap-1.5">
          <Rating value={Number(rating)} disabled />
          <span className="text-muted-foreground text-sm whitespace-nowrap">
            ({numReviews} reviews)
          </span>
        </div>
        <div className="flex gap-1.5">
          <ProductPrices
            discountPrice={discountPrice}
            regularPrice={regularPrice}
          />
          {onSale && (
            <Badge variant="success" className="ml-3">
              On Sale
            </Badge>
          )}
        </div>
      </div>
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
          {variants.map((v) => (
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
      </div>
      {!outOfStock ? (
        <div className="flex flex-wrap gap-4">
          <QuantityButton
            key={selectedVariant?.id}
            size="lg"
            quantity={Math.min(selectedVariant?.stock, selectedQuantity)}
            maxQuantity={Math.min(selectedVariant?.stock, MAX_QUANTITY)}
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
            onClick={() => console.log("add to cart")}
          >
            Buy Now
          </Button>
        </div>
      ) : (
        <Button size="lg" className="w-full" disabled>
          Out Of Stock
        </Button>
      )}
      <ul className="flex flex-wrap gap-x-4 gap-y-1">
        <li>
          <WishlistButton
            isOnWishlist={isOnWishlist}
            productId={product.id}
            withText
          />
        </li>
        <li>
          <Button variant="ghost" size="sm">
            <Repeat />
            Compare
          </Button>
        </li>
        <li>
          <Button variant="ghost" size="sm">
            <ExternalLink />
            Share
          </Button>
        </li>
      </ul>
      <ul className="text-muted-foreground space-y-4">
        <li className="flex items-center gap-3">
          <Truck /> <p>Free worldwide shipping on all order over $200</p>
        </li>
        <li className="flex items-center gap-3">
          <Package />
          <p className="flex flex-wrap items-center gap-x-3">
            Delivers in 2-4 working days
            <Button asChild variant="link" size="sm" className="h-7 px-0">
              <Link href="/">Shipping & Return</Link>
            </Button>
          </p>
        </li>
      </ul>
    </div>
  );
};

export default ProductDetails;
