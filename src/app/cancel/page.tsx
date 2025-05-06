import { Suspense } from "react";
import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";
import { XCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { StripeSession } from "@/types";
import { CANCEL_METADATA, CURRENCY_ICON } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = CANCEL_METADATA;

async function getStripeSession(
  sessionId: string
): Promise<StripeSession | null> {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "line_items.data.price.product"],
    });
    return session as StripeSession;
  } catch (error) {
    console.error("Failed to fetch session:", error);
    return null;
  }
}

async function CancelContent({ sessionId }: { sessionId: string }) {
  const session = await getStripeSession(sessionId);

  if (!session) {
    redirect("/");
  }

  return (
    <div className="max-w-3xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="border border-neutral-200 rounded-lg p-6">
        <div className="flex items-center justify-center mb-6">
          <XCircle className="h-8 w-8 text-red-500 mr-4" />
          <h1 className="text-2xl font-bold text-neutral-900">
            Order Cancelled
          </h1>
        </div>

        <p className="text-neutral-600 mb-6 text-center">
          Your order has been cancelled. No payment has been processed.
        </p>

        <div className="border-t border-neutral-200 pt-4 mb-6">
          <h2 className="text-lg font-medium text-neutral-900 mb-4">
            Items Not Purchased
          </h2>

          <ul className="divide-y divide-neutral-200">
            {session.line_items?.data.map((item) => {
              const product = item.price?.product;

              return (
                <li key={item.id} className="py-4 flex">
                  {product?.images?.[0] && (
                    <div className="flex-shrink-0 w-16 h-16 border border-neutral-200 rounded-md overflow-hidden mr-4">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-center object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 flex flex-col">
                    <div>
                      <h3 className="text-sm font-medium text-neutral-900">
                        {product?.name}
                      </h3>
                    </div>
                    <div className="flex-1 flex items-end justify-between text-sm">
                      <p className="text-neutral-500">Qty {item.quantity}</p>
                      <p className="font-medium text-neutral-900">
                        {CURRENCY_ICON}
                        {(item.amount_total / 100).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-6 space-y-4">
          <Button asChild className="w-full">
            <Link href="/">Return to Store</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default async function CancelPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;

  if (!sessionId) {
    redirect("/");
  }

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-lg">Loading order details...</p>
        </div>
      }
    >
      <CancelContent sessionId={sessionId} />
    </Suspense>
  );
}