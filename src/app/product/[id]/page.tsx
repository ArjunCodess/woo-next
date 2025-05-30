import { getProduct } from "@/actions/products";
import { CURRENCY_ICON, PRODUCT_METADATA, SITE_NAME } from "@/lib/constants";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/add-to-cart-button";
import { Separator } from "@/components/ui/separator";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { Image } from "@/types";

const ProductGallery = dynamic(() => import("@/components/product/gallery"), {
  loading: () => (
    <div className="h-full relative aspect-square md:aspect-auto rounded-lg border bg-muted flex items-center justify-center">
      <p className="text-muted-foreground">Loading images...</p>
    </div>
  ),
});

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return PRODUCT_METADATA;
  }

  const cleanDescription = product.short_description
    ? product.short_description
        .replace(/<[^>]*>/g, "")
        .replace(/&#8216;/g, "'")
        .replace(/&#8217;/g, "'")
    : `View details and pricing for ${product.name}`;

  const defaultImages = PRODUCT_METADATA.openGraph?.images || [];

  const productImages: {
    url: string;
    width: number;
    height: number;
    alt: string;
  }[] = [];
  if (
    product.images &&
    Array.isArray(product.images) &&
    product.images.length > 0
  ) {
    product.images.forEach((image: Image) => {
      if (image.src) {
        productImages.push({
          url: image.src,
          width: 800,
          height: 600,
          alt: image.alt || product.name || "Product image",
        });
      }
    });
  }

  const ogImages = productImages.length > 0 ? productImages : defaultImages;

  return {
    ...PRODUCT_METADATA,
    title: `${product.name} | ${SITE_NAME}`,
    description: cleanDescription,
    alternates: {
      canonical: `/product/${id}`,
    },
    openGraph: {
      ...PRODUCT_METADATA.openGraph,
      title: `${product.name} | ${SITE_NAME}`,
      description: cleanDescription,
      images: ogImages,
    },
    twitter: {
      ...PRODUCT_METADATA.twitter,
      title: `${product.name} | ${SITE_NAME}`,
      description: cleanDescription,
    },
  };
}

const ProductPage = async (props: Props) => {
  const params = await props.params;
  const { id } = params;
  const product = await getProduct(id);

  if (!product) notFound();

  return (
    <div className="py-6 sm:py-10">
      <Container>
        <Button
          variant="ghost"
          size="sm"
          className="group mb-4 sm:mb-8"
          asChild
        >
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm sm:text-base">Back to products</span>
          </Link>
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
          <div className="w-full">
            <ProductGallery product={product} />
          </div>

          <div className="flex flex-col my-auto">
            <Separator className="my-4 md:my-0 md:hidden" />
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                <h1 className="text-xl sm:text-3xl font-bold mb-2">
                  {product.name}
                </h1>
                {product.on_sale ? (
                  <div className="flex flex-row items-baseline mb-4 gap-2">
                    <div className="text-base sm:text-lg text-muted-foreground line-through">
                      {CURRENCY_ICON}
                      {product.regular_price}
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-destructive">
                      {CURRENCY_ICON}
                      {product.sale_price}
                    </div>
                  </div>
                ) : (
                  <div className="text-xl sm:text-2xl font-bold mb-4">
                    {CURRENCY_ICON}
                    {product.price}
                  </div>
                )}
              </div>

              {product.short_description && (
                <div
                  className="text-sm sm:text-base text-muted-foreground"
                  dangerouslySetInnerHTML={{
                    __html: product.short_description,
                  }}
                />
              )}

              <div className="md:hidden block mt-2">
                <AddToCartButton product={product} />
              </div>
            </div>

            <Separator className="my-4 sm:my-8" />

            {product.description ? (
              <div
                className="prose max-w-none text-sm sm:text-base text-foreground"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            ) : (
              <p className="text-muted-foreground">No description available</p>
            )}

            <Separator className="my-4 sm:my-8 hidden md:block" />

            <div className="hidden md:block">
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;