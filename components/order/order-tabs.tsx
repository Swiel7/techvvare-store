"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TOrder } from "@/types";
import { useRouter } from "next/navigation";

const OrderTabs = ({
  children,
  status = "all",
}: {
  children: React.ReactNode;
  status: TOrder["status"] | "all";
}) => {
  const router = useRouter();

  return (
    <Tabs
      defaultValue={status}
      onValueChange={(value) => router.replace(`?status=${value}&page=1`)}
    >
      <TabsList className="*:flex-1">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="pending">Pending</TabsTrigger>
        <TabsTrigger value="delivered">Delivered</TabsTrigger>
        <TabsTrigger value="refunded">Refunded</TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
};

export default OrderTabs;
