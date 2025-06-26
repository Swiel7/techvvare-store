import { OrderTabs, OrderTabsContent } from "@/components/order";
import { CardTitle } from "@/components/ui/card";
import { validateOrderStatus } from "@/lib/utils";

export const metadata = { title: "Orders" };
export const revalidate = 3600;

const OrdersPage = async (props: {
  searchParams: Promise<{ page?: string; status?: string }>;
}) => {
  const { page, status: statusFromUrl } = await props.searchParams;
  const status = validateOrderStatus(statusFromUrl);

  return (
    <section>
      <div className="wrapper">
        <CardTitle className="mb-6">Your Orders</CardTitle>
        <OrderTabs status={status}>
          <OrderTabsContent value="all" status={status} page={page} />
          <OrderTabsContent value="pending" status={status} page={page} />
          <OrderTabsContent value="delivered" status={status} page={page} />
          <OrderTabsContent value="refunded" status={status} page={page} />
        </OrderTabs>
      </div>
    </section>
  );
};

export default OrdersPage;
