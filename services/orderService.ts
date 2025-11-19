import { Order } from '@/types/order';
import orders from '@/data/orders.json';
import products from '@/data/products.json';
import { DataProduct } from '@/types/product';

let orderList: Order[] = orders.map(order => {

  const product = products.find(p => p.id === (order as any).productId) as DataProduct;
  return { ...order, product };
});



export const getOrders = async (): Promise<Order[]> => {
  return Promise.resolve(orderList);
};

export const addOrder = async (order: Omit<Order, 'id' | 'createdAt' | 'status'>): Promise<Order> => {
  const newOrder: Order = {
    ...order,
    id: String(orderList.length + 1),
    status: 'pending_payment',
    createdAt: new Date().toISOString(),
  };
  orderList.push(newOrder);
  return Promise.resolve(newOrder);
};

export const updateOrderStatus = async (orderId: string, status: Order['status']): Promise<Order> => {
  let updatedOrder: Order | undefined;
  orderList = orderList.map(order => {
    if (order.id === orderId) {
      updatedOrder = { ...order, status };
      return updatedOrder;
    }
    return order;
  });
  if (!updatedOrder) {
    throw new Error('Order not found');
  }
  return Promise.resolve(updatedOrder);
};

export const deleteOrder = async (orderId: string): Promise<void> => {
  orderList = orderList.filter(order => order.id !== orderId);
  return Promise.resolve();
};