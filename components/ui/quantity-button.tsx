"use client";

import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "./button";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Input } from "./input";
import { MAX_QUANTITY } from "@/lib/constants";
import { cn } from "@/lib/utils";

type QuantityButtonProps = React.ComponentProps<"button"> &
  VariantProps<Exclude<typeof buttonVariants, "size">> & {
    stockAmount: number;
    quantity: number;
    onQuantityChange: (value: number) => void;
  };

export const QuantityButton = ({
  className,
  variant = "outline",
  stockAmount,
  quantity,
  onQuantityChange,
  ...props
}: QuantityButtonProps) => {
  const maxQuantity = Math.min(stockAmount, MAX_QUANTITY);
  const currentQuantity = Math.min(stockAmount, quantity);

  const [value, setValue] = useState<number>(currentQuantity);
  const [inputValue, setInputValue] = useState<string>(
    currentQuantity.toString(),
  );

  const updateValue = (newValue: number) => {
    setValue(newValue);
    setInputValue(newValue.toString());
    onQuantityChange?.(newValue);
  };

  const increment = () => {
    if (value < maxQuantity) updateValue(value + 1);
  };

  const decrement = () => {
    if (value > 1) updateValue(value - 1);
  };

  const handleBlur = () => {
    const parsed = parseInt(inputValue, 10);
    const isValid = !isNaN(parsed) && parsed > 0 && parsed <= maxQuantity;

    if (isValid) updateValue(parsed);
    else setInputValue(value.toString());
  };

  return (
    <div
      className={cn(
        "*:!bg-background flex h-14 *:aspect-[3/4] *:h-full *:focus:z-10",
        className,
      )}
    >
      <button
        data-slot="quantity-btn"
        className={cn(buttonVariants({ variant }), "rounded-r-none border-r-0")}
        onClick={decrement}
        {...props}
      >
        <Minus />
      </button>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={handleBlur}
        className="rounded-none border-x-0 px-0 text-center font-medium [&]:text-base"
      />
      <button
        data-slot="quantity-btn"
        className={cn(buttonVariants({ variant }), "rounded-l-none border-l-0")}
        onClick={increment}
        {...props}
      >
        <Plus />
      </button>
    </div>
  );
};
