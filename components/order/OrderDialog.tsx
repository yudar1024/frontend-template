'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { DataProduct } from '@/types/product';
import { PurchaseType, purchaseTypeLabels } from '@/types/order';

interface OrderDialogProps {
  open: boolean;
  products: DataProduct[];
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function OrderDialog({
  open,
  products,
  onClose,
  onSubmit,
}: OrderDialogProps) {
  const [formData, setFormData] = useState({
    productId: '',
    price: 0,
    purchaseType: 'buyout' as PurchaseType,
  });

  useEffect(() => {
    if (open) {
      setFormData({
        productId: products[0]?.id || '',
        price: 0,
        purchaseType: 'buyout',
      });
    }
  }, [open, products]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const selectedProduct = products.find(p => p.id === formData.productId);
    if (!selectedProduct) return;

    const submitData = {
      product: selectedProduct,
      price: formData.price,
      purchaseType: formData.purchaseType,
      createdBy: 'current_user', // Replace with actual current user
    };
    onSubmit(submitData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>新建订单</Box>
        <IconButton size="small" onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <FormControl fullWidth margin="normal">
          <InputLabel>数据产品</InputLabel>
          <Select
            value={formData.productId}
            label="数据产品"
            onChange={e => handleChange('productId', e.target.value)}
          >
            {products.map(p => (
              <MenuItem key={p.id} value={p.id}>
                {p.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="购买价格"
          type="number"
          value={formData.price}
          onChange={e => handleChange('price', Number(e.target.value))}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>购买类型</InputLabel>
          <Select
            value={formData.purchaseType}
            label="购买类型"
            onChange={e => handleChange('purchaseType', e.target.value)}
          >
            {Object.entries(purchaseTypeLabels).map(([value, label]) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>取消</Button>
        <Button onClick={handleSubmit} variant="contained">
          创建
        </Button>
      </DialogActions>
    </Dialog>
  );
}