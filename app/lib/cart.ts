import { cookies } from 'next/headers';

/**
 * Represents an item stored in the user's cart. Each entry is keyed
 * by a specific variant identifier and a quantity. In a real system
 * you would also include product metadata (price, name, etc.) but
 * those values can be looked up at checkout via the variant id.
 */
export interface CartItem {
  variantId: string;
  qty: number;
}

const CART_COOKIE = 'cart';

/**
 * Parse the JSON cart cookie from the incoming request. If no cart
 * cookie exists, returns an empty array. Cookies are stored as
 * JSON-encoded arrays.
 */
export function getCart(): CartItem[] {
  const cookieStore = cookies();
  const cookie = cookieStore.get(CART_COOKIE)?.value;
  if (!cookie) return [];
  try {
    const parsed = JSON.parse(cookie);
    if (Array.isArray(parsed)) {
      return parsed as CartItem[];
    }
  } catch {
    // ignore parse errors
  }
  return [];
}

/**
 * Persist the cart in the response cookies. Uses a path of '/' so
 * the cart is available on all routes. Serialises the cart as JSON.
 */
function saveCart(cart: CartItem[]): void {
  const cookieStore = cookies();
  cookieStore.set({
    name: CART_COOKIE,
    value: JSON.stringify(cart),
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
}

/**
 * Add an item to the cart or update its quantity if it already exists.
 * Quantities of zero or less will remove the item. Returns the updated
 * cart contents. This function is intended to be called within a
 * server action.
 */
export async function addToCart(variantId: string, qty: number): Promise<CartItem[]> {
  const current = getCart();
  // find existing entry
  const index = current.findIndex((item) => item.variantId === variantId);
  if (index >= 0) {
    current[index].qty += qty;
    if (current[index].qty <= 0) {
      current.splice(index, 1);
    }
  } else {
    current.push({ variantId, qty });
  }
  saveCart(current);
  return current;
}

/**
 * Clear all items from the cart by deleting the cookie.
 */
export async function clearCart(): Promise<void> {
  const cookieStore = cookies();
  cookieStore.delete(CART_COOKIE);
}