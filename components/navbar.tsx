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
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { allProductsLink, categories, navigationItems } from "@/lib/navbar";

export default function Navbar() {
  const {
    isOpen,
    setIsOpen,
    items: cartItems,
    updateQuantity,
    removeItem: removeFromCart,
    cartTotal,
  } = useCart();

  // Calculate discount percentage
  const calculateDiscount = (regular: string, sale: string): number => {
    if (!regular || !sale) return 0;
    const regularPrice = parseFloat(regular);
    const salePrice = parseFloat(sale);
    if (regularPrice <= 0 || salePrice <= 0) return 0;
    return Math.round(((regularPrice - salePrice) / regularPrice) * 100);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <Container>
        <div className="flex h-16 items-center justify-between py-4">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold inline-block">woo-next</span>
            </Link>

            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href={allProductsLink.href}
                          >
                            <div className="mb-2 mt-4 text-lg font-medium">
                              {allProductsLink.name}
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              {allProductsLink.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      {categories.map((category) => (
                        <li key={category.name}>
                          <NavigationMenuLink asChild>
                            <Link
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              href={category.href}
                            >
                              <div className="text-sm font-medium leading-none">
                                {category.name}
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {category.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    <NavigationMenuLink
                      href={item.href}
                      className={navigationMenuTriggerStyle()}
                    >
                      {item.name}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center gap-4">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItems.length > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {cartItems.reduce(
                        (total, item) => total + item.quantity,
                        0
                      )}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md py-4 px-6">
                <SheetHeader>
                  <SheetTitle>Your Cart</SheetTitle>
                </SheetHeader>
                <Separator />
                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-[50vh]">
                    <ShoppingCart className="h-12 w-12 text-muted mb-4" />
                    <p className="text-muted-foreground">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="flex flex-col h-full py-4">
                    <div className="flex-1 overflow-auto">
                      <ul className="space-y-6">
                        {cartItems.map((item) => (
                          <li key={item.id} className="flex gap-4">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border relative">
                              <Image
                                src={
                                  item.images?.[0]?.src || "/placeholder.svg"
                                }
                                alt={item.name}
                                width={96}
                                height={96}
                                className="h-full w-full object-contain"
                              />
                              {item.on_sale && (
                                <Badge
                                  variant="destructive"
                                  className="absolute bottom-0 right-0 text-xs px-1 rounded-sm"
                                >
                                  {calculateDiscount(
                                    item.regular_price,
                                    item.sale_price
                                  )}
                                  % OFF
                                </Badge>
                              )}
                            </div>
                            <div className="flex flex-1 flex-col">
                              <div className="flex justify-between text-base font-medium">
                                <h3>{item.name}</h3>
                                {item.on_sale ? (
                                  <div className="flex flex-col items-end">
                                    <p className="text-destructive">
                                      {CURRENCY_ICON}
                                      {item.sale_price}
                                    </p>
                                    <p className="text-xs text-muted-foreground line-through">
                                      {CURRENCY_ICON}
                                      {item.regular_price}
                                    </p>
                                  </div>
                                ) : (
                                  <p className="ml-4">
                                    {CURRENCY_ICON}
                                    {item.price}
                                  </p>
                                )}
                              </div>
                              <div className="flex items-center mt-auto">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() =>
                                    updateQuantity(
                                      `${item.id}`,
                                      item.quantity - 1
                                    )
                                  }
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="mx-2 w-8 text-center">
                                  {item.quantity}
                                </span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() =>
                                    updateQuantity(
                                      `${item.id}`,
                                      item.quantity + 1
                                    )
                                  }
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>

                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="ml-auto"
                                  onClick={() => removeFromCart(`${item.id}`)}
                                >
                                  <X className="h-4 w-4" />
                                  <span className="sr-only">Remove</span>
                                </Button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Separator className="my-4" />
                    <div className="p-4">
                      <div className="flex justify-between text-base font-medium mb-4">
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
        </div>
      </Container>
    </header>
  );
}
