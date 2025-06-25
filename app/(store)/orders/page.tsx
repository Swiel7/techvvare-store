import { OrderTabs, OrderTabsContent } from "@/components/order";
import { CardTitle } from "@/components/ui/card";

export const metadata = { title: "Orders" };
export const revalidate = 3600;

const OrdersPage = async (props: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await props.searchParams;

  return (
    <section>
      <div className="wrapper">
        <CardTitle className="mb-6">Your Orders</CardTitle>
        <OrderTabs>
          <OrderTabsContent status="all" page={page} />
          <OrderTabsContent status="pending" page={page} />
          <OrderTabsContent status="delivered" page={page} />
          <OrderTabsContent status="refunded" page={page} />
        </OrderTabs>
      </div>
    </section>
  );
};

export default OrdersPage;
