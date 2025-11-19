'use client';

import { Role, CreateRoleInput, UpdateRoleInput } from '@/types/role';

// 初始数据
const initialData: Role[] = [
  {
    id: 'role-1',
    name: '管理员',
    scope: '系统',
    actions: ['create', 'read', 'update', 'delete'],
    permissionExpression: 'system:*',
    createdAt: '2024-01-15T08:00:00.000Z',
  },
  {
    id: 'role-2',
    name: '普通用户',
    scope: '业务',
    actions: ['read'],
    permissionExpression: 'business:read',
    createdAt: '2024-02-10T09:30:00.000Z',
  },
];

// 内存存储
let rolesStore: Role[] = [...initialData];

// 生成唯一ID
const generateId = (): string => {
  return `role-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// 获取所有角色
export const getAllRoles = async (): Promise<Role[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return [...rolesStore];
};

// 根据ID获取角色
export const getRoleById = async (id: string): Promise<Role | null> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  const role = rolesStore.find(r => r.id === id);
  return role ? { ...role } : null;
};

// 创建角色
export const createRole = async (input: CreateRoleInput): Promise<Role> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const newRole: Role = {
    id: generateId(),
    name: input.name,
    scope: input.scope,
    actions: input.actions,
    permissionExpression: input.permissionExpression,
    createdAt: new Date().toISOString(),
  };

  rolesStore.push(newRole);

  // 保存到本地存储
  if (typeof window !== 'undefined') {
    localStorage.setItem('roles', JSON.stringify(rolesStore));
  }

  return { ...newRole };
};

// 更新角色
export const updateRole = async (input: UpdateRoleInput): Promise<Role | null> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const index = rolesStore.findIndex(r => r.id === input.id);
  if (index === -1) {
    return null;
  }

  rolesStore[index] = {
    ...rolesStore[index],
    ...(input.name && { name: input.name }),
    ...(input.scope && { scope: input.scope }),
    ...(input.actions && { actions: input.actions }),
    ...(input.permissionExpression && { permissionExpression: input.permissionExpression }),
    updatedAt: new Date().toISOString(),
  };

  // 保存到本地存储
  if (typeof window !== 'undefined') {
    localStorage.setItem('roles', JSON.stringify(rolesStore));
  }

  return { ...rolesStore[index] };
};

// 删除角色
export const deleteRole = async (id: string): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 400));

  const index = rolesStore.findIndex(r => r.id === id);
  if (index === -1) {
    return false;
  }

  rolesStore.splice(index, 1);

  // 保存到本地存储
  if (typeof window !== 'undefined') {
    localStorage.setItem('roles', JSON.stringify(rolesStore));
  }

  return true;
};

// 批量删除角色
export const batchDeleteRoles = async (ids: string[]): Promise<number> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const initialLength = rolesStore.length;
  rolesStore = rolesStore.filter(r => !ids.includes(r.id));
  const deletedCount = initialLength - rolesStore.length;

  // 保存到本地存储
  if (typeof window !== 'undefined') {
    localStorage.setItem('roles', JSON.stringify(rolesStore));
  }

  return deletedCount;
};

// 从本地存储初始化
export const initializeRolesFromLocalStorage = (): void => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('roles');
    if (stored) {
      try {
        rolesStore = JSON.parse(stored);
      } catch (error) {
        console.error('Failed to parse stored roles:', error);
        rolesStore = [...initialData];
      }
    }
  }
};