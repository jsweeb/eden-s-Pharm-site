"use client";

import React, { useEffect, useState } from 'react';

interface Variant {
  id: string;
  label: string;
  preorderAllowed: boolean;
}

interface InventoryInfo {
  availableQty: number;
  preorderAllowed: boolean;
}

interface Props {
  variants: Variant[];
  productId: string;
  onAddToCart?: (variantId: string, qty: number) => void;
}

export default function ProductVariantSelector({ variants, productId, onAddToCart }: Props) {
  const [selectedId, setSelectedId] = useState(variants[0]?.id ?? '');
  const [inventory, setInventory] = useState<InventoryInfo | null>(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (!selectedId) return;
    let cancelled = false;
    async function load() {
      const res = await fetch(`/api/vineyard/inventory/${selectedId}`);
      const data: InventoryInfo = await res.json();
      if (!cancelled) setInventory(data);
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [selectedId]);

  const handleAdd = () => {
    // Prefer consumer-provided handler when available
    if (onAddToCart) {
      onAddToCart(selectedId, qty);
    } else {
      // Fallback: call internal API route to add to cart
      fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ variantId: selectedId, qty }),
      }).catch((err) => {
        console.error('Failed to add to cart', err);
      });
    }
  };

  let stockMessage = 'Loading…';
  if (inventory) {
    if (inventory.availableQty > 0) {
      stockMessage = `In Stock (${inventory.availableQty})`;
    } else if (inventory.preorderAllowed) {
      stockMessage = 'Pre‑Order Available';
    } else {
      stockMessage = 'Out of Stock';
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="variant" className="block mb-1 font-bold">
          Variant
        </label>
        <select
          id="variant"
          className="w-full bg-earth border border-highlight p-2 rounded"
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
        >
          {variants.map((v) => (
            <option key={v.id} value={v.id}>
              {v.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="quantity" className="block mb-1 font-bold">
          Quantity
        </label>
        <input
          id="quantity"
          type="number"
          min={1}
          max={99}
          value={qty}
          onChange={(e) => setQty(parseInt(e.target.value, 10))}
          className="w-full bg-earth border border-highlight p-2 rounded"
        />
      </div>
      <p className="font-semibold" data-testid="stock-message">{stockMessage}</p>
      <button
        type="button"
        onClick={handleAdd}
        disabled={inventory ? inventory.availableQty === 0 && !inventory.preorderAllowed : true}
        className="px-4 py-2 rounded bg-accent text-earth hover:bg-highlight disabled:opacity-50"
      >
        {inventory && inventory.availableQty === 0 && inventory.preorderAllowed
          ? 'Pre‑Order'
          : 'Add to Cart'}
      </button>
    </div>
  );
}