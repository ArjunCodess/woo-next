"use client";

import React from "react";
import Checkout from "@/components/checkout";
import { Minus, Plus, ShoppingCart, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/hooks/use-cart";
import Image from "next/image";
import { CURRENCY_ICON } from "@/lib/constants";

export default function Navbar() {
  const {
    isOpen,
    setIsOpen,
    items: cartItems,
    updateQuantity,
    removeItem: removeFromCart,
    cartTotal,
  } = useCart();

  return (
    <header className="sticky top-0 z-10 bg-white border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">woo-next</h1>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button className="text-lg font-medium flex items-center gap-2">
              <span>Cart</span>
              {cartItems.length > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium bg-black text-white rounded-full">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-md">
            <SheetHeader>
              <SheetTitle>Your Cart</SheetTitle>
            </SheetHeader>
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[50vh]">
                <ShoppingCart className="h-12 w-12 text-gray-300 mb-4" />
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <div className="flex flex-col h-full">
                <div className="flex-1 overflow-auto p-6">
                  <ul className="space-y-6">
                    {cartItems.map((item) => (
                      <li key={item.id} className="flex gap-4">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                          <Image
                            src={item.images?.[0]?.src || "/placeholder.svg"}
                            alt={item.name}
                            width={96}
                            height={96}
                            className="h-full w-full object-contain p-2"
                          />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>{item.name}</h3>
                            <p className="ml-4">
                              {CURRENCY_ICON}
                              {item.price}
                            </p>
                          </div>
                          <div className="flex items-center mt-auto">
                            <button
                              className="rounded-md border p-1"
                              onClick={() =>
                                updateQuantity(`${item.id}`, item.quantity - 1)
                              }
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="mx-2 w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              className="rounded-md border p-1"
                              onClick={() =>
                                updateQuantity(`${item.id}`, item.quantity + 1)
                              }
                            >
                              <Plus className="h-4 w-4" />
                            </button>

                            <button
                              onClick={() => removeFromCart(`${item.id}`)}
                              className="ml-auto text-gray-400 hover:text-gray-500"
                            >
                              <X className="h-5 w-5" />
                              <span className="sr-only">Remove</span>
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t border-gray-200 p-6">
                  <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                    <p>Subtotal</p>
                    <p>
                      {CURRENCY_ICON}
                      {cartTotal}
                    </p>
                  </div>
                  <Checkout />
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
