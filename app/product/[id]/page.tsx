import { getProduct } from "@/actions/products";
import { CURRENCY_ICON } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/add-to-cart-button";

type Props = {
  params: Promise<{ id: string }>;
};

const ProductPage = async (props: Props) => {
  const params = await props.params;
  const { id } = params;
  const product = await getProduct(id);

  if (!product) notFound();

  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <Link
          href="/"
          className="inline-flex items-center text-lg font-medium mb-8 hover:text-gray-600"
        >
          ← Back to products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
          {product.images[0]?.src ? (
            <Image
              src={product.images[0].src}
              alt={product.images[0].alt || product.name}
              width={800}
              height={800}
              className="max-w-full max-h-full object-contain my-auto"
              priority
            />
          ) : (
            <div className="rounded-lg bg-gray-100 flex items-center justify-center h-[50vh]">
              <p className="text-gray-500">No image available</p>
            </div>
          )}

          <div className="flex flex-col gap-6">
            <div>
              <div className="flex flex-row items-baseline justify-between">
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <div className="text-2xl font-bold mb-4">
                  {CURRENCY_ICON}
                  {product.price}
                </div>
              </div>

              {product.short_description && (
                <div
                  className="text-gray-600 mb-6"
                  dangerouslySetInnerHTML={{
                    __html: product.short_description,
                  }}
                />
              )}
            </div>

            {product.description && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <div
                  className="prose max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>
            )}

            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
