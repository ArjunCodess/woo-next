'use client';

import { Product } from '@/types';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const ProductGallery = dynamic(() => import('@/components/product/gallery'), {
  ssr: false,
});

interface ProductGalleryWrapperProps {
  product: Product;
}

const ProductGalleryWrapper = ({ product }: ProductGalleryWrapperProps) => {
  return (
    <Suspense 
      fallback={
        <div className="h-full relative aspect-square md:aspect-auto rounded-lg border bg-muted flex items-center justify-center">
          <p className="text-muted-foreground">Loading images...</p>
        </div>
      }
    >
      <ProductGallery product={product} />
    </Suspense>
  );
};

export default ProductGalleryWrapper;