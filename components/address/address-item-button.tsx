"use client";

import { AddressForm } from "@/components/form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ResponsiveAlertDialog } from "@/components/ui/responsive-alert-dialog";
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
import { deleteShippingAddress } from "@/lib/actions/user.actions";
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
        <ResponsiveDialog
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          title="Edit Address"
        >
          <AddressForm
            onOpenChange={setIsEditOpen}
            addressData={addressData}
            userId={userId}
            mode="edit"
          />
        </ResponsiveDialog>
      )}
      {isDeleteOpen && (
        <ResponsiveAlertDialog
          open={isDeleteOpen}
          onOpenChange={setIsDeleteOpen}
          onConfirm={deleteShippingAddress.bind(null, addressData.id!, userId)}
          title="Are you absolutely sure?"
          description="This action cannot be undone. This will permanently delete your shipping address from our database."
        />
      )}
    </>
  );
};

export default AddressItemButton;
