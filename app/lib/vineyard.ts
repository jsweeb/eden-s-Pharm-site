import { env } from 'process';

/**
 * Vineyard API adapter.
 *
 * Provides helper functions to interact with a hypothetical Vineyard backend that
 * supplies product catalog information, inventory lookups and order creation.
 * All requests include a Bearer token defined by VINEYARD_API_KEY and target
 * the base URL defined in VINEYARD_BASE_URL. Requests have a 10 second
 * timeout and will automatically retry up to three times on failure with
 * exponential backoff.
 */

const BASE_URL = env.VINEYARD_BASE_URL ?? '';
const API_KEY = env.VINEYARD_API_KEY ?? '';

// Generic fetch helper with timeout and retry logic
async function fetchWithRetry<T>(
  path: string,
  options: RequestInit & { timeout?: number } = {},
  retries = 3,
): Promise<T> {
  const timeout = options.timeout ?? 10000;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    });
    clearTimeout(id);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Vineyard request failed: ${response.status} ${errorText}`);
    }
    return (await response.json()) as T;
  } catch (err) {
    clearTimeout(id);
    if (retries > 0) {
      // exponential backoff: wait (2^(attempts)) * 100 ms
      const delay = (4 - retries) ** 2 * 100;
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchWithRetry(path, options, retries - 1);
    }
    throw err;
  }
}

// Product listing: returns a list of simplified product summaries. The shape
// of the response is defined by the Vineyard API.
export interface ProductSummary {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
}

export async function listProducts(): Promise<ProductSummary[]> {
  // If no Vineyard configuration is provided, return hardcoded placeholders.
  if (!BASE_URL || !API_KEY) {
    return [
      {
        id: 'hydrasal',
        slug: 'hydrasal',
        name: 'Hydrasal',
        description:
          'Hydrasal is the world’s only hydration system sweetened with our Healthy Sweetener System™. Every sip delivers functional electrolytes without blood sugar spikes, plus metabolic, dental and collagen support.',
        image: '/images/hydrasal.png',
      },
      {
        id: 'elation',
        slug: 'elation',
        name: 'Elation',
        description:
          'Adaptogens reimagined as daily luxury tonics. Elation blends herbs like ashwagandha, holy basil and saffron with decadent flavors — and is powered by our Benedolce sweetener for functional balance.',
        image: '/images/elation.png',
      },
      {
        id: 'benedulce',
        slug: 'benedulce',
        name: 'BeneDulce',
        description:
          'The world’s first sweetener that is not only neutral but beneficial. Powered by allulose, erythritol, monk fruit, xylitol and collagen peptides, BeneDulce improves upon sugar with real health benefits.',
        image: '/images/benedulce.jpg',
      },
      {
        id: 'sanctus-una',
        slug: 'sanctus-una',
        name: 'Sanctus Una',
        description:
          'Rooted in grass‑fed tallow, Sanctus Una brings ancient wisdom into modern form. Each balm, salve and butter uses the earth’s simplest, most powerful ingredients for ancestral healing.',
        image: '/images/sanctus.png',
      },
    ];
  }
  return await fetchWithRetry<ProductSummary[]>('/products');
}

// Detailed product information including variants
export interface ProductDetail extends ProductSummary {
  variants: Array<{
    id: string;
    label: string;
    preorderAllowed: boolean;
  }>;
}

export async function getProduct(slug: string): Promise<ProductDetail> {
  if (!BASE_URL || !API_KEY) {
    // Return placeholder product detail for local development
    const products = await listProducts();
    const product = products.find((p) => p.slug === slug);
    return {
      ...(product || ({} as ProductSummary)),
      variants: [
        { id: `${slug}-small`, label: 'Small', preorderAllowed: false },
        { id: `${slug}-large`, label: 'Large', preorderAllowed: true },
      ],
    } as ProductDetail;
  }
  return await fetchWithRetry<ProductDetail>(`/products/${slug}`);
}

export interface InventoryInfo {
  availableQty: number;
  preorderAllowed: boolean;
}

export async function getInventory(variantId: string): Promise<InventoryInfo> {
  if (!BASE_URL || !API_KEY) {
    // Placeholder: alternate between in stock and preorder for demo purposes
    const demo = variantId.includes('large')
      ? { availableQty: 0, preorderAllowed: true }
      : { availableQty: 5, preorderAllowed: false };
    return demo;
  }
  return await fetchWithRetry<InventoryInfo>(`/inventory/${variantId}`);
}

// Create an order with payload. Returns order id or details.
export async function createOrder(payload: unknown): Promise<unknown> {
  return await fetchWithRetry('/orders', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

// Update inventory for a variant. Delta can be negative.
export async function updateInventory(
  variantId: string,
  delta: number,
): Promise<unknown> {
  return await fetchWithRetry(`/inventory/${variantId}`, {
    method: 'PATCH',
    body: JSON.stringify({ delta }),
  });
}