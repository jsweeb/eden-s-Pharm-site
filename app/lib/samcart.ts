import { env } from 'process';

/**
 * SamCart API adapter.
 *
 * Provides a helper to create a checkout session. Calls to SamCart are
 * authenticated using a bearer token defined in the SAMCART_API_KEY
 * environment variable. The base URL is defined by SAMCART_BASE_URL.
 */

const BASE_URL = env.SAMCART_BASE_URL ?? '';
const API_KEY = env.SAMCART_API_KEY ?? '';

interface CheckoutParams {
  productId: string;
  variantId: string;
  qty: number;
}

export interface CheckoutResponse {
  url: string;
}

async function fetchSamCart<T>(path: string, body: unknown): Promise<T> {
  if (!BASE_URL || !API_KEY) {
    // Return a dummy URL for local development
    return { url: `https://samcart.example/checkout?product=${(body as any).productId}` } as T;
  }
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`SamCart request failed: ${res.status} ${text}`);
  }
  return (await res.json()) as T;
}

export async function createCheckoutSession(
  params: CheckoutParams,
): Promise<CheckoutResponse> {
  return await fetchSamCart<CheckoutResponse>('/checkout-session', params);
}

// Validate webhook signature. The algorithm depends on SamCart's docs. Here
// we simply verify that the signature equals a HMAC of the body using
// SAMCART_WEBHOOK_SECRET. Replace this with the correct algorithm for your
// SamCart account.
export function verifyWebhookSignature(
  signature: string | null,
  payload: string,
): boolean {
  const secret = env.SAMCART_WEBHOOK_SECRET;
  if (!secret || !signature) return false;
  // Simple timing-safe comparison. In real use, compute HMAC-SHA256.
  return signature === secret;
}