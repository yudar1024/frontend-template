'use client';

import React, { useState, useEffect } from 'react';
import PageContainer from '@/components/common/PageContainer';
import OrderTable from '@/components/order/OrderTable';
import OrderDialog from '@/components/order/OrderDialog';
import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { getOrders, addOrder, updateOrderStatus, deleteOrder } from '@/services/orderService';
import { getAllProducts } from '@/services/productService';
import { Order } from '@/types/order';
import { DataProduct } from '@/types/product';

export default function AllOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<DataProduct[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    const [orderList, productList] = await Promise.all([getOrders(), getAllProducts()]);
    setOrders(orderList);
    setProducts(productList);
  };

  const handleAddOrder = () => {
    setDialogOpen(true);
  };

  const handleDeleteOrder = async (orderId: string) => {
    await deleteOrder(orderId);
    loadInitialData();
  };

  const handleUpdateStatus = async (orderId: string, status: Order['status']) => {
    await updateOrderStatus(orderId, status);
    loadInitialData();
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogSubmit = async (data: any) => {
    await addOrder(data);
    loadInitialData();
    handleDialogClose();
  };

  return (
    <PageContainer
      title="全部订单"
      description="查看和管理所有订单信息"
      breadcrumbs={[
        { label: '订单管理', href: '/orders' },
        { label: '全部订单' },
      ]}
      actions={
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddOrder}
          sx={{
            bgcolor: '#0a0a0a',
            color: '#ffffff',
            textTransform: 'none',
            fontWeight: 500,
            '&:hover': {
              bgcolor: '#404040',
            },
          }}
        >
          新建订单
        </Button>
      }
    >
      <OrderTable orders={orders} onUpdateStatus={handleUpdateStatus} onDelete={handleDeleteOrder} />
      <OrderDialog
        open={dialogOpen}
        products={products}
        onClose={handleDialogClose}
        onSubmit={handleDialogSubmit}
      />
    </PageContainer>
  );
}
