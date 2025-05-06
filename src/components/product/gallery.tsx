'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Product } from '@/types';

interface ProductGalleryProps {
  product: Product;
}

const ProductGallery = ({ product }: ProductGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  
  if (!product.images.length) {
    return (
      <div className="h-full relative aspect-square md:aspect-auto rounded-lg overflow-hidden border bg-muted flex items-center justify-center">
        <p className="text-muted-foreground">No image available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-4 h-full">
      <div className="h-full relative aspect-square md:aspect-auto rounded-lg overflow-hidden border">
        <Image
          src={product.images[selectedImage].src}
          alt={product.images[selectedImage].alt || product.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain"
          priority
        />
        {product.on_sale && (
          <div className="absolute top-4 left-4 z-10 px-3 py-1 text-sm font-medium rounded-full bg-red-600 text-white">
            SALE
          </div>
        )}
      </div>
      
      {product.images.length > 1 && (
        <div className="grid grid-cols-4 gap-2 sm:gap-4">
          {product.images.map((image, index) => (
            <div 
              key={image.id}
              className={cn(
                "relative cursor-pointer aspect-square rounded-md overflow-hidden border",
                selectedImage === index ? "ring-2 ring-primary" : ""
              )}
              onClick={() => setSelectedImage(index)}
            >
              <Image
                src={image.src}
                alt={image.alt || `Product image ${index + 1}`}
                fill
                sizes="(max-width: 768px) 25vw, 12.5vw"
                className="object-cover"
                priority
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;