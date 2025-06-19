"use client";

import { CartPrices } from "@/components/cart";
import CheckoutButton from "@/components/checkout/checkout-button";
import { OrderItem } from "@/components/order";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useCart } from "@/hooks/use-cart";

const CheckoutSummary = () => {
  const { cart } = useCart();

  return (
    <Card>
      <ul className="w-full">
        {cart.items.map((item) => (
          <li key={`${item.productId}-${item.variant.id}`}>
            <OrderItem
              item={item}
              className="border-none *:last:flex-nowrap not-sm:*:last:flex-col sm:*:last:*:last:text-right"
            />
          </li>
        ))}
      </ul>
      <CardContent>
        <CartPrices {...cart} />
      </CardContent>
      <CardFooter>
        <CheckoutButton />
      </CardFooter>
    </Card>
  );
};

export default CheckoutSummary;
