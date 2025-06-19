"use client";

import CartList from "@/components/cart/cart-list";
import CartPrices from "@/components/cart/cart-prices";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Empty from "@/components/ui/empty";
import { useCart } from "@/hooks/use-cart";
import Link from "next/link";

const Cart = () => {
  const { cart } = useCart();

  if (cart.itemsCount === 0)
    return <Empty>Your cart is currently empty!</Empty>;

  return (
    <div className="flex gap-x-16 gap-y-8 not-lg:flex-col">
      <CartList />
      <div className="w-full lg:max-w-sm">
        <Card>
          <CardContent>
            <CartPrices {...cart} />
          </CardContent>
          <CardFooter>
            <Button size="lg" asChild className="w-full">
              <Link href="/checkout">Checkout</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Cart;
