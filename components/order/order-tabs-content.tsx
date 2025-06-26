import OrderItem from "@/components/order/order-item";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";
import { TabsContent } from "@/components/ui/tabs";
import { orderStatusColors } from "@/data";
import { formatDate, formatPrice } from "@/lib/utils";
import Link from "next/link";
import { getMyOrders } from "@/lib/services/order.service";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { cache } from "react";
import Empty from "@/components/ui/empty";
import { TOrder } from "@/types";

const OrderTabsContent = async ({
  value,
  status = "all",
  page = "1",
}: {
  value: string;
  status: TOrder["status"] | "all";
  page?: string;
}) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) redirect("/login");

  const { items: orders, totalPages } = await cache(() =>
    getMyOrders(userId, status, page),
  )();

  return (
    <TabsContent value={value}>
      {orders.length > 0 ? (
        <div className="space-y-6">
          <ul className="space-y-6">
            {orders.map(({ id, createdAt, status, items, totalPrice }) => (
              <li key={id}>
                <Card>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b p-4 !pt-0 lg:p-6">
                    <span className="font-bold">Order: {id}</span>
                    <span className="text-sm">{formatDate(createdAt)}</span>
                    <Badge
                      variant={orderStatusColors[status]}
                      className="capitalize"
                    >
                      {status}
                    </Badge>
                  </div>
                  <CardContent>
                    <ul className="space-y-4 divide-y lg:space-y-6">
                      {items.map((item) => (
                        <li key={`${item.name} ${item.color}`}>
                          <OrderItem
                            item={item}
                            className="border-none p-0 pb-4 lg:pb-6"
                          />
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap items-center justify-between gap-4 border-t pt-4 lg:pt-6">
                      <span className="text-lg font-bold">
                        Total: {formatPrice(totalPrice)}
                      </span>
                      <Button size="lg" asChild>
                        <Link href={`/orders/${id}`}>View Order Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
          {totalPages > 1 && <Pagination totalPages={totalPages} />}
        </div>
      ) : (
        <Empty className="text-left">No orders found.</Empty>
      )}
    </TabsContent>
  );
};

export default OrderTabsContent;
