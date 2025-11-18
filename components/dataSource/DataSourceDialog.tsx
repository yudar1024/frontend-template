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
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Close, Visibility, VisibilityOff } from '@mui/icons-material';
import { DataSource, DataSourceType } from '@/types/dataSource';

interface DataSourceDialogProps {
  open: boolean;
  editData?: DataSource | null;
  currentUser: string;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function DataSourceDialog({
  open,
  editData,
  currentUser,
  onClose,
  onSubmit,
}: DataSourceDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'database' as DataSourceType,
    databaseUrl: '',
    username: '',
    password: '',
    filePath: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name,
        type: editData.type,
        databaseUrl: editData.databaseUrl || '',
        username: editData.username || '',
        password: editData.password || '',
        filePath: editData.filePath || '',
      });
    } else {
      setFormData({
        name: '',
        type: 'database',
        databaseUrl: '',
        username: '',
        password: '',
        filePath: '',
      });
    }
    setErrors({});
  }, [editData, open]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // 清除该字段的错误
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
      newErrors.name = '请输入数据源名称';
    }

    if (formData.type === 'database') {
      if (!formData.databaseUrl.trim()) {
        newErrors.databaseUrl = '请输入数据库连接地址';
      }
      if (!formData.username.trim()) {
        newErrors.username = '请输入用户名';
      }
    } else {
      if (!formData.filePath.trim()) {
        newErrors.filePath = '请输入文件路径';
      }
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
      type: formData.type,
      ...(formData.type === 'database' && {
        databaseUrl: formData.databaseUrl,
        username: formData.username,
        password: formData.password,
      }),
      ...(formData.type === 'file' && {
        filePath: formData.filePath,
      }),
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
          {editData ? '编辑数据源' : '新建数据源'}
        </Box>
        <IconButton size="small" onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, py: 1 }}>
          <TextField
            label="数据源名称"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
            required
            size="small"
          />

          <FormControl component="fieldset">
            <FormLabel component="legend" sx={{ fontSize: '0.875rem', mb: 1 }}>
              数据源类型 *
            </FormLabel>
            <RadioGroup
              row
              value={formData.type}
              onChange={(e) => handleChange('type', e.target.value as DataSourceType)}
            >
              <FormControlLabel value="database" control={<Radio />} label="数据库" />
              <FormControlLabel value="file" control={<Radio />} label="文件" />
            </RadioGroup>
          </FormControl>

          {formData.type === 'database' ? (
            <>
              <TextField
                label="数据库连接地址"
                value={formData.databaseUrl}
                onChange={(e) => handleChange('databaseUrl', e.target.value)}
                error={!!errors.databaseUrl}
                helperText={errors.databaseUrl || '例如: mysql://localhost:3306/dbname'}
                fullWidth
                required
                size="small"
              />

              <TextField
                label="用户名"
                value={formData.username}
                onChange={(e) => handleChange('username', e.target.value)}
                error={!!errors.username}
                helperText={errors.username}
                fullWidth
                required
                size="small"
              />

              <TextField
                label="密码"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                fullWidth
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </>
          ) : (
            <TextField
              label="文件路径"
              value={formData.filePath}
              onChange={(e) => handleChange('filePath', e.target.value)}
              error={!!errors.filePath}
              helperText={errors.filePath || '例如: /data/sales/2024_sales.csv'}
              fullWidth
              required
              size="small"
            />
          )}
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
