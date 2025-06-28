import { Button } from "@/components/ui/button";
import { Rating } from "@/components/ui/rating";
import { TProduct } from "@/types";
import { ExternalLink, Package, Repeat, Truck } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import ProductPrices from "@/components/product/product-prices";
import WishlistButton from "@/components/product/wishlist-button";
import { cache } from "react";
import { checkProductOnWishlist } from "@/lib/services/product.service";
import ProductDetailsActions from "@/components/product/product-details-actions";

const ProductDetails = async ({ product }: { product: TProduct }) => {
  const { name, discountPrice, regularPrice, numReviews, rating, onSale } =
    product;
  const isOnWishlist = await cache(() => checkProductOnWishlist(product.id))();

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
      <ProductDetailsActions product={product} />
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
