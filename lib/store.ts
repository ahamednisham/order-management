import { Order, OrderStatus } from '../types';

// Simple in-memory store
class OrderStore {
  private orders: Map<string, Order> = new Map();

  addOrder(order: Order) {
    this.orders.set(order.id, order);
  }

  getOrder(id: string): Order | undefined {
    const order = this.orders.get(id);
    if (!order) return undefined;

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

    if (statusPriority[currentStatus] > statusPriority[order.status]) {
      const updatedOrder = { ...order, status: currentStatus };
      this.orders.set(id, updatedOrder);
      return updatedOrder;
    }

    return order;
  }

  getAllOrders(): Order[] {
    return Array.from(this.orders.values());
  }
}

// Global instance to persist in dev
const globalForOrderStore = global as unknown as { orderStore: OrderStore };
export const orderStore = globalForOrderStore.orderStore || new OrderStore();

if (process.env.NODE_ENV !== 'production') {
  globalForOrderStore.orderStore = orderStore;
}
