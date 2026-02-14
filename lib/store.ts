import fs from 'fs';
import path from 'path';
import { Order, OrderStatus } from '../types';

const ORDERS_FILE = path.join(process.cwd(), 'data', 'orders.json');

// Ensure data directory exists
if (!fs.existsSync(path.join(process.cwd(), 'data'))) {
  fs.mkdirSync(path.join(process.cwd(), 'data'));
}

// Ensure orders file exists
if (!fs.existsSync(ORDERS_FILE)) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify([]));
}

class OrderStore {
  private getOrdersFromFile(): Order[] {
    try {
      const data = fs.readFileSync(ORDERS_FILE, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  private saveOrdersToFile(orders: Order[]) {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
  }

  private getUpdatedOrder(order: Order): { updatedOrder: Order; hasChanged: boolean } {
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
      return { updatedOrder: { ...order, status: currentStatus }, hasChanged: true };
    }

    return { updatedOrder: order, hasChanged: false };
  }

  addOrder(order: Order) {
    const orders = this.getOrdersFromFile();
    orders.push(order);
    this.saveOrdersToFile(orders);
  }

  getOrder(id: string): Order | undefined {
    const orders = this.getOrdersFromFile();
    const orderIndex = orders.findIndex(o => o.id === id);
    
    if (orderIndex === -1) return undefined;
    
    const { updatedOrder, hasChanged } = this.getUpdatedOrder(orders[orderIndex]);

    if (hasChanged) {
      orders[orderIndex] = updatedOrder;
      this.saveOrdersToFile(orders);
    }

    return updatedOrder;
  }

  getAllOrders(): Order[] {
    const orders = this.getOrdersFromFile();
    let anyChanged = false;

    const updatedOrders = orders.map(order => {
      const { updatedOrder, hasChanged } = this.getUpdatedOrder(order);
      if (hasChanged) anyChanged = true;
      return updatedOrder;
    });

    if (anyChanged) {
      this.saveOrdersToFile(updatedOrders);
    }

    return updatedOrders;
  }
}

// Global instance to persist in dev
const globalForOrderStore = global as unknown as { orderStore: OrderStore };
export const orderStore = globalForOrderStore.orderStore || new OrderStore();

if (process.env.NODE_ENV !== 'production') {
  globalForOrderStore.orderStore = orderStore;
}
