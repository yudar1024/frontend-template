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
  Chip,
  Grid,
  FormHelperText,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import {
  DataProduct,
  DataFormat,
  ProductType,
  BillingMode,
  ApplicationField,
  TransferMode,
  dataFormatLabels,
  productTypeLabels,
  billingModeLabels,
  applicationFieldLabels,
  transferModeLabels,
} from '@/types/product';
import { DataSource } from '@/types/dataSource';

interface ProductDialogProps {
  open: boolean;
  editData?: DataProduct | null;
  dataSources: DataSource[];
  currentUser: string;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function ProductDialog({
  open,
  editData,
  dataSources,
  currentUser,
  onClose,
  onSubmit,
}: ProductDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    dataFormat: 'json' as DataFormat,
    dataSourceId: '',
    productType: 'api' as ProductType,
    billingMode: 'monthly' as BillingMode,
    dataTheme: '',
    dataAuthorization: '',
    applicationField: 'finance' as ApplicationField,
    transferMode: 'pull' as TransferMode,
    tags: [] as string[],
    description: '',
  });

  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name,
        dataFormat: editData.dataFormat,
        dataSourceId: editData.dataSourceId,
        productType: editData.productType,
        billingMode: editData.billingMode,
        dataTheme: editData.dataTheme,
        dataAuthorization: editData.dataAuthorization,
        applicationField: editData.applicationField,
        transferMode: editData.transferMode,
        tags: editData.tags,
        description: editData.description,
      });
    } else {
      setFormData({
        name: '',
        dataFormat: 'json',
        dataSourceId: dataSources[0]?.id || '',
        productType: 'api',
        billingMode: 'monthly',
        dataTheme: '',
        dataAuthorization: '',
        applicationField: 'finance',
        transferMode: 'pull',
        tags: [],
        description: '',
      });
    }
    setTagInput('');
    setErrors({});
  }, [editData, open, dataSources]);

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

  const handleAddTag = () => {
    const tag = tagInput.trim();
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }));
      setTagInput('');
    }
  };

  const handleDeleteTag = (tagToDelete: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToDelete),
    }));
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = '请输入产品名称';
    }
    if (!formData.dataSourceId) {
      newErrors.dataSourceId = '请选择数据源';
    }
    if (!formData.dataTheme.trim()) {
      newErrors.dataTheme = '请输入数据主题';
    }
    if (!formData.dataAuthorization.trim()) {
      newErrors.dataAuthorization = '请输入数据授权';
    }
    if (!formData.description.trim()) {
      newErrors.description = '请输入产品描述';
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
      ...formData,
      ...(!editData && { createdBy: currentUser }),
    };

    onSubmit(submitData);
  };

  // @ts-ignore
    // @ts-ignore
    return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '8px',
          minHeight: '600px',
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ fontWeight: 600, fontSize: '1.125rem' }}>
          {editData ? '编辑数据产品' : '新建数据产品'}
        </Box>
        <IconButton size="small" onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ minHeight: '500px' }}>
        <Box sx={{ py: 2 }}>
          <Grid container spacing={2.5} sx={{ width: '100%' }}>
            {/* 第一行: 产品名称、数据格式、本地数据源 */}
            <Grid size={4} xs={12} sm={6} md={4} lg={4}>
              <TextField
                label="产品名称"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                error={!!errors.name}
                helperText={errors.name}
                fullWidth
                required
                size="small"
              />
            </Grid>

            <Grid size={4} xs={12} sm={6} md={4} lg={4}>
              <FormControl fullWidth size="small" required>
                <InputLabel>数据格式</InputLabel>
                <Select
                  value={formData.dataFormat}
                  label="数据格式"
                  onChange={(e) => handleChange('dataFormat', e.target.value)}
                >
                  {Object.entries(dataFormatLabels).map(([value, label]) => (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={4} xs={12} sm={6} md={4} lg={4}>
              <FormControl
                fullWidth
                size="small"
                required
                error={!!errors.dataSourceId}
              >
                <InputLabel>本地数据源</InputLabel>
                <Select
                  value={formData.dataSourceId}
                  label="本地数据源"
                  onChange={(e) => handleChange('dataSourceId', e.target.value)}
                >
                  {dataSources.map((ds) => (
                    <MenuItem key={ds.id} value={ds.id}>
                      {ds.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.dataSourceId && (
                  <FormHelperText>{errors.dataSourceId}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/* 第二行: 产品类型、计费模式、应用领域 */}
            <Grid size={4} xs={12} sm={6} md={4} lg={4}>
              <FormControl fullWidth size="small" required>
                <InputLabel>产品类型</InputLabel>
                <Select
                  value={formData.productType}
                  label="产品类型"
                  onChange={(e) => handleChange('productType', e.target.value)}
                >
                  {Object.entries(productTypeLabels).map(([value, label]) => (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={4} xs={12} sm={6} md={4} lg={4}>
              <FormControl fullWidth size="small" required>
                <InputLabel>计费模式</InputLabel>
                <Select
                  value={formData.billingMode}
                  label="计费模式"
                  onChange={(e) => handleChange('billingMode', e.target.value)}
                >
                  {Object.entries(billingModeLabels).map(([value, label]) => (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={4} xs={12} sm={6} md={4} lg={4}>
              <FormControl fullWidth size="small" required>
                <InputLabel>应用领域</InputLabel>
                <Select
                  value={formData.applicationField}
                  label="应用领域"
                  onChange={(e) => handleChange('applicationField', e.target.value)}
                >
                  {Object.entries(applicationFieldLabels).map(([value, label]) => (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* 第三行: 数据主题、数据授权、传输模式 */}
            <Grid size={4} xs={12} sm={6} md={4} lg={4}>
              <TextField
                label="数据主题"
                value={formData.dataTheme}
                onChange={(e) => handleChange('dataTheme', e.target.value)}
                error={!!errors.dataTheme}
                helperText={errors.dataTheme}
                fullWidth
                required
                size="small"
              />
            </Grid>

            <Grid size={4} xs={12} sm={6} md={4} lg={4}>
              <TextField
                label="数据授权"
                value={formData.dataAuthorization}
                onChange={(e) => handleChange('dataAuthorization', e.target.value)}
                error={!!errors.dataAuthorization}
                helperText={errors.dataAuthorization}
                fullWidth
                required
                size="small"
              />
            </Grid>

            <Grid size={4} xs={12} sm={6} md={4} lg={4}>
              <FormControl fullWidth size="small" required>
                <InputLabel>传输模式</InputLabel>
                <Select
                  value={formData.transferMode}
                  label="传输模式"
                  onChange={(e) => handleChange('transferMode', e.target.value)}
                >
                  {Object.entries(transferModeLabels).map(([value, label]) => (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* 第四行: 产品标签（占满整行） */}
            <Grid size={4} xs={12} sm={6} md={4} lg={4}>
              <TextField
                label="产品标签"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagInputKeyDown}
                onBlur={handleAddTag}
                fullWidth
                size="small"
                placeholder="输入标签后按回车或失焦添加"
              />
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                {formData.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    size="small"
                    onDelete={() => handleDeleteTag(tag)}
                    sx={{ bgcolor: '#f5f5f5' }}
                  />
                ))}
              </Box>
            </Grid>

            {/* 第五行: 产品描述（占满整行） */}
            <Grid size={12} xs={12}>
              <TextField
                label="产品描述"
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
            </Grid>
          </Grid>
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
