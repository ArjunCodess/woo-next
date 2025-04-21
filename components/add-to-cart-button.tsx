"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { CartItem } from "@/types";
import { Check, ShoppingCart } from "lucide-react";
import { useState } from "react";

interface AddToCartButtonProps {
  product: CartItem;
}

const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);

    addItem(product);

    setIsAdding(false);
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 500);
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isAdding}
      size="lg"
      variant={added ? "secondary" : "default"}
      className="mt-4 w-full text-base py-6"
    >
      {isAdding ? (
        "Adding to Cart..."
      ) : added ? (
        <>
          <Check className="mr-2 h-5 w-5" />
          Added to Cart
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to Cart
        </>
      )}
    </Button>
  );
};

export default AddToCartButton;