"use client";

import { Button } from "@/components/ui/button";
import {
  createShippingAddress,
  updateShippingAddress,
} from "@/lib/actions/user.actions";
import { ALLOWED_COUNTRIES } from "@/lib/constants";
import { handleErrorResponse } from "@/lib/utils";
import { TShippingAddress } from "@/types";
import { AddressElement, useElements } from "@stripe/react-stripe-js";
import { useTransition } from "react";
import { toast } from "sonner";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ResponsiveDialogProps } from "@/components/ui/responsive-dialog";

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

type AddressFormProps = {
  addressData?: TShippingAddress;
  userId: string;
  mode: "add" | "edit";
} & Pick<ResponsiveDialogProps, "onOpenChange">;

const AddressForm = (props: AddressFormProps) => {
  return (
    <Elements stripe={stripe}>
      <Form {...props} />
    </Elements>
  );
};

export default AddressForm;

const Form = ({
  addressData,
  userId,
  mode,
  onOpenChange,
}: AddressFormProps) => {
  const elements = useElements();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        const addressElement = elements?.getElement("address");
        if (!addressElement) throw new Error("Address element not found!");

        const { complete, value: address } = await addressElement.getValue();

        if (complete) {
          const { success, message } =
            mode === "edit" && addressData?.id
              ? await updateShippingAddress(address, addressData.id, userId)
              : await createShippingAddress(address, userId);

          if (success) {
            onOpenChange?.(false);
            toast.success("Success", { description: message });
          } else {
            toast.error("Error", { description: message });
          }
        }
      } catch (error) {
        const { message } = handleErrorResponse(
          error,
          "An unexpected error occurred!",
        );
        toast.error("Error", { description: message });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <AddressElement
        options={{
          allowedCountries: ALLOWED_COUNTRIES,
          mode: "shipping",
          display: { name: "split" },
          defaultValues: (() => {
            if (addressData) {
              const { address, name } = addressData;
              const [firstName, ...lastName] = name.split(" ");
              return { address, firstName, lastName: lastName.join(" ") };
            }
            return {};
          })(),
        }}
      />
      <Button type="submit" size="lg" className="w-full" loading={isPending}>
        {mode === "add" ? "Add Address" : "Update Address"}
      </Button>
    </form>
  );
};
