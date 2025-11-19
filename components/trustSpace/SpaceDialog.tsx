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
import { TrustSpace } from '@/types/trustSpace';
import { User } from '@/types/user';
import { getAllUsers } from '@/services/userService';
import { Autocomplete } from '@mui/material';

interface SpaceDialogProps {
  open: boolean;
  editData?: TrustSpace | null;
  currentUser: string;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function SpaceDialog({
  open,
  editData,
  currentUser,
  onClose,
  onSubmit,
}: SpaceDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    logo: '',
    members: [] as string[],
  });

  const [users, setUsers] = useState<User[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getAllUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name,
        description: editData.description,
        logo: editData.logo || '',
        members: editData.members || [],
      });
    } else {
      setFormData({
        name: '',
        description: '',
        logo: '',
        members: [],
      });
    }
    setErrors({});
  }, [editData, open]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = '请输入空间名称';
    }
    if (!formData.description.trim()) {
      newErrors.description = '请输入空间描述';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      return;
    }

    const submitData = {
      ...(editData && { id: editData.id }),
      name: formData.name,
      description: formData.description,
      logo: formData.logo || undefined,
      members: formData.members,
      ...(!editData && { createdBy: currentUser }),
    };

    onSubmit(submitData);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '8px',
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ fontWeight: 600, fontSize: '1.125rem' }}>
          {editData ? '编辑可信空间' : '新建可信空间'}
        </Box>
        <IconButton size="small" onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, py: 1 }}>
          <TextField
            label="空间名称"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
            required
            size="small"
          />

          <TextField
            label="空间描述"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            error={!!errors.description}
            helperText={errors.description}
            fullWidth
            required
            multiline
            rows={4}
            size="small"
          />

          <TextField
            label="空间Logo (URL)"
            value={formData.logo}
            onChange={(e) => handleChange('logo', e.target.value)}
            helperText="输入图片URL地址，留空则使用默认图片"
            fullWidth
            size="small"
          />

          <Autocomplete
            multiple
            options={users}
            getOptionLabel={(option) => option.name}
            value={users.filter(user => formData.members.includes(user.id))}
            onChange={(_, newValue) => {
              handleChange('members', newValue.map(user => user.id));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="成员"
                placeholder="选择成员"
                size="small"
              />
            )}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button
          onClick={onClose}
          sx={{
            textTransform: 'none',
            color: '#737373',
          }}
        >
          取消
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            bgcolor: '#0a0a0a',
            color: '#ffffff',
            textTransform: 'none',
            '&:hover': {
              bgcolor: '#404040',
            },
          }}
        >
          {editData ? '保存' : '创建'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
