import { authSchema, profileSchema, orderSchema } from '../../lib/validations';

describe('Validation Schemas', () => {
  describe('authSchema', () => {
    it('should validate correct email and password', () => {
      const validData = { email: 'test@example.com', password: 'password123' };
      expect(authSchema.safeParse(validData).success).toBe(true);
    });

    it('should fail invalid email', () => {
      const invalidData = { email: 'invalid-email', password: 'password123' };
      const result = authSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Invalid email address');
      }
    });

    it('should fail short password', () => {
      const invalidData = { email: 'test@example.com', password: 'short' };
      const result = authSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Password must be at least 8 characters long');
      }
    });
  });

  describe('profileSchema', () => {
    it('should validate correct profile data', () => {
      const validData = { name: 'John Doe', phone: '+1234567890', address: '123 Main St' };
      expect(profileSchema.safeParse(validData).success).toBe(true);
    });

    it('should fail invalid phone number', () => {
      const invalidData = { name: 'John Doe', phone: 'abc', address: '123 Main St' };
      const result = profileSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Phone number should only contain numbers and the "+" symbol');
      }
    });
  });

  describe('orderSchema', () => {
    it('should validate correct order data', () => {
      const validData = {
        items: [
          {
            id: '1',
            name: 'Pizza',
            price: 10,
            quantity: 1,
            description: 'Yummy',
            image: '/pizza.jpg',
            category: 'Main Course'
          }
        ],
        deliveryDetails: {
          name: 'John Doe',
          phone: '+1234567890',
          address: '123 Main St'
        }
      };
      expect(orderSchema.safeParse(validData).success).toBe(true);
    });

    it('should fail empty cart', () => {
      const invalidData = {
        items: [],
        deliveryDetails: {
          name: 'John Doe',
          phone: '+1234567890',
          address: '123 Main St'
        }
      };
      const result = orderSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Cart is empty');
      }
    });
  });
});
