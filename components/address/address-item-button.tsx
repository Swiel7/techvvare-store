"use client";

import AddressDialog from "@/components/address/address-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ResponsiveAlertDialog } from "@/components/ui/responsive-alert-dialog";
import { TShippingAddress } from "@/types";
import { Edit, EllipsisVertical, Trash2 } from "lucide-react";
import { useState } from "react";

const AddressItemButton = ({
  addressData,
  userId,
}: {
  addressData: TShippingAddress;
  userId: string;
}) => {
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <EllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-32" align="end">
          <DropdownMenuItem asChild>
            <button className="w-full" onClick={() => setIsEditOpen(true)}>
              <Edit /> Edit
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <button className="w-full" onClick={() => setIsDeleteOpen(true)}>
              <Trash2 /> Delete
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isEditOpen && (
        <AddressDialog
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          address={addressData}
          userId={userId}
          mode="edit"
        />
      )}
      {isDeleteOpen && (
        <ResponsiveAlertDialog
          open={isDeleteOpen}
          onOpenChange={setIsDeleteOpen}
          onConfirm={() => console.log("deleteShippingAddress")}
          title="Are you absolutely sure?"
          description="This action cannot be undone. This will permanently delete your shipping address from our database."
        />
      )}
    </>
  );
};

export default AddressItemButton;
