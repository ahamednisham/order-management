import fs from 'fs';
import path from 'path';
import { User } from '@/types';

const USERS_FILE = path.join(process.cwd(), 'data', 'users.json');

// Ensure data directory exists
if (!fs.existsSync(path.join(process.cwd(), 'data'))) {
  fs.mkdirSync(path.join(process.cwd(), 'data'));
}

// Ensure users file exists
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify([]));
}

export const getUsers = (): User[] => {
  const data = fs.readFileSync(USERS_FILE, 'utf-8');
  return JSON.parse(data);
};

export const saveUser = (user: User) => {
  const users = getUsers();
  users.push(user);
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

export const findUserByEmail = (email: string): User | undefined => {
  return getUsers().find((u) => u.email === email);
};

export const updateUser = (updatedUser: User) => {
  const users = getUsers();
  const index = users.findIndex((u) => u.id === updatedUser.id);
  if (index !== -1) {
    users[index] = updatedUser;
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  }
};
