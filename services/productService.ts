'use client';

import { DataProduct, CreateProductInput, UpdateProductInput } from '@/types/product';
import { getAllDataSources } from './dataSourceService';
import initialData from '@/data/products.json';

// 内存存储
let productsStore: DataProduct[] = [...initialData];

// 生成唯一ID
const generateId = (): string => {
  return `prod-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// 获取所有产品
export const getAllProducts = async (): Promise<DataProduct[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));

  // 关联数据源名称
  const dataSources = await getAllDataSources();
  const products = productsStore.map(product => {
    const dataSource = dataSources.find(ds => ds.id === product.dataSourceId);
    return {
      ...product,
      dataSourceName: dataSource?.name || '未知数据源',
    };
  });

  return [...products];
};

// 根据ID获取产品
export const getProductById = async (id: string): Promise<DataProduct | null> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  const product = productsStore.find(p => p.id === id);
  if (!product) return null;

  // 关联数据源名称
  const dataSources = await getAllDataSources();
  const dataSource = dataSources.find(ds => ds.id === product.dataSourceId);

  return {
    ...product,
    dataSourceName: dataSource?.name || '未知数据源',
  };
};

// 创建产品
export const createProduct = async (input: CreateProductInput): Promise<DataProduct> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  // 关联数据源名称
  const dataSources = await getAllDataSources();
  const dataSource = dataSources.find(ds => ds.id === input.dataSourceId);

  const newProduct: DataProduct = {
    id: generateId(),
    name: input.name,
    dataFormat: input.dataFormat,
    dataSourceId: input.dataSourceId,
    dataSourceName: dataSource?.name || '未知数据源',
    productType: input.productType,
    billingMode: input.billingMode,
    dataTheme: input.dataTheme,
    dataAuthorization: input.dataAuthorization,
    applicationField: input.applicationField,
    transferMode: input.transferMode,
    tags: input.tags,
    description: input.description,
    createdAt: new Date().toISOString(),
    createdBy: input.createdBy,
  };

  productsStore.push(newProduct);

  // 保存到本地存储
  if (typeof window !== 'undefined') {
    localStorage.setItem('products', JSON.stringify(productsStore));
  }

  return { ...newProduct };
};

// 更新产品
export const updateProduct = async (input: UpdateProductInput): Promise<DataProduct | null> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const index = productsStore.findIndex(p => p.id === input.id);
  if (index === -1) {
    return null;
  }

  productsStore[index] = {
    ...productsStore[index],
    ...(input.name && { name: input.name }),
    ...(input.dataFormat && { dataFormat: input.dataFormat }),
    ...(input.dataSourceId && { dataSourceId: input.dataSourceId }),
    ...(input.productType && { productType: input.productType }),
    ...(input.billingMode && { billingMode: input.billingMode }),
    ...(input.dataTheme !== undefined && { dataTheme: input.dataTheme }),
    ...(input.dataAuthorization !== undefined && { dataAuthorization: input.dataAuthorization }),
    ...(input.applicationField && { applicationField: input.applicationField }),
    ...(input.transferMode && { transferMode: input.transferMode }),
    ...(input.tags && { tags: input.tags }),
    ...(input.description !== undefined && { description: input.description }),
  };

  // 关联数据源名称
  if (input.dataSourceId) {
    const dataSources = await getAllDataSources();
    const dataSource = dataSources.find(ds => ds.id === input.dataSourceId);
    productsStore[index].dataSourceName = dataSource?.name || '未知数据源';
  }

  // 保存到本地存储
  if (typeof window !== 'undefined') {
    localStorage.setItem('products', JSON.stringify(productsStore));
  }

  return { ...productsStore[index] };
};

// 删除产品
export const deleteProduct = async (id: string): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 400));

  const index = productsStore.findIndex(p => p.id === id);
  if (index === -1) {
    return false;
  }

  productsStore.splice(index, 1);

  // 保存到本地存储
  if (typeof window !== 'undefined') {
    localStorage.setItem('products', JSON.stringify(productsStore));
  }

  return true;
};

// 批量删除产品
export const batchDeleteProducts = async (ids: string[]): Promise<number> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const initialLength = productsStore.length;
  productsStore = productsStore.filter(p => !ids.includes(p.id));
  const deletedCount = initialLength - productsStore.length;

  // 保存到本地存储
  if (typeof window !== 'undefined') {
    localStorage.setItem('products', JSON.stringify(productsStore));
  }

  return deletedCount;
};

// 从本地存储初始化
export const initializeProductsFromLocalStorage = (): void => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('products');
    if (stored) {
      try {
        productsStore = JSON.parse(stored);
      } catch (error) {
        console.error('Failed to parse stored products:', error);
        productsStore = [...initialData];
      }
    }
  }
};
