import { getProducts } from "@/actions/products";
import ProductGrid from "@/components/product-grid";

export default async function Home() {
  const products = await getProducts();
  return <ProductGrid products={products} />;
}