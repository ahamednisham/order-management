import { db } from './db';
import { users } from './db/schema';
import { User } from '@/types';
import { eq } from 'drizzle-orm';

export const getUsers = async (): Promise<User[]> => {
  const result = await db.select().from(users);
  return result as User[];
};

export const saveUser = async (user: User) => {
  await db.insert(users).values(user);
};

export const findUserByEmail = async (email: string): Promise<User | undefined> => {
  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return result[0] as User | undefined;
};

export const updateUser = async (updatedUser: User) => {
  await db.update(users)
    .set(updatedUser)
    .where(eq(users.id, updatedUser.id));
};
