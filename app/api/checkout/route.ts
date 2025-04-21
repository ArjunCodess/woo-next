import { CURRENCY_NAME } from "@/lib/constants";
import { CartItem } from "@/types";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { items } = await req.json();
    const lineItems = items.map((item: CartItem) => ({
      price_data: {
        currency: CURRENCY_NAME,
        product_data: {
          name: item.name,
          images: item.images,
        },
        unit_amount: parseInt(item.price) * 100,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
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