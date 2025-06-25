"use client";

import { AddressForm } from "@/components/form";
import { Button } from "@/components/ui/button";
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
import { useState } from "react";

const AddAddressDialog = ({ userId }: { userId: string }) => {
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);

  return (
    <>
      <Button size="lg" onClick={() => setIsAddOpen(true)}>
        Add New Address
      </Button>
      {isAddOpen && (
        <ResponsiveDialog
          open={isAddOpen}
          onOpenChange={setIsAddOpen}
          title="Add New Address"
        >
          <AddressForm onOpenChange={setIsAddOpen} userId={userId} mode="add" />
        </ResponsiveDialog>
      )}
    </>
  );
};

export default AddAddressDialog;
