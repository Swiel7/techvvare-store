"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn, formatPrice } from "@/lib/utils";
import { Package } from "lucide-react";
import { FREE_SHIPPING_LIMIT } from "@/lib/constants";
import CartItem from "@/components/cart/cart-item";
import { useCart } from "@/hooks/use-cart";
import { ResponsiveAlertDialog } from "@/components/ui/responsive-alert-dialog";

const CartList = () => {
  const {
    cart: { items, itemsPrice },
    clearCart,
  } = useCart();

  const differenceToFree =
    itemsPrice >= FREE_SHIPPING_LIMIT ? 0 : FREE_SHIPPING_LIMIT - itemsPrice;

  const isFree = differenceToFree === 0;

  const progressValue = !isFree
    ? ((FREE_SHIPPING_LIMIT - differenceToFree) * 100) / FREE_SHIPPING_LIMIT
    : 100;

  return (
    <div className="flex grow flex-col gap-6">
      <Alert variant={isFree ? "success" : "default"}>
        <Package className="stroke-foreground" />
        <AlertTitle className="text-foreground pb-3">
          {isFree
            ? "Your order qualifies for free shipping!"
            : `Add ${formatPrice(differenceToFree)} to cart and get free shipping!`}
        </AlertTitle>
        <AlertDescription>
          <Progress
            value={progressValue}
            className={cn(
              isFree
                ? "*:data-[slot=progress-indicator]:bg-emerald-500"
                : "*:data-[slot=progress-indicator]:bg-muted-foreground",
            )}
          />
        </AlertDescription>
      </Alert>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={`${item.productId}-${item.variant.id}`}>
            <CartItem item={item} />
          </li>
        ))}
      </ul>
      <ResponsiveAlertDialog
        onConfirm={clearCart}
        title="Clear Cart Confirmation"
        description="Are you sure you want to remove all items from your cart? This action cannot be undone."
        trigger={
          <Button variant="outline" size="sm" className="ml-auto">
            Clear All
          </Button>
        }
      />
    </div>
  );
};

export default CartList;
