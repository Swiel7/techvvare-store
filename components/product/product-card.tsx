import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { TProduct } from "@/types";
import Link from "next/link";
import { Rating } from "@/components/ui/rating";
import { Card, CardContent } from "@/components/ui/card";
import WishlistButton from "@/components/product/wishlist-button";
import ProductPrices from "@/components/product/product-prices";
import AddToCartButton from "@/components/product/add-to-cart-button";
import StyledImage from "@/components/ui/styled-image";

const ProductCard = ({
  product,
  variant = "vertical",
}: {
  product: TProduct;
  variant?: "vertical" | "horizontal";
}) => {
  const isOnWishlist: boolean = false;

  return (
    <Card
      className={cn(
        "h-full gap-0 !py-0",
        variant === "horizontal" && "flex-row",
      )}
    >
      <div
        className={cn(
          "bg-muted relative",
          variant === "horizontal"
            ? "w-1/3 min-w-32 shrink-0 rounded-l-lg"
            : "rounded-t-lg",
        )}
      >
        <Link href={`/products/${product.slug}`}>
          <StyledImage
            src={product.images[0]}
            alt={product.name}
            sizes="(max-width: 500px) 100vw, (max-width: 740px) 50vw, (max-width: 990px) 33vw, 25vw"
          />
        </Link>
        {product.discountPrice && (
          <Badge className="absolute top-[5%] left-[5%]">
            -
            {Math.round(
              ((product.regularPrice - product.discountPrice) * 100) /
                product.regularPrice,
            )}
            %
          </Badge>
        )}
        <WishlistButton
          isOnWishlist={isOnWishlist}
          productId={product.id}
          className="hover:*:fill-primary absolute top-[5%] right-[5%] size-8 *:!size-5"
        />
      </div>
      <CardContent className="flex grow flex-col gap-4 not-sm:!p-3 sm:!p-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <Rating value={Number(product.rating)} disabled />
            <span className="text-muted-foreground text-sm whitespace-nowrap">
              ({product.numReviews} reviews)
            </span>
          </div>
          <Link href={`/products/${product.slug}`} className="hover:underline">
            <h3 className="font-medium">{product.name}</h3>
          </Link>
          <ProductPrices
            discountPrice={product.discountPrice}
            regularPrice={product.regularPrice}
          />
        </div>
        <AddToCartButton
          product={product}
          quantity={1}
          productVariant={product.variants[0]}
          className="mt-auto"
        />
      </CardContent>
    </Card>
  );
};

export default ProductCard;
