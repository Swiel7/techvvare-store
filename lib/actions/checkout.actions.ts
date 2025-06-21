"use server";

import { TActionResult, TShippingAddress } from "@/types";
import Stripe from "stripe";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { stripe } from "@/lib/stripe";
import { createShippingAddress } from "@/lib/actions/user.actions";
import { handleErrorResponse } from "@/lib/utils";
import { products } from "@/db/schema";
import { updateOrder } from "@/lib/actions/order.actions";

export const fulfillCheckout = async (
  stripeSessionId: string,
): Promise<TActionResult> => {
  try {
    const session = await stripe.checkout.sessions.retrieve(stripeSessionId, {
      expand: ["payment_intent.payment_method"],
    });

    const paymentIntent = session.payment_intent as Stripe.PaymentIntent;
    const paymentMethod = (paymentIntent.payment_method as Stripe.PaymentMethod)
      .type;
    const shippingDetails = session.collected_information?.shipping_details;

    const shippingAddress: TShippingAddress = {
      name: shippingDetails?.name || "",
      address: {
        city: shippingDetails?.address.city || "",
        country: shippingDetails?.address.country || "",
        line1: shippingDetails?.address.line1 || "",
        line2: shippingDetails?.address.line2 || "",
        postal_code: shippingDetails?.address.postal_code || "",
        state: shippingDetails?.address.state || "",
      },
    };

    await db.transaction(async (tx) => {
      const result = await updateOrder(session.metadata!.orderId, {
        isPaid: true,
        paymentMethod,
        shippingAddress,
      });

      if (result.success && result.data) {
        for (const item of result.data.items) {
          const { success } = await updateProductStock(
            item.productId,
            item.variant.id,
            -item.quantity,
          );

          if (!success) tx.rollback();
        }

        await createShippingAddress(shippingAddress, session.metadata!.userId);

        await stripe.checkout.sessions.update(stripeSessionId, {
          metadata: { ...session.metadata, orderFulfilled: "true" },
        });
      }
    });
    return { success: true, message: "Checkout fulfilled successfully!" };
  } catch (error) {
    return handleErrorResponse(error, "Fulfillment failed!");
  }
};

export const updateProductStock = async (
  productId: string,
  variantId: string,
  quantityChange: number,
): Promise<TActionResult> => {
  try {
    const [product] = await db
      .select()
      .from(products)
      .where(eq(products.id, productId));

    const updatedVariants = product.variants.map((v) =>
      v.id === variantId ? { ...v, stock: v.stock + quantityChange } : v,
    );

    await db
      .update(products)
      .set({ variants: updatedVariants })
      .where(eq(products.id, productId));

    return { success: true, message: "Product stock updated successfully!" };
  } catch (error) {
    return handleErrorResponse(error, "Failed to update product stock!");
  }
};
