import { getProduct } from "@/actions/products";
import { CURRENCY_ICON } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/add-to-cart-button";
import { Separator } from "@/components/ui/separator";
import { calculateDiscount } from "@/lib/utils";

type Props = {
  params: Promise<{ id: string }>;
};

const ProductPage = async (props: Props) => {
  const params = await props.params;
  const { id } = params;
  const product = await getProduct(id);

  if (!product) notFound();

  const discountPercentage = product.on_sale
    ? calculateDiscount(product.regular_price, product.sale_price)
    : 0;

  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <Link
          href="/"
          className="inline-flex items-center text-lg font-medium mb-8 hover:text-neutral-600"
        >
          ← Back to products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
          <div className="relative">
            {product.images[0]?.src ? (
              <Image
                src={product.images[0].src}
                alt={product.images[0].alt || product.name}
                width={800}
                height={800}
                className="max-w-full h-full object-contain my-auto"
                priority
              />
            ) : (
              <div className="rounded-lg bg-neutral-100 flex items-center justify-center h-[50vh]">
                <p className="text-neutral-500">No image available</p>
              </div>
            )}
            {product.on_sale && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-md font-medium">
                {discountPercentage}% OFF
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <div>
              <div className="flex flex-row items-baseline justify-between">
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                {product.on_sale ? (
                  <div className="flex flex-col items-end mb-4">
                    <div className="text-2xl font-bold text-red-500">
                      {CURRENCY_ICON}
                      {product.sale_price}
                    </div>
                    <div className="text-lg text-neutral-500 line-through">
                      {CURRENCY_ICON}
                      {product.regular_price}
                    </div>
                  </div>
                ) : (
                  <div className="text-2xl font-bold mb-4">
                    {CURRENCY_ICON}
                    {product.price}
                  </div>
                )}
              </div>

              {product.short_description && (
                <div
                  className="text-neutral-600"
                  dangerouslySetInnerHTML={{
                    __html: product.short_description,
                  }}
                />
              )}
            </div>

            <Separator className="my-8" />

            {product.description && (
              <>
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <div
                  className="prose max-w-none text-neutral-700"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </>
            )}

            <Separator className="my-8" />

            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;