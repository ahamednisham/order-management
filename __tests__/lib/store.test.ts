import { orderStore } from '../../lib/store';
import { Order } from '../../types';

describe('OrderStore', () => {
  const mockOrder: Order = {
    id: 'test-1',
    items: [{ id: '1', name: 'Pizza', price: 10, quantity: 1, description: '', image: '', category: 'Main Course' }],
    total: 10,
    status: 'Order Received',
    deliveryDetails: { name: 'John', address: '123 St', phone: '123' },
    createdAt: new Date().toISOString(),
  };

  beforeEach(() => {
    // Reset store if possible or use a fresh instance if we had one
    // For this simple store, we'll just add unique IDs
  });

  it('should add and retrieve an order', async () => {
    await orderStore.addOrder(mockOrder);
    const retrieved = await orderStore.getOrder(mockOrder.id);
    expect(retrieved).toBeDefined();
    expect(retrieved?.id).toBe(mockOrder.id);
  });

  it('should simulate status updates based on time', async () => {
    const oldOrder: Order = {
      ...mockOrder,
      id: 'test-old',
      createdAt: new Date(Date.now() - 70000).toISOString(), // 70s ago
    };
    await orderStore.addOrder(oldOrder);
    const retrieved = await orderStore.getOrder('test-old');
    expect(retrieved?.status).toBe('Out for Delivery');
  });

  it('should reach Delivered status after 120s', async () => {
    const deliveredOrder: Order = {
      ...mockOrder,
      id: 'test-delivered',
      createdAt: new Date(Date.now() - 130000).toISOString(), // 130s ago
    };
    await orderStore.addOrder(deliveredOrder);
    const retrieved = await orderStore.getOrder('test-delivered');
    expect(retrieved?.status).toBe('Delivered');
  });
});
