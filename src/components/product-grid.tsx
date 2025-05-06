"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Product } from "@/types";
import { CURRENCY_ICON } from "@/lib/constants";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  products: Product[];
};

const ProductGrid = ({ products }: Props) => {
  const [isLoaded, setIsLoaded] = React.useState<Record<string, boolean>>({});

  const calculateDiscount = (regular: string, sale: string): number => {
    if (!regular || !sale) return 0;
    const regularPrice = parseFloat(regular);
    const salePrice = parseFloat(sale);
    if (regularPrice <= 0 || salePrice <= 0) return 0;
    return Math.round(((regularPrice - salePrice) / regularPrice) * 100);
  };

  const handleImageLoad = (id: number) => {
    setIsLoaded((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section className="py-12">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              className="outline-none hover:ring-2 hover:ring-ring focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg group duration-150 transition-all"
            >
              <div className="border rounded-lg flex flex-col items-center overflow-hidden h-full transition-all duration-200">
                <div className="w-full relative aspect-square flex items-center justify-center">
                  {!isLoaded[product.id] && (
                    <Skeleton className="h-full w-full absolute inset-0" />
                  )}
                  <Image
                    src={product.images?.[0]?.src || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className={`object-contain transition-opacity duration-300 border-b aspect-square ${
                      isLoaded[product.id] ? "opacity-100" : "opacity-0"
                    }`}
                    onLoad={() => handleImageLoad(product.id)}
                    priority={product.id < 4}
                  />
                  {product.on_sale && (
                    <Badge
                      variant="destructive"
                      className="absolute top-2 left-2 px-2 py-1"
                    >
                      {calculateDiscount(
                        product.regular_price,
                        product.sale_price
                      )}
                      % OFF
                    </Badge>
                  )}
                </div>
                <div className="w-full p-3 text-center">
                  <h3 className="text-base font-medium line-clamp-1 mb-1">
                    {product.name}
                  </h3>
                  {product.on_sale ? (
                    <div className="flex flex-col items-center">
                      <p className="text-base font-semibold text-destructive">
                        {CURRENCY_ICON}
                        {product.sale_price}
                      </p>
                      <p className="text-xs text-muted-foreground line-through">
                        {CURRENCY_ICON}
                        {product.regular_price}
                      </p>
                    </div>
                  ) : (
                    <p className="text-base font-semibold">
                      {CURRENCY_ICON}
                      {product.price}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ProductGrid;