'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { User } from '@/types/user';

interface UserDialogProps {
  open: boolean;
  editData?: User | null;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function UserDialog({
  open,
  editData,
  onClose,
  onSubmit,
}: UserDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name,
        email: editData.email,
        phone: editData.phone,
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
      });
    }
  }, [editData, open]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const submitData = {
      ...(editData && { id: editData.id }),
      ...formData,
      ...(!editData && { createdBy: 'current_user' }), // Replace with actual current user
    };
    onSubmit(submitData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>{editData ? '编辑用户' : '新建用户'}</Box>
        <IconButton size="small" onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <TextField
          label="姓名"
          value={formData.name}
          onChange={e => handleChange('name', e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="邮箱"
          value={formData.email}
          onChange={e => handleChange('email', e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="手机号"
          value={formData.phone}
          onChange={e => handleChange('phone', e.target.value)}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{
            textTransform: 'none',
            color: '#737373',
            '&:hover': { bgcolor: '#f5f5f5' },
          }}
        >取消</Button>
        <Button onClick={handleSubmit} variant="contained" 
         sx={{
            textTransform: 'none',
            bgcolor: '#0a0a0a',
            fontWeight: 500,
            '&:hover': { bgcolor: '#404040' },
          }}
        >
          {editData ? '保存' : '创建'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}