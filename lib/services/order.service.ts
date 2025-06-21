import { db } from "@/db";
import { orders } from "@/db/schema";
import { eq } from "drizzle-orm";
import { generateUniqueId } from "@/lib/utils";

export const generateOrderId = async (): Promise<string> => {
  return generateUniqueId("ORD", 8, async (id) => {
    const exists = await db.query.orders.findFirst({
      where: eq(orders.id, id),
    });
    return !!exists;
  });
};
