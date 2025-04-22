import { getProduct } from "@/actions/products";
import { CURRENCY_ICON } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/add-to-cart-button";
import { Separator } from "@/components/ui/separator";
import { calculateDiscount } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

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
      <Container>
        <Button variant="ghost" size="sm" className="group mb-8" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to products
          </Link>
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-lg overflow-hidden border relative aspect-square md:aspect-auto">
            {product.images[0]?.src ? (
              <Image
                src={product.images[0].src}
                alt={product.images[0].alt || product.name}
                fill
                className="object-contain"
                priority
              />
            ) : (
              <div className="h-full w-full bg-muted flex items-center justify-center">
                <p className="text-muted-foreground">No image available</p>
              </div>
            )}
            {product.on_sale && (
              <Badge
                variant="destructive"
                className="absolute top-4 left-4 px-3 py-1 text-sm font-medium"
              >
                {discountPercentage}% OFF
              </Badge>
            )}
          </div>

          <div className="flex flex-col border rounded-lg p-8">
            <div>
              <div className="flex flex-row items-baseline justify-between">
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                {product.on_sale ? (
                  <div className="flex flex-row items-baseline mb-4 gap-2">
                    <div className="text-lg text-muted-foreground line-through">
                      {CURRENCY_ICON}
                      {product.regular_price}
                    </div>
                    <div className="text-2xl font-bold text-destructive">
                      {CURRENCY_ICON}
                      {product.sale_price}
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
                  className="text-muted-foreground"
                  dangerouslySetInnerHTML={{
                    __html: product.short_description,
                  }}
                />
              )}
            </div>

            <Separator className="my-8" />

            {product.description ? (
              <div
                className="prose max-w-none text-foreground"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            ) : (
              <p className="text-muted-foreground">No description available</p>
            )}

            <Separator className="my-8" />

            <AddToCartButton product={product} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
