import { cn, formatPrice } from "@/lib/utils";

const CartPrices = ({
  itemsPrice,
  shippingPrice,
  totalPrice,
}: {
  itemsPrice: number;
  shippingPrice: number;
  totalPrice: number;
}) => {
  const isFree = shippingPrice === 0;

  return (
    <div>
      <div className="border-b">
        <div className="flex justify-between pb-4">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium">{formatPrice(itemsPrice)}</span>
        </div>
        <div className="flex justify-between pb-4">
          <span className="text-muted-foreground">Shipping</span>
          <span
            className={cn(
              "font-medium",
              isFree && "text-emerald-500 uppercase",
            )}
          >
            {isFree ? "Free" : formatPrice(shippingPrice)}
          </span>
        </div>
      </div>
      <div className="flex justify-between pt-4 text-lg font-bold">
        <span>Total</span>
        <span>{formatPrice(totalPrice)}</span>
      </div>
    </div>
  );
};

export default CartPrices;
