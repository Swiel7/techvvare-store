import { fulfillCheckout } from "@/lib/actions/checkout.actions";
import { stripe } from "@/lib/stripe";
import { handleErrorResponse } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  let event: Stripe.Event;

  try {
    const sig = request.headers.get("stripe-signature")!;
    const payload = await request.text();

    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    const errorResponse = handleErrorResponse(
      err,
      "Webhook verification failed: Invalid webhook signature",
    );
    return NextResponse.json(errorResponse.message, { status: 400 });
  }

  if (
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.async_payment_succeeded"
  ) {
    const session = event.data.object;
    const fulfilled = session.metadata?.orderFulfilled === "true";

    if (!fulfilled) {
      const fulfillmentResult = await fulfillCheckout(session.id);

      if (!fulfillmentResult.success) {
        return NextResponse.json(fulfillmentResult.message, { status: 500 });
      }
    }
  }

  return NextResponse.json({ received: true });
}
