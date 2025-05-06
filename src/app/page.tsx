import { getProducts } from "@/actions/products";
import ProductGrid from "@/components/product-grid";
import { HOME_METADATA } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = HOME_METADATA;

export default async function Home() {
  const products = await getProducts();
  return <ProductGrid products={products} />;
}