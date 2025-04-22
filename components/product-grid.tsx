"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Product } from "@/types";
import { CURRENCY_ICON } from "@/lib/constants";

type Props = {
  products: Product[];
};

const ProductGrid = ({ products }: Props) => {
  // Calculate discount percentage for a product
  const calculateDiscount = (regular: string, sale: string): number => {
    if (!regular || !sale) return 0;
    const regularPrice = parseFloat(regular);
    const salePrice = parseFloat(sale);
    if (regularPrice <= 0 || salePrice <= 0) return 0;
    return Math.round(((regularPrice - salePrice) / regularPrice) * 100);
  };

  return (
    <div className="bg-white">
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-40">
          {products.map((product, index) => (
            <Link
              href={`/product/${product.id}`}
              key={index}
              className="flex flex-col group relative"
            >
              <div className="aspect-square rounded-md overflow-hidden relative">
                <Image
                  src={product.images?.[0]?.src || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-full object-contain"
                />
                {product.on_sale && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    {calculateDiscount(product.regular_price, product.sale_price)}% OFF
                  </div>
                )}
              </div>
              <div className="group-hover:opacity-100 opacity-0 flex flex-col justify-end">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-base font-semibold text-primary">
                    {product.name}
                  </h3>

                  <div className="text-right">
                    {product.on_sale ? (
                      <div className="flex flex-col">
                        <p className="text-base font-semibold text-red-500">
                          {CURRENCY_ICON}{product.sale_price}
                        </p>
                        <p className="text-xs text-neutral-500 line-through">
                          {CURRENCY_ICON}{product.regular_price}
                        </p>
                      </div>
                    ) : (
                      <p className="text-base font-semibold text-primary">
                        {CURRENCY_ICON}{product.price}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductGrid;