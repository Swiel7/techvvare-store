"use client";

import { useCart } from "@/hooks/use-cart";
import { Appearance, loadStripe } from "@stripe/stripe-js";
import { TShippingAddress } from "@/types";
import { CheckoutProvider } from "@stripe/react-stripe-js";
import Empty from "@/components/ui/empty";
import { CheckoutForm } from "@/components/form";
import Loading from "@/components/ui/loading";
import { useState } from "react";

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const appearance = {
  variables: {
    fontFamily: "Plus Jakarta Sans, sans-serif",
    colorPrimary: "#171717",
    colorText: "#0a0a0a",
    borderRadius: "0.625rem",
    accordionItemSpacing: "1rem",
    spacingPickerItem: "1rem",
    gridRowSpacing: "1rem",
  },
} as Appearance;

const Checkout = ({
  shippingAddresses,
}: {
  shippingAddresses: TShippingAddress[];
}) => {
  const { cart } = useCart();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFirstAttempt, setIsFirstAttempt] = useState<boolean>(true);

  const fetchClientSecret = async () => {
    if (isFirstAttempt) {
      setIsLoading(true);
    }
    try {
      const response = await fetch("/api/checkout/create-session", {
        method: "POST",
        body: JSON.stringify(cart.items),
      });

      if (!response.ok) {
        throw new Error("checkoutSessionError");
      }
      const data = await response.json();
      return data.clientSecret;
    } catch (error) {
      console.error(error);
      throw new Error("checkoutSessionError");
    } finally {
      if (isFirstAttempt) {
        setIsLoading(false);
        setIsFirstAttempt(false);
      }
    }
  };

  if (cart.itemsCount === 0)
    return <Empty>Your cart is currently empty!</Empty>;

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <CheckoutProvider
      stripe={stripe}
      options={{ fetchClientSecret, elementsOptions: { appearance } }}
    >
      <CheckoutForm shippingAddresses={shippingAddresses} />
    </CheckoutProvider>
  );
};

export default Checkout;
