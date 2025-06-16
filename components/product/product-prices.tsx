import { formatPrice } from "@/lib/utils";
import { TProduct } from "@/types";

const ProductPrices = ({
  discountPrice,
  regularPrice,
}: {
  discountPrice: TProduct["discountPrice"];
  regularPrice: TProduct["regularPrice"];
}) => {
  return (
    <div className="flex flex-wrap gap-1.5">
      <span className="font-medium">
        {formatPrice(discountPrice ?? regularPrice)}
      </span>
      {discountPrice && (
        <span className="text-muted-foreground line-through">
          {formatPrice(regularPrice)}
        </span>
      )}
    </div>
  );
};

export default ProductPrices;
