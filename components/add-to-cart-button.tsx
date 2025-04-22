"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { CartItem } from "@/types";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface AddToCartButtonProps {
  product: CartItem;
}

const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);

    addItem(product);
    setIsAdding(false);

    toast.success("Product added", {
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isAdding}
      size="lg"
      variant="default"
      className="w-full text-base py-6"
    >
      {isAdding ? (
        "Adding to Cart..."
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