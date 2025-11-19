'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Chip,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { Order, orderStatusLabels, purchaseTypeLabels } from '@/types/order';

interface OrderTableProps {
  orders: Order[];
  onUpdateStatus: (orderId: string, status: Order['status']) => void;
  onDelete: (orderId: string) => void;
}

export default function OrderTable({ orders, onUpdateStatus, onDelete }: OrderTableProps) {
  const renderActions = (order: Order) => {
    switch (order.status) {
      case 'pending_payment':
        return (
          <Button onClick={() => onUpdateStatus(order.id, 'pending_authorization')}>
            支付
          </Button>
        );
      case 'pending_authorization':
        return (
          <Button onClick={() => onUpdateStatus(order.id, 'authorized')}>
            授权
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>订单ID</TableCell>
            <TableCell>数据产品</TableCell>
            <TableCell>购买价格</TableCell>
            <TableCell>购买类型</TableCell>
            <TableCell>状态</TableCell>
            <TableCell>创建者</TableCell>
            <TableCell>创建时间</TableCell>
            <TableCell>操作</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map(order => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.product.name}</TableCell>
              <TableCell>{order.price}</TableCell>
              <TableCell>{purchaseTypeLabels[order.purchaseType]}</TableCell>
              <TableCell>
                <Chip label={orderStatusLabels[order.status]} size="small" />
              </TableCell>
              <TableCell>{order.createdBy}</TableCell>
              <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
              <TableCell>
                {renderActions(order)}
                <IconButton onClick={() => onDelete(order.id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}