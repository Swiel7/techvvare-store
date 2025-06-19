"use client";

import { useCart } from "@/hooks/use-cart";
import { Appearance, loadStripe } from "@stripe/stripe-js";
import { TCartItem, TShippingAddress } from "@/types";
import { CheckoutProvider } from "@stripe/react-stripe-js";
import Empty from "@/components/ui/empty";
import { CheckoutForm } from "@/components/form";

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const getClientSecret = (cartItems: TCartItem[]) => {
  return fetch("/api/checkout/create-session", {
    method: "POST",
    body: JSON.stringify(cartItems),
  })
    .then((res) => res.json())
    .then((data) => data.clientSecret);
};

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
  shippingAddress,
}: {
  shippingAddress: TShippingAddress[];
}) => {
  const { cart } = useCart();

  if (cart.itemsCount === 0)
    return <Empty>Your cart is currently empty!</Empty>;

  return (
    <CheckoutProvider
      stripe={stripe}
      options={{
        fetchClientSecret: () => getClientSecret(cart.items),
        elementsOptions: { appearance },
      }}
    >
      <CheckoutForm shippingAddress={shippingAddress} />
    </CheckoutProvider>
  );
};

export default Checkout;
