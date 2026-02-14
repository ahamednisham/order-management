import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { menuItems } from '@/lib/db/schema';

export async function GET() {
  const items = await db.select().from(menuItems);
  // Convert numeric price from string to number
  const formattedItems = items.map(item => ({
    ...item,
    price: parseFloat(item.price)
  }));
  return NextResponse.json(formattedItems);
}
