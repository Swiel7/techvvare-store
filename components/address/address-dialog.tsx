"use client";

import { AddressForm } from "@/components/form";
import {
  ResponsiveDialog,
  ResponsiveDialogProps,
} from "@/components/ui/responsive-dialog";
import { TShippingAddress } from "@/types";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

type AddressDialogProps = {
  addressData?: TShippingAddress;
  userId: string;
  mode: "add" | "edit";
} & Pick<ResponsiveDialogProps, "open" | "onOpenChange" | "trigger">;

const AddressDialog = ({
  addressData,
  userId,
  mode,
  ...dialogProps
}: AddressDialogProps) => {
  return (
    <Elements stripe={stripe}>
      <ResponsiveDialog
        title={mode === "add" ? "Add New Address" : "Edit Address"}
        {...dialogProps}
      >
        <AddressForm {...{ addressData, userId, mode }} />
      </ResponsiveDialog>
    </Elements>
  );
};

export default AddressDialog;
