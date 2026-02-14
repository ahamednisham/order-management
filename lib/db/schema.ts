import { pgTable, text, varchar, timestamp, numeric, jsonb } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  name: text('name'),
  phone: text('phone'),
  address: text('address'),
});

export const menuItems = pgTable('menu_items', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  image: text('image').notNull(),
  category: text('category').notNull(),
});

export const orders = pgTable('orders', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id),
  items: jsonb('items').notNull(),
  total: numeric('total', { precision: 10, scale: 2 }).notNull(),
  status: text('status').notNull(),
  deliveryDetails: jsonb('delivery_details').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
