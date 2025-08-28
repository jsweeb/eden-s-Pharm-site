import React from 'react';
import Link from 'next/link';
import { listProducts, getProduct, getInventory } from '@/app/lib/vineyard';

/**
 * Products listing page.
 *
 * Fetches product summaries from Vineyard and displays them in a responsive
 * grid. Each card links to a dedicated product detail page. On failure to
 * fetch data (e.g. Vineyard unavailable), the page gracefully falls back
 * to placeholder products defined in the Vineyard adapter.
 */
export default async function ProductsPage() {
  const products = await listProducts();
  // Compute stock status for each product by aggregating variant inventory.
  const productsWithStatus = await Promise.all(
    products.map(async (product) => {
      try {
        const detail = await getProduct(product.slug);
        const inventories = await Promise.all(
          detail.variants.map((v) => getInventory(v.id)),
        );
        const totalAvailable = inventories.reduce((sum, inv) => sum + inv.availableQty, 0);
        const anyPreorder = inventories.some((inv) => inv.preorderAllowed);
        let status: string;
        if (totalAvailable > 0) {
          status = `In Stock (${totalAvailable})`;
        } else if (anyPreorder) {
          status = 'Pre‑Order Available';
        } else {
          status = 'Out of Stock';
        }
        return { ...product, status };
      } catch {
        return { ...product, status: 'Unavailable' };
      }
    }),
  );
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">Products</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {productsWithStatus.map((product) => (
          <div
            key={product.id}
            className="border border-highlight rounded-lg overflow-hidden bg-earth flex flex-col"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-40 w-full object-cover"
            />
            <div className="p-4 flex-1 flex flex-col">
              <h2 className="text-lg font-bold mb-1">{product.name}</h2>
              <span className="text-sm font-semibold text-accent mb-2">{product.status}</span>
              <p className="flex-1 text-sm mb-4">{product.description}</p>
              <Link
                href={`/products/${product.slug}`}
                className="mt-auto inline-block px-4 py-2 bg-accent text-earth rounded hover:bg-highlight"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}