import {
  OrderCardCustomer,
  OrderCardHeader,
  OrderCardInfo,
  OrderCardItems,
  OrderCardPayment,
} from "@/components/order/order-card";
import SectionBreadcrumb, {
  TBreadcrumbItem,
} from "@/components/ui/section-breadcrumb";
import { getOrderById } from "@/lib/services/order.service";
import { notFound } from "next/navigation";
import { cache } from "react";

export const metadata = { title: "Order Details" };
export const revalidate = 3600;

const breadcrumbItems: TBreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: "Orders", href: "/orders" },
  { label: "Order Details" },
];

const OrderDetailsPage = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;

  const order = await cache(() => getOrderById(id))();
  if (!order) notFound();

  return (
    <>
      <SectionBreadcrumb items={breadcrumbItems} />
      <section>
        <div className="wrapper">
          <OrderCardHeader orderId={id} />
          <div className="flex gap-6 not-lg:flex-col">
            <div className="flex grow flex-col gap-6">
              <OrderCardInfo order={order} />
              <OrderCardItems items={order.items} />
              <OrderCardPayment order={order} />
            </div>
            <div className="w-full lg:max-w-80">
              <OrderCardCustomer
                user={order.user}
                shippingAddress={order.shippingAddress}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderDetailsPage;
