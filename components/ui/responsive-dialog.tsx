import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollArea } from "@/components/ui/scroll-area";

export type ResponsiveDialogProps = {
  children: React.ReactNode;
  title: string;
  description?: string;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
};

export function ResponsiveDialog({
  children,
  open,
  onOpenChange,
  title,
  description,
  trigger,
}: ResponsiveDialogProps) {
  const [isOpen, setIsOpen] = React.useState<boolean>(!!open);
  const isMobile = useIsMobile();

  const handleChange = (isOpen: boolean) => {
    setIsOpen(isOpen);
    onOpenChange?.(isOpen);
  };

  if (!isMobile) {
    return (
      <Dialog open={isOpen} onOpenChange={handleChange}>
        {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
        <DialogContent className="gap-0 p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle>{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
          <ScrollArea className="*:data-[slot='scroll-area-viewport']:p-6">
            {children}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={handleChange}>
      {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
      <DrawerContent>
        <DrawerHeader className="pb-0 text-left">
          <DrawerTitle>{title}</DrawerTitle>
          {description && <DrawerDescription>{description}</DrawerDescription>}
        </DrawerHeader>
        <ScrollArea className="overflow-y-auto *:data-[slot='scroll-area-viewport']:p-4">
          {children}
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}
