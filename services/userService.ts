import { User } from '@/types/user';
import users from '@/data/users.json';

let userList: User[] = [...users];

export const getAllUsers = async (): Promise<User[]> => {
  return Promise.resolve(userList);
};

export const addUser = async (user: Omit<User, 'id' | 'createdAt'>): Promise<User> => {
  const newUser: User = {
    ...user,
    id: String(userList.length + 1),
    createdAt: new Date().toISOString(),
  };
  userList.push(newUser);
  return Promise.resolve(newUser);
};

export const updateUser = async (updatedUser: User): Promise<User> => {
  userList = userList.map(user => (user.id === updatedUser.id ? updatedUser : user));
  return Promise.resolve(updatedUser);
};

export const deleteUser = async (userId: string): Promise<void> => {
  userList = userList.filter(user => user.id !== userId);
  return Promise.resolve();
};
