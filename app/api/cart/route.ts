import { NextRequest, NextResponse } from 'next/server';
import { addToCart, getCart } from '@/app/lib/cart';

/**
 * API handler for cart operations. Currently supports POST to add
 * items to the cart. Expects a JSON payload with variantId (string)
 * and qty (number). Responds with the updated cart. Cookies are
 * managed via the cart helper functions.
 */
export async function POST(request: NextRequest) {
  try {
    const { variantId, qty } = await request.json();
    if (!variantId || typeof qty !== 'number' || isNaN(qty)) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }
    await addToCart(variantId, qty);
    const cart = getCart();
    return NextResponse.json({ cart });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update cart' }, { status: 500 });
  }
}