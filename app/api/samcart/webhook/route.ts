import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookSignature } from '@/app/lib/samcart';
import { createOrder, updateInventory } from '@/app/lib/vineyard';

/**
 * POST /api/samcart/webhook
 *
 * Handles SamCart webhook events. Verifies the signature to ensure the
 * request originates from SamCart. On a successful payment event, this
 * handler creates a corresponding order in Vineyard and decrements
 * inventory for the purchased variant. Responses must return 200 to
 * acknowledge receipt.
 */
export async function POST(req: NextRequest) {
  const signature = req.headers.get('x-samcart-signature');
  const payload = await req.text();
  if (!verifyWebhookSignature(signature, payload)) {
    return new NextResponse('Invalid signature', { status: 401 });
  }
  try {
    const event = JSON.parse(payload);
    // In a real implementation, inspect event.type and event.data
    if (event.type === 'payment.success') {
      const { variantId, qty, orderId } = event.data;
      // Create order in Vineyard
      await createOrder(event.data);
      // Update inventory
      await updateInventory(variantId, -qty);
    }
    return new NextResponse('ok', { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse('Webhook error', { status: 500 });
  }
}