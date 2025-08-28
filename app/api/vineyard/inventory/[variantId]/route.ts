import { NextRequest, NextResponse } from 'next/server';
import { getInventory } from '@/app/lib/vineyard';

/**
 * API Route: GET /api/vineyard/inventory/[variantId]
 *
 * Returns inventory information for a given variant ID. This endpoint is
 * intended for client-side fetching when users select different variants on
 * the product detail page. It proxies the request to the server-only
 * Vineyard adapter.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { variantId: string } },
) {
  try {
    const info = await getInventory(params.variantId);
    return NextResponse.json(info);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: 'Failed to fetch inventory' },
      { status: 500 },
    );
  }
}