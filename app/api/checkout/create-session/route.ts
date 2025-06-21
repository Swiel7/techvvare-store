import { calculateCartTotals } from "@/hooks/use-cart";
import { authenticateUser } from "@/lib/actions/auth.actions";
import { createOrder } from "@/lib/actions/order.actions";
import { ALLOWED_COUNTRIES } from "@/lib/constants";
import { stripe } from "@/lib/stripe";
import { TCartItem } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { handleErrorResponse } from "@/lib/utils";
import { validateCartItems } from "@/lib/services/cart.service";

export async function POST(req: NextRequest) {
  try {
    const user = await authenticateUser();
    const cartItems = (await req.json()) as TCartItem[];

    const { validItems: orderItems, errors } =
      await validateCartItems(cartItems);

    if (errors.length > 0) {
      return NextResponse.json(errors[0], {
        status: errors[0].includes("not found") ? 404 : 400,
      });
    }

    const { shippingPrice, itemsPrice, totalPrice } =
      calculateCartTotals(orderItems);

    const createOrderResult = await createOrder({
      items: orderItems,
      itemsPrice,
      shippingPrice,
      totalPrice,
      shippingAddress: null,
      userId: user.id,
      paymentMethod: null,
    });

    if (!createOrderResult.success) {
      return NextResponse.json("Failed to create order!", { status: 500 });
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
      orderItems.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [
              `${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!}${item.image}`,
            ],
          },
          unit_amount: item.price,
        },
        quantity: item.quantity,
      }));

    const session = await stripe.checkout.sessions.create({
      ui_mode: "custom",
      mode: "payment",
      line_items,
      payment_method_types: ["card", "paypal"],
      shipping_address_collection: { allowed_countries: ALLOWED_COUNTRIES },
      shipping_options: [
        {
          shipping_rate_data: {
            display_name: "Shipping cost",
            type: "fixed_amount",
            fixed_amount: { amount: shippingPrice, currency: "usd" },
          },
        },
      ],
      customer_email: user.email,
      metadata: {
        userId: user.id || null,
        orderId: createOrderResult.data?.id || null,
        orderFulfilled: "false",
      },
      return_url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (error) {
    const { message } = handleErrorResponse(error, "Internal server error!");
    return new NextResponse(message, { status: 500 });
  }
}
