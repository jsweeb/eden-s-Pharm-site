import { getCart, clearCart } from '@/app/lib/cart';
import { createCheckoutSession } from '@/app/lib/samcart';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Checkout | Eden's Pharm",
  description: "Review your cart and proceed to secure checkout.",
};

/**
 * Server action to process checkout. Reads the current cart, sends it to
 * SamCart to create a session and then redirects the user to the
 * SamCart URL. If the cart is empty, it simply returns.
 */
async function processCheckout() {
  'use server';
  const cart = getCart();
  if (cart.length === 0) {
    return;
  }
  // Build payload for SamCart. We assume the productId is the same as
  // variantId for demonstration purposes. Real implementations would
  // look up the product associated with each variant.
  const item = cart[0];
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload: any = {
      productId: item.variantId,
      variantId: item.variantId,
      qty: item.qty,
    };
    const session = await createCheckoutSession(payload);
    await clearCart();
    if (session && typeof (session as any).url === 'string') {
      redirect((session as any).url);
    }
  } catch (err) {
    console.error('Checkout failed', err);
  }
}

export default async function CheckoutPage() {
  const cart = getCart();
  return (
    <article className="space-y-8">
      <h1 className="text-3xl font-bold text-center">Checkout</h1>
      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty. <a href="/products" className="underline text-accent">Browse products</a>.</p>
      ) : (
        <form action={processCheckout} className="max-w-md mx-auto space-y-4">
          <ul className="space-y-2">
            {cart.map((item) => (
              <li key={item.variantId} className="flex justify-between border-b border-highlight py-2">
                <span>{item.variantId}</span>
                <span>Qty: {item.qty}</span>
              </li>
            ))}
          </ul>
          <button type="submit" className="w-full px-4 py-2 bg-accent text-earth rounded hover:bg-highlight">
            Proceed to Checkout
          </button>
        </form>
      )}
    </article>
  );
}