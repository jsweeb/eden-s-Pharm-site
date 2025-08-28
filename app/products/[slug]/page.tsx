import React from 'react';
import { notFound } from 'next/navigation';
import { getProduct } from '@/app/lib/vineyard';
import ProductVariantSelector from '@/components/ProductVariantSelector';

interface Props {
  params: {
    slug: string;
  };
}

/**
 * Product detail page.
 *
 * Fetches detailed information for a single product and displays its
 * description, image and variant selector. Inventory is fetched per variant via
 * client-side API calls. If the product is not found, a 404 is thrown.
 */
export default async function ProductPage({ params }: Props) {
  const product = await getProduct(params.slug);
  if (!product) {
    notFound();
  }
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-cover rounded"
      />
      <p>{product.description}</p>
      <div>
        <h2 className="text-xl font-bold mb-2">Select Variant</h2>
        <ProductVariantSelector
          variants={product.variants}
          productId={product.id}
        />
      </div>
    </div>
  );
}