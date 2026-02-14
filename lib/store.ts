import { db } from './db';
import { orders } from './db/schema';
import { Order, OrderStatus } from '../types';
import { eq } from 'drizzle-orm';

class OrderStore {
  private getUpdatedOrder(order: any): { updatedOrder: Order; hasChanged: boolean } {
    // Ensure numeric values are numbers
    const total = typeof order.total === 'string' ? parseFloat(order.total) : order.total;
    
    // Simulate status updates based on time passed
    const secondsPassed = (Date.now() - new Date(order.createdAt).getTime()) / 1000;
    
    let currentStatus: OrderStatus = 'Order Received';
    if (secondsPassed > 120) {
      currentStatus = 'Delivered';
    } else if (secondsPassed > 60) {
      currentStatus = 'Out for Delivery';
    } else if (secondsPassed > 30) {
      currentStatus = 'Preparing';
    }

    // Only update if it's a further state
    const statusPriority: Record<OrderStatus, number> = {
      'Order Received': 0,
      'Preparing': 1,
      'Out for Delivery': 2,
      'Delivered': 3,
    };

    if (statusPriority[currentStatus] > statusPriority[order.status as OrderStatus]) {
      return { 
        updatedOrder: { 
          ...(order as Order), 
          total,
          status: currentStatus 
        }, 
        hasChanged: true 
      };
    }

    return { 
      updatedOrder: { 
        ...(order as Order), 
        total 
      }, 
      hasChanged: false 
    };
  }

  async addOrder(order: Order) {
    await db.insert(orders).values({
      ...order,
      createdAt: new Date(order.createdAt)
    });
  }

  async getOrder(id: string): Promise<Order | undefined> {
    const result = await db.select().from(orders).where(eq(orders.id, id)).limit(1);
    const order = result[0];
    
    if (!order) return undefined;
    
    const { updatedOrder, hasChanged } = this.getUpdatedOrder(order);

    if (hasChanged) {
      await db.update(orders)
        .set({ status: updatedOrder.status })
        .where(eq(orders.id, id));
    }

    return updatedOrder;
  }

  async getAllOrders(): Promise<Order[]> {
    const allOrders = await db.select().from(orders);
    
    const results: Order[] = [];
    for (const order of allOrders) {
      const { updatedOrder, hasChanged } = this.getUpdatedOrder(order);
      if (hasChanged) {
        await db.update(orders)
          .set({ status: updatedOrder.status })
          .where(eq(orders.id, order.id));
      }
      results.push(updatedOrder);
    }

    return results;
  }
}

// Global instance to persist in dev
const globalForOrderStore = global as unknown as { orderStore: OrderStore };
export const orderStore = globalForOrderStore.orderStore || new OrderStore();

if (process.env.NODE_ENV !== 'production') {
  globalForOrderStore.orderStore = orderStore;
}
