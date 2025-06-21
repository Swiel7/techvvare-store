"use server";

import { db } from "@/db";
import { orders } from "@/db/schema";
import { TActionResult, TOrder } from "@/types";
import { authenticateUser } from "./auth.actions";
import { generateOrderId } from "@/lib/services/order.service";
import { handleErrorResponse } from "@/lib/utils";
import { eq, InferInsertModel } from "drizzle-orm";

export const createOrder = async (
  values: Omit<InferInsertModel<typeof orders>, "id">,
): Promise<TActionResult<TOrder>> => {
  try {
    await authenticateUser();
    const id = await generateOrderId();

    const [newOrder] = await db
      .insert(orders)
      .values({ ...values, id })
      .returning();

    return {
      success: true,
      message: "Order created successfully!",
      data: newOrder,
    };
  } catch (error) {
    return handleErrorResponse(error, "An unexpected error occurred!");
  }
};

export const updateOrder = async (
  orderId: string,
  values: Partial<InferInsertModel<typeof orders>>,
): Promise<TActionResult<TOrder>> => {
  try {
    const [updatedOrder] = await db
      .update(orders)
      .set(values)
      .where(eq(orders.id, orderId))
      .returning();

    return {
      success: true,
      message: "Order updated successfully!",
      data: updatedOrder,
    };
  } catch (error) {
    return handleErrorResponse(error, "An unexpected error occurred!");
  }
};
