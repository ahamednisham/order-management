export type OrderStatus = 'Order Received' | 'Preparing' | 'Out for Delivery' | 'Delivered';

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name?: string;
  phone?: string;
  address?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface DeliveryDetails {
  name: string;
  address: string;
  phone: string;
}

export interface Order {
  id: string;
  userId?: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  deliveryDetails: DeliveryDetails;
  createdAt: string;
}
