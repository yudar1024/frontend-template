'use client';

import { TrustSpace, CreateTrustSpaceInput, UpdateTrustSpaceInput } from '@/types/trustSpace';
import initialData from '@/data/trustSpaces.json';

// 内存存储
let trustSpacesStore: TrustSpace[] = [...initialData];

// 生成唯一ID
const generateId = (): string => {
  return `space-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// 获取所有可信空间
export const getAllTrustSpaces = async (): Promise<TrustSpace[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return [...trustSpacesStore];
};

// 根据ID获取可信空间
export const getTrustSpaceById = async (id: string): Promise<TrustSpace | null> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  const space = trustSpacesStore.find(s => s.id === id);
  return space ? { ...space } : null;
};

// 创建可信空间
export const createTrustSpace = async (input: CreateTrustSpaceInput): Promise<TrustSpace> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const newSpace: TrustSpace = {
    id: generateId(),
    name: input.name,
    description: input.description,
    logo: input.logo,
    createdAt: new Date().toISOString(),
    createdBy: input.createdBy,
  };

  trustSpacesStore.push(newSpace);

  // 保存到本地存储
  if (typeof window !== 'undefined') {
    localStorage.setItem('trustSpaces', JSON.stringify(trustSpacesStore));
  }

  return { ...newSpace };
};

// 更新可信空间
export const updateTrustSpace = async (input: UpdateTrustSpaceInput): Promise<TrustSpace | null> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const index = trustSpacesStore.findIndex(s => s.id === input.id);
  if (index === -1) {
    return null;
  }

  trustSpacesStore[index] = {
    ...trustSpacesStore[index],
    ...(input.name && { name: input.name }),
    ...(input.description !== undefined && { description: input.description }),
    ...(input.logo !== undefined && { logo: input.logo }),
    updatedAt: new Date().toISOString(),
  };

  // 保存到本地存储
  if (typeof window !== 'undefined') {
    localStorage.setItem('trustSpaces', JSON.stringify(trustSpacesStore));
  }

  return { ...trustSpacesStore[index] };
};

// 删除可信空间
export const deleteTrustSpace = async (id: string): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 400));

  const index = trustSpacesStore.findIndex(s => s.id === id);
  if (index === -1) {
    return false;
  }

  trustSpacesStore.splice(index, 1);

  // 保存到本地存储
  if (typeof window !== 'undefined') {
    localStorage.setItem('trustSpaces', JSON.stringify(trustSpacesStore));
  }

  return true;
};

// 批量删除可信空间
export const batchDeleteTrustSpaces = async (ids: string[]): Promise<number> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const initialLength = trustSpacesStore.length;
  trustSpacesStore = trustSpacesStore.filter(s => !ids.includes(s.id));
  const deletedCount = initialLength - trustSpacesStore.length;

  // 保存到本地存储
  if (typeof window !== 'undefined') {
    localStorage.setItem('trustSpaces', JSON.stringify(trustSpacesStore));
  }

  return deletedCount;
};

// 从本地存储初始化
export const initializeTrustSpacesFromLocalStorage = (): void => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('trustSpaces');
    if (stored) {
      try {
        trustSpacesStore = JSON.parse(stored);
      } catch (error) {
        console.error('Failed to parse stored trust spaces:', error);
        trustSpacesStore = [...initialData];
      }
    }
  }
};
