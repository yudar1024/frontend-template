import { DataProduct } from './product';

export type OrderStatus = 'pending_payment' | 'pending_authorization' | 'authorized';
export type PurchaseType = 'buyout' | 'yearly' | 'monthly';

export const orderStatusLabels: Record<OrderStatus, string> = {
  pending_payment: '待支付',
  pending_authorization: '待授权',
  authorized: '已授权',
};

export const purchaseTypeLabels: Record<PurchaseType, string> = {
  buyout: '买断',
  yearly: '包年',
  monthly: '包月',
};

export interface Order {
  id: string;
  product: DataProduct;
  price: number;
  purchaseType: PurchaseType;
  status: OrderStatus;
  createdBy: string;
  createdAt: string;
}