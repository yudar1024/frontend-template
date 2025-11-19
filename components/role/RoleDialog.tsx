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
  Chip,
  Typography,
  Autocomplete,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { Role } from '@/types/role';

interface RoleDialogProps {
  open: boolean;
  editData: Role | null;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const actionOptions = [
  { label: '创建', value: 'create' },
  { label: '读取', value: 'read' },
  { label: '更新', value: 'update' },
  { label: '删除', value: 'delete' },
];

export default function RoleDialog({
  open,
  editData,
  onClose,
  onSubmit,
}: RoleDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    scope: '',
    actions: [] as string[],
    permissionExpression: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    scope: '',
    permissionExpression: '',
  });

  useEffect(() => {
    if (open) {
      if (editData) {
        setFormData({
          name: editData.name,
          scope: editData.scope,
          actions: editData.actions,
          permissionExpression: editData.permissionExpression,
        });
      } else {
        setFormData({
          name: '',
          scope: '',
          actions: [],
          permissionExpression: '',
        });
      }
      setErrors({ name: '', scope: '', permissionExpression: '' });
    }
  }, [open, editData]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const newErrors = { name: '', scope: '', permissionExpression: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = '请输入角色名称';
      isValid = false;
    } else if (formData.name.length > 50) {
      newErrors.name = '角色名称不能超过50个字符';
      isValid = false;
    }

    if (!formData.scope.trim()) {
      newErrors.scope = '请输入范围';
      isValid = false;
    } else if (formData.scope.length > 100) {
      newErrors.scope = '范围不能超过100个字符';
      isValid = false;
    }

    if (!formData.permissionExpression.trim()) {
      newErrors.permissionExpression = '请输入权限表达式';
      isValid = false;
    } else if (formData.permissionExpression.length > 200) {
      newErrors.permissionExpression = '权限表达式不能超过200个字符';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const submitData = editData
      ? {
          id: editData.id,
          name: formData.name,
          scope: formData.scope,
          actions: formData.actions,
          permissionExpression: formData.permissionExpression,
        }
      : {
          name: formData.name,
          scope: formData.scope,
          actions: formData.actions,
          permissionExpression: formData.permissionExpression,
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
          borderRadius: '12px',
          maxHeight: '90vh',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontWeight: 600,
          pb: 2,
        }}
      >
        {editData ? '编辑角色' : '新建角色'}
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            color: '#737373',
            '&:hover': { bgcolor: '#f5f5f5' },
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ py: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* 角色名称 */}
          <TextField
            label="角色名称"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
            placeholder="请输入角色名称"
            fullWidth
            required
            InputLabelProps={{ required: true }}
          />

          {/* 范围 */}
          <TextField
            label="范围"
            value={formData.scope}
            onChange={(e) => handleChange('scope', e.target.value)}
            error={!!errors.scope}
            helperText={errors.scope}
            placeholder="请输入范围"
            fullWidth
            required
            InputLabelProps={{ required: true }}
          />

          {/* 动作 */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 500 }}>
              动作
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {actionOptions.map((action) => (
                <FormControlLabel
                  key={action.value}
                  control={
                    <Checkbox
                      checked={formData.actions.includes(action.value)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          handleChange('actions', [...formData.actions, action.value]);
                        } else {
                          handleChange('actions', formData.actions.filter(a => a !== action.value));
                        }
                      }}
                    />
                  }
                  label={action.label}
                  sx={{
                    border: '1px solid #e5e5e5',
                    borderRadius: '6px',
                    px: 1.5,
                    py: 0.5,
                    m: 0,
                    mr: 1,
                  }}
                />
              ))}
            </Box>
            <Typography variant="caption" sx={{ color: '#737373', mt: 1, display: 'block' }}>
              已选择 {formData.actions.length} 个动作
            </Typography>
          </Box>

          {/* 权限表达式 */}
          <TextField
            label="权限表达式"
            value={formData.permissionExpression}
            onChange={(e) => handleChange('permissionExpression', e.target.value)}
            error={!!errors.permissionExpression}
            helperText={errors.permissionExpression}
            placeholder="请输入权限表达式"
            fullWidth
            required
            multiline
            rows={3}
            InputLabelProps={{ required: true }}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
        <Button
          onClick={onClose}
          sx={{
            textTransform: 'none',
            color: '#737373',
            '&:hover': { bgcolor: '#f5f5f5' },
          }}
        >
          取消
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
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