import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";

export type ResponsiveAlertDialogProps =
  | {
      children?: React.ReactNode;
      title: string;
      description: string;
      trigger: React.ReactNode;
      open?: boolean;
      onOpenChange?: (isOpen: boolean) => void;
      onConfirm: () => void | Promise<void>;
      confirmLabel?: string;
      cancelLabel?: string;
    }
  | {
      children?: React.ReactNode;
      title: string;
      description: string;
      trigger?: never;
      open: boolean;
      onOpenChange: (isOpen: boolean) => void;
      onConfirm: () => void | Promise<void>;
      confirmLabel?: string;
      cancelLabel?: string;
    };

export function ResponsiveAlertDialog({
  children,
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  trigger,
}: ResponsiveAlertDialogProps) {
  const [isOpen, setIsOpen] = React.useState<boolean>(!!open);
  const [isPending, startTransition] = React.useTransition();
  const isMobile = useIsMobile();

  const handleChange = (isOpen: boolean) => {
    setIsOpen(isOpen);
    onOpenChange?.(isOpen);
  };

  const handleConfirm = () => {
    startTransition(async () => {
      await onConfirm();
      handleChange(false);
    });
  };

  if (!isMobile) {
    return (
      <AlertDialog open={isOpen} onOpenChange={handleChange}>
        {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          {children}
          <AlertDialogFooter>
            <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm} asChild>
              <Button loading={isPending}>{confirmLabel}</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={handleChange}>
      {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        {children}
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">{cancelLabel}</Button>
          </DrawerClose>
          <Button loading={isPending} onClick={handleConfirm}>
            {confirmLabel}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
