import { NextRequest, NextResponse } from 'next/server';
import { orderStore } from '@/lib/store';
import { Order } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { getSession } from '@/lib/auth';
import { orderSchema } from '@/lib/validations';

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    const body = await req.json();
    
    const validation = orderSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error.issues[0].message }, { status: 400 });
    }

    const { items, deliveryDetails } = validation.data;

    const subtotal = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
    const total = subtotal + 5; // Adding delivery fee

    const newOrder: Order = {
      id: uuidv4(),
      userId: session?.userId,
      items,
      total,
      deliveryDetails,
      status: 'Order Received',
      createdAt: new Date().toISOString(),
    };

    await orderStore.addOrder(newOrder);

    return NextResponse.json(newOrder, { status: 201 });
  } catch (_error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function GET() {
  const session = await getSession();
  const allOrders = await orderStore.getAllOrders();
  
  if (session) {
    return NextResponse.json(allOrders.filter(o => o.userId === session.userId));
  }
  
  // If not logged in, return nothing or handle as needed. 
  // For the "Previous Orders" page, we'll only show them if logged in.
  return NextResponse.json([]);
}
