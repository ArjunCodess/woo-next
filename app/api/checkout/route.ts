import { NextResponse } from "next/server";
import { CartItem } from "@/types";
import { CURRENCY_NAME } from "@/lib/constants";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    const { items } = await req.json() as { items: CartItem[] };
    
    const lineItems = items.map((item: CartItem) => ({
      price_data: {
        currency: CURRENCY_NAME,
        product_data: {
          name: item.name,
          images: item.images.map((image) => image.src),
        },
        unit_amount: Math.round(parseFloat(item.price) * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json({
      sessionId: session.id,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Error creating checkout session" },
      { status: 500 }
    );
  }
}