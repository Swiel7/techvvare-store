import { ClearCart } from "@/components/cart";
import { Button } from "@/components/ui/button";
import { stripe } from "@/lib/stripe";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Order confirmation" };

const OrderConfirmationPage = async (props: {
  searchParams: Promise<{ session_id?: string }>;
}) => {
  const searchParams = await props.searchParams;
  const sessionId = searchParams.session_id;

  if (!sessionId) throw new Error("noSessionId");

  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.status !== "complete") {
    const status = session.status === "open" ? "sessionOpen" : "sessionExpired";
    throw new Error(status);
  }

  const orderId = session.metadata?.orderId;

  return (
    <section className="flex min-h-[calc(100vh/1.5)] items-center justify-center">
      <div className="wrapper">
        <div className="flex w-full max-w-md flex-col items-center gap-6 lg:gap-8">
          <CheckCircle className="text-foreground size-16" />
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold">Your Order is Confirmed</h2>
            <p className="text-muted-foreground">
              Thanks for shopping! Your order hasn’t shipped yet, but we will
              send you and email when it done.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild variant="outline" className="flex-1">
              <Link href="/">Back To Home</Link>
            </Button>
            {orderId && (
              <>
                <Button size="lg" asChild className="flex-1">
                  <Link href={`/orders/${orderId}`}>View Order</Link>
                </Button>
                <ClearCart />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderConfirmationPage;
