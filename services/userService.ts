'use client';

import { User } from '@/types/user';
import initialData from '@/data/users.json';

// 内存存储
let usersStore: User[] = [...initialData];

// 获取所有用户
export const getAllUsers = async (): Promise<User[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return [...usersStore];
};

// 根据ID获取用户
export const getUserById = async (id: string): Promise<User | null> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  const user = usersStore.find(u => u.id === id);
  return user ? { ...user } : null;
};
