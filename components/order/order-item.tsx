import StyledImage from "@/components/ui/styled-image";
import { cn, formatPrice } from "@/lib/utils";
import { TCartItem } from "@/types";

const OrderItem = ({
  item,
  className,
}: {
  item: TCartItem;
  className?: string;
}) => {
  const { name, image, color, price, quantity } = item;

  return (
    <div className={cn("flex gap-4 rounded-lg border p-4", className)}>
      <StyledImage
        src={image}
        alt={name}
        wrapperClassName="size-16 shrink-0 rounded-lg border"
        sizes="64px"
      />
      <div className="flex grow flex-wrap justify-between gap-x-5 gap-y-1">
        <div className="flex flex-col justify-center gap-y-1">
          <h3 className="text-sm font-bold">{name}</h3>
          <span className="text-muted-foreground text-sm font-medium">
            Color: {color}
          </span>
        </div>
        <div className="flex flex-col justify-center gap-y-1">
          <span className="text-sm font-bold">{formatPrice(price)}</span>
          <span className="text-muted-foreground text-sm font-medium">
            Qty: {quantity}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
