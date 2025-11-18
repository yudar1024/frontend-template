'use client';

import { DataSource, CreateDataSourceInput, UpdateDataSourceInput } from '@/types/dataSource';
import initialData from '@/data/dataSources.json';

// 内存存储
let dataSourcesStore: DataSource[] = [...initialData];

// 生成唯一ID
const generateId = (): string => {
  return `ds-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// 获取所有数据源
export const getAllDataSources = async (): Promise<DataSource[]> => {
  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 300));
  return [...dataSourcesStore];
};

// 根据ID获取数据源
export const getDataSourceById = async (id: string): Promise<DataSource | null> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  const dataSource = dataSourcesStore.find(ds => ds.id === id);
  return dataSource ? { ...dataSource } : null;
};

// 创建数据源
export const createDataSource = async (input: CreateDataSourceInput): Promise<DataSource> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const newDataSource: DataSource = {
    id: generateId(),
    name: input.name,
    type: input.type,
    databaseUrl: input.databaseUrl,
    username: input.username,
    password: input.password,
    filePath: input.filePath,
    createdAt: new Date().toISOString(),
    createdBy: input.createdBy,
  };

  dataSourcesStore.push(newDataSource);

  // 模拟保存到本地存储
  if (typeof window !== 'undefined') {
    localStorage.setItem('dataSources', JSON.stringify(dataSourcesStore));
  }

  return { ...newDataSource };
};

// 更新数据源
export const updateDataSource = async (input: UpdateDataSourceInput): Promise<DataSource | null> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const index = dataSourcesStore.findIndex(ds => ds.id === input.id);
  if (index === -1) {
    return null;
  }

  dataSourcesStore[index] = {
    ...dataSourcesStore[index],
    ...(input.name && { name: input.name }),
    ...(input.type && { type: input.type }),
    ...(input.databaseUrl !== undefined && { databaseUrl: input.databaseUrl }),
    ...(input.username !== undefined && { username: input.username }),
    ...(input.password !== undefined && { password: input.password }),
    ...(input.filePath !== undefined && { filePath: input.filePath }),
  };

  // 模拟保存到本地存储
  if (typeof window !== 'undefined') {
    localStorage.setItem('dataSources', JSON.stringify(dataSourcesStore));
  }

  return { ...dataSourcesStore[index] };
};

// 删除数据源
export const deleteDataSource = async (id: string): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 400));

  const index = dataSourcesStore.findIndex(ds => ds.id === id);
  if (index === -1) {
    return false;
  }

  dataSourcesStore.splice(index, 1);

  // 模拟保存到本地存储
  if (typeof window !== 'undefined') {
    localStorage.setItem('dataSources', JSON.stringify(dataSourcesStore));
  }

  return true;
};

// 批量删除数据源
export const batchDeleteDataSources = async (ids: string[]): Promise<number> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const initialLength = dataSourcesStore.length;
  dataSourcesStore = dataSourcesStore.filter(ds => !ids.includes(ds.id));
  const deletedCount = initialLength - dataSourcesStore.length;

  // 模拟保存到本地存储
  if (typeof window !== 'undefined') {
    localStorage.setItem('dataSources', JSON.stringify(dataSourcesStore));
  }

  return deletedCount;
};

// 从本地存储初始化
export const initializeFromLocalStorage = (): void => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('dataSources');
    if (stored) {
      try {
        dataSourcesStore = JSON.parse(stored);
      } catch (error) {
        console.error('Failed to parse stored data sources:', error);
        dataSourcesStore = [...initialData];
      }
    }
  }
};
