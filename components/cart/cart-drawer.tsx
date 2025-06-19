"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCart } from "@/hooks/use-cart";
import { Badge } from "@/components/ui/badge";
import CartItem from "@/components/cart/cart-item";
import Empty from "@/components/ui/empty";

const CartDrawer = () => {
  const {
    cart: { items, itemsCount, totalPrice },
  } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative size-10">
          <ShoppingCart />
          {itemsCount > 0 && (
            <Badge className="absolute -top-1 right-0 aspect-square min-h-4 min-w-4 rounded-full p-1 leading-0">
              {itemsCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full max-w-sm" side="right">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        {itemsCount > 0 ? (
          <>
            <ScrollArea className="min-h-0 px-4 lg:px-6">
              <ul className="divide-y">
                {items.map((item) => (
                  <li key={`${item.productId}-${item.variant.id}`}>
                    <CartItem
                      item={item}
                      className="border-none *:!px-0 **:data-[slot=cart-item-data]:gap-1 **:data-[slot=cart-item-data]:text-sm **:data-[slot=cart-item-image-container]:size-20"
                    />
                  </li>
                ))}
              </ul>
            </ScrollArea>
            <SheetFooter className="bg-background sticky bottom-0 gap-4 !pt-0 lg:gap-6">
              <div className="flex justify-between border-t pt-4 text-lg font-bold">
                <span>Total</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex gap-4">
                <SheetClose asChild className="flex-1">
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/cart">View Cart</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button size="lg" asChild className="flex-1">
                    <Link href="/checkout">Checkout</Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetFooter>
          </>
        ) : (
          <Empty>Your cart is currently empty!</Empty>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
