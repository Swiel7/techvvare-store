import { CartPrices } from "@/components/cart";
import OrderItem from "@/components/order/order-item";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UserAvatar from "@/components/ui/user-avatar";
import { orderStatusColors } from "@/data";
import { cn, formatDate, formatPrice } from "@/lib/utils";
import { TOrder, TOrderWithUserInfo } from "@/types";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

const OrderCardHeader = ({ orderId }: { orderId: string }) => {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <CardTitle>Order: {orderId}</CardTitle>
      <Button variant="outline" asChild>
        <Link href="/orders" className="flex items-center gap-2">
          <MoveLeft />
          Back
        </Link>
      </Button>
    </div>
  );
};

const OrderCardInfo = ({ order }: { order: TOrder }) => {
  const { isPaid, createdAt, status, totalPrice, paymentMethod } = order;

  return (
    <Card className="!gap-4">
      <CardHeader>
        <CardTitle className="text-lg lg:text-xl">Order Information</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-4 sm:grid-flow-col">
          <OrderCardInfoItem title="Date">
            <span>{formatDate(createdAt)}</span>
          </OrderCardInfoItem>
          <OrderCardInfoItem title="Payment Method">
            <span className="capitalize">{paymentMethod}</span>
          </OrderCardInfoItem>
          <OrderCardInfoItem title="Paid">
            <Badge variant={isPaid ? "success" : "destructive"}>
              {isPaid ? "Yes" : "No"}
            </Badge>
          </OrderCardInfoItem>
          <OrderCardInfoItem title="Status">
            <Badge variant={orderStatusColors[status]} className="capitalize">
              {status}
            </Badge>
          </OrderCardInfoItem>
          <OrderCardInfoItem title="Total">
            <span>{formatPrice(totalPrice)}</span>
          </OrderCardInfoItem>
        </ul>
      </CardContent>
    </Card>
  );
};

const OrderCardInfoItem = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <li className="flex flex-col gap-2 text-sm font-medium">
      <span className="text-muted-foreground">{title}</span>
      {children}
    </li>
  );
};

const OrderCardItems = ({ order }: { order: TOrder }) => {
  return (
    <Card className="!gap-4">
      <CardHeader>
        <CardTitle className="text-lg lg:text-xl">Products Ordered</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-4">
          {order.items.map((item) => (
            <li key={`${order.id}${item.name} ${item.color}`}>
              <OrderItem item={item} />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

const OrderCardPayment = ({ order }: { order: TOrder }) => {
  return (
    <Card className="!gap-4">
      <CardHeader>
        <CardTitle className="text-lg lg:text-xl">Payment</CardTitle>
      </CardHeader>
      <CardContent>
        <CartPrices {...order} />
      </CardContent>
    </Card>
  );
};

const OrderCardCustomer = ({
  user,
  shippingAddress,
}: {
  user: TOrderWithUserInfo["user"];
  shippingAddress: TOrderWithUserInfo["shippingAddress"] | null;
}) => {
  return (
    <Card>
      <CardHeader className={cn("gap-6", shippingAddress && "border-b")}>
        <CardTitle className="text-lg lg:text-xl">Customer</CardTitle>
        <UserAvatar className="*:first:size-12 *:last:**:text-sm" user={user} />
      </CardHeader>
      {shippingAddress &&
        (() => {
          const { city, country, postal_code, state, line1, line2 } =
            shippingAddress.address;
          return (
            <CardContent>
              <h4 className="mb-4 font-bold">Shipping Address</h4>
              <address className="space-y-1 text-sm font-medium not-italic">
                <h3>{shippingAddress.name}</h3>
                <p>
                  {line1}, {line2}
                </p>
                <p>
                  {city}, {state} {postal_code} {country}
                </p>
              </address>
            </CardContent>
          );
        })()}
    </Card>
  );
};

export {
  OrderCardHeader,
  OrderCardInfo,
  OrderCardItems,
  OrderCardPayment,
  OrderCardCustomer,
};
