"use client";

import { Button } from "@/components/ui/button";
import { ALLOWED_COUNTRIES } from "@/lib/constants";
import { TShippingAddress } from "@/types";
import { AddressElement } from "@stripe/react-stripe-js";

const AddressForm = ({
  addressData,
  userId,
  mode,
}: {
  addressData?: TShippingAddress;
  userId: string;
  mode: "add" | "edit";
}) => {
  console.log(userId);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(e);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <AddressElement
        options={{
          allowedCountries: ALLOWED_COUNTRIES,
          mode: "shipping",
          display: { name: "split" },
          ...(mode === "edit" && addressData && { defaultValues: addressData }),
        }}
      />
      <Button type="submit" size="lg" className="w-full">
        {mode === "add" ? "Add Address" : "Update Address"}
      </Button>
    </form>
  );
};

export default AddressForm;
