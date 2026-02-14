import { orderStore } from '../../lib/store';
import { Order } from '../../types';

// Mock the database
jest.mock('../../lib/db', () => ({
  db: {
    insert: jest.fn().mockReturnValue({
      values: jest.fn().mockResolvedValue({}),
    }),
    select: jest.fn().mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          limit: jest.fn().mockImplementation((id) => {
            // Return different values based on the ID for testing
            return Promise.resolve([]);
          }),
        }),
        then: jest.fn(),
      }),
    }),
    update: jest.fn().mockReturnValue({
      set: jest.fn().mockReturnValue({
        where: jest.fn().mockResolvedValue({}),
      }),
    }),
  },
}));

import { db } from '../../lib/db';

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
    jest.clearAllMocks();
  });

  it('should add an order', async () => {
    await orderStore.addOrder(mockOrder);
    expect(db.insert).toHaveBeenCalled();
  });

  it('should retrieve and simulate status updates', async () => {
    const oldOrder = {
      ...mockOrder,
      id: 'test-old',
      createdAt: new Date(Date.now() - 70000) // 70s ago
    };

    (db.select as jest.Mock).mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue([oldOrder])
        })
      })
    });

    const retrieved = await orderStore.getOrder('test-old');
    expect(retrieved?.status).toBe('Out for Delivery');
    expect(db.update).toHaveBeenCalled();
  });

  it('should reach Delivered status after 120s', async () => {
    const deliveredOrder = {
      ...mockOrder,
      id: 'test-delivered',
      createdAt: new Date(Date.now() - 130000) // 130s ago
    };

    (db.select as jest.Mock).mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue([deliveredOrder])
        })
      })
    });

    const retrieved = await orderStore.getOrder('test-delivered');
    expect(retrieved?.status).toBe('Delivered');
  });
});
