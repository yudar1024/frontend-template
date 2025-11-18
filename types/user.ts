// 用户类型定义

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt?: string;
}

export interface CreateUserInput {
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface UpdateUserInput {
  id: string;
  name?: string;
  email?: string;
  role?: string;
  avatar?: string;
  status?: 'active' | 'inactive';
}
