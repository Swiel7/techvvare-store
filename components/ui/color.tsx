"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { TFilterOptionColor } from "@/types";
import { cn } from "@/lib/utils";

export const Color = ({
  className,
  item,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root> & {
  item: TFilterOptionColor;
}) => {
  const { colorName, colorCode } = item;

  return (
    <CheckboxPrimitive.Root
      data-slot="color"
      className={cn(
        "peer border-input data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 before:bg-primary relative inline-flex h-8 shrink-0 cursor-pointer items-center gap-2 rounded-lg border p-1.5 pr-3 shadow-xs transition-[color,box-shadow] outline-none before:invisible before:absolute before:top-1/2 before:left-0 before:h-px before:w-full focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:!opacity-40 disabled:before:visible",
        className,
      )}
      {...props}
    >
      <div
        data-slot="color-circle"
        className="aspect-square h-full rounded-full border bg-current shadow-2xl"
        style={{ color: colorCode }}
      />
      {colorName}
    </CheckboxPrimitive.Root>
  );
};
