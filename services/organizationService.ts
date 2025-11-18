'use client';

import { Organization, CreateOrganizationInput, UpdateOrganizationInput } from '@/types/organization';
import initialData from '@/data/organizations.json';

// 内存存储
let organizationsStore: Organization[] = [...initialData];

// 生成唯一ID
const generateId = (): string => {
  return `org-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// 获取所有组织
export const getAllOrganizations = async (): Promise<Organization[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return [...organizationsStore];
};

// 根据ID获取组织
export const getOrganizationById = async (id: string): Promise<Organization | null> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  const organization = organizationsStore.find(o => o.id === id);
  return organization ? { ...organization } : null;
};

// 创建组织
export const createOrganization = async (input: CreateOrganizationInput): Promise<Organization> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const newOrganization: Organization = {
    id: generateId(),
    name: input.name,
    description: input.description,
    members: input.members || [],
    createdAt: new Date().toISOString(),
  };

  organizationsStore.push(newOrganization);

  // 保存到本地存储
  if (typeof window !== 'undefined') {
    localStorage.setItem('organizations', JSON.stringify(organizationsStore));
  }

  return { ...newOrganization };
};

// 更新组织
export const updateOrganization = async (input: UpdateOrganizationInput): Promise<Organization | null> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const index = organizationsStore.findIndex(o => o.id === input.id);
  if (index === -1) {
    return null;
  }

  organizationsStore[index] = {
    ...organizationsStore[index],
    ...(input.name && { name: input.name }),
    ...(input.description !== undefined && { description: input.description }),
    ...(input.members !== undefined && { members: input.members }),
    updatedAt: new Date().toISOString(),
  };

  // 保存到本地存储
  if (typeof window !== 'undefined') {
    localStorage.setItem('organizations', JSON.stringify(organizationsStore));
  }

  return { ...organizationsStore[index] };
};

// 删除组织
export const deleteOrganization = async (id: string): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 400));

  const index = organizationsStore.findIndex(o => o.id === id);
  if (index === -1) {
    return false;
  }

  organizationsStore.splice(index, 1);

  // 保存到本地存储
  if (typeof window !== 'undefined') {
    localStorage.setItem('organizations', JSON.stringify(organizationsStore));
  }

  return true;
};

// 批量删除组织
export const batchDeleteOrganizations = async (ids: string[]): Promise<number> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const initialLength = organizationsStore.length;
  organizationsStore = organizationsStore.filter(o => !ids.includes(o.id));
  const deletedCount = initialLength - organizationsStore.length;

  // 保存到本地存储
  if (typeof window !== 'undefined') {
    localStorage.setItem('organizations', JSON.stringify(organizationsStore));
  }

  return deletedCount;
};

// 从本地存储初始化
export const initializeOrganizationsFromLocalStorage = (): void => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('organizations');
    if (stored) {
      try {
        organizationsStore = JSON.parse(stored);
      } catch (error) {
        console.error('Failed to parse stored organizations:', error);
        organizationsStore = [...initialData];
      }
    }
  }
};
