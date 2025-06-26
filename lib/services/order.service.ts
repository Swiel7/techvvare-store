import { db } from "@/db";
import { orders } from "@/db/schema";
import { and, desc, eq, SQL } from "drizzle-orm";
import {
  calculatePagination,
  generateUniqueId,
  getTotalCount,
} from "@/lib/utils";
import { TOrder, TOrderWithUserInfo, TPaginationData } from "@/types";
import { ORDERS_PER_PAGE } from "@/lib/constants";

export const generateOrderId = async (): Promise<string> => {
  return generateUniqueId("ORD", 8, async (id) => {
    const exists = await db.query.orders.findFirst({
      where: eq(orders.id, id),
    });
    return !!exists;
  });
};

export const getMyOrders = async (
  userId: string,
  status: TOrder["status"] | "all",
  page = "1",
  limit = ORDERS_PER_PAGE,
): Promise<TPaginationData<TOrder>> => {
  const conditions: SQL[] = [
    eq(orders.userId, userId),
    eq(orders.isPaid, true),
  ];
  const { currentPage, offset } = calculatePagination(page, limit);

  if (status !== "all") conditions.push(eq(orders.status, status));

  const where = conditions.length > 0 ? and(...conditions) : conditions[0];

  const [items, totalItems] = await Promise.all([
    db
      .select()
      .from(orders)
      .where(where)
      .orderBy(desc(orders.createdAt))
      .offset(offset)
      .limit(limit),

    getTotalCount(orders, where),
  ]);

  const totalPages = Math.ceil(totalItems / limit);
  return { items, totalItems, totalPages, currentPage };
};

export const getOrderById = async (
  orderId: string,
): Promise<TOrderWithUserInfo | null> => {
  const order = await db.query.orders.findFirst({
    where: eq(orders.id, orderId),
    with: {
      user: { columns: { email: true, firstName: true, lastName: true } },
    },
  });

  return order || null;
};
