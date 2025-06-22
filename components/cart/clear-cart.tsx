"use client";

import { useCart } from "@/hooks/use-cart";
import { useEffect } from "react";

const ClearCart = () => {
  const { clearCart, cart } = useCart();
  const numOfItems = cart.items.length;

  useEffect(() => {
    if (numOfItems > 0) clearCart();
  }, [clearCart, numOfItems]);

  return null;
};

export default ClearCart;
