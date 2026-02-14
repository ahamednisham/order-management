import { z } from 'zod';

export const authSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  phone: z.string().regex(/^[0-9+]+$/, 'Phone number should only contain numbers and the "+" symbol'),
  address: z.string().min(2, 'Address must be at least 2 characters long'),
});

export const orderSchema = z.object({
  items: z.array(z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
    quantity: z.number().min(1),
    description: z.string(),
    image: z.string(),
    category: z.string(),
  })).min(1, 'Cart is empty'),
  deliveryDetails: profileSchema,
});
