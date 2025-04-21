"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const Checkout = () => {
  const { items } = useCart();
  const [loading, setLoading] = useState(false);

  const onCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
        }),
      });

      const data = await response.json();
      console.log("Checkout response:", data);
      
      if (!data.sessionId) {
        throw new Error("No sessionId returned from checkout API");
      }
      
      const stripe = await stripePromise;
      
      if (!stripe) {
        throw new Error("Stripe failed to load");
      }
      
      const { error } = await stripe.redirectToCheckout({ 
        sessionId: data.sessionId 
      });

      if (error) throw new Error(error.message);
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Payment failed: " + (error instanceof Error ? error.message : "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 grid gap-4">
      <Button
        size="lg"
        className="w-full"
        disabled={loading || items.length === 0}
        onClick={onCheckout}
      >
        {loading ? "Processing..." : "Checkout"}
      </Button>
    </div>
  );
};

export default Checkout;