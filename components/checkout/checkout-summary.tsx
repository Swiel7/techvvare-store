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
      <CardContent>
        <ul className="mb-6 space-y-4">
          {cart.items.map((item) => (
            <li key={`${item.productId}-${item.variant.id}`}>
              <OrderItem
                item={item}
                className="border-none p-0 *:last:flex-nowrap not-sm:*:last:flex-col sm:*:last:*:last:text-right"
              />
            </li>
          ))}
        </ul>
        <CartPrices {...cart} />
      </CardContent>
      <CardFooter>
        <CheckoutButton />
      </CardFooter>
    </Card>
  );
};

export default CheckoutSummary;
