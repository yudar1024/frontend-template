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
  Autocomplete,
  Chip,
  Avatar,
  Typography,
  CircularProgress,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { Organization } from '@/types/organization';
import { User } from '@/types/user';
import { getAllUsers } from '@/services/userService';

interface OrganizationDialogProps {
  open: boolean;
  editData: Organization | null;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function OrganizationDialog({
  open,
  editData,
  onClose,
  onSubmit,
}: OrganizationDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    members: [] as User[],
  });
  const [errors, setErrors] = useState({
    name: '',
    description: '',
  });
  const [availableUsers, setAvailableUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  useEffect(() => {
    if (open) {
      loadUsers();
      if (editData) {
        setFormData({
          name: editData.name,
          description: editData.description,
          members: editData.members || [],
        });
      } else {
        setFormData({
          name: '',
          description: '',
          members: [],
        });
      }
      setErrors({ name: '', description: '' });
    }
  }, [open, editData]);

  const loadUsers = async () => {
    try {
      setLoadingUsers(true);
      const users = await getAllUsers();
      setAvailableUsers(users);
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const newErrors = { name: '', description: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = '请输入组织名称';
      isValid = false;
    } else if (formData.name.length > 50) {
      newErrors.name = '组织名称不能超过50个字符';
      isValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = '请输入组织描述';
      isValid = false;
    } else if (formData.description.length > 200) {
      newErrors.description = '组织描述不能超过200个字符';
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
          description: formData.description,
          members: formData.members,
        }
      : {
          name: formData.name,
          description: formData.description,
          members: formData.members,
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
        {editData ? '编辑组织' : '新建组织'}
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
          {/* 组织名称 */}
          <TextField
            label="组织名称"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
            placeholder="请输入组织名称"
            fullWidth
            required
            InputLabelProps={{ required: true }}
          />

          {/* 组织描述 */}
          <TextField
            label="组织描述"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            error={!!errors.description}
            helperText={errors.description}
            placeholder="请输入组织描述"
            fullWidth
            required
            multiline
            rows={3}
            InputLabelProps={{ required: true }}
          />

          {/* 组织成员 */}
          <Box>
            <Autocomplete
              multiple
              options={availableUsers}
              value={formData.members}
              onChange={(_, newValue) => handleChange('members', newValue)}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              loading={loadingUsers}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="组织成员"
                  placeholder="选择成员"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loadingUsers ? <CircularProgress size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
              renderOption={(props, option) => (
                <Box component="li" {...props} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Avatar sx={{ width: 32, height: 32, bgcolor: '#0a0a0a', fontSize: '0.875rem' }}>
                    {option.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {option.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#737373' }}>
                      {option.email} · {option.role}
                    </Typography>
                  </Box>
                </Box>
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    {...getTagProps({ index })}
                    key={option.id}
                    avatar={
                      <Avatar sx={{ bgcolor: '#0a0a0a', fontSize: '0.75rem' }}>
                        {option.name.charAt(0)}
                      </Avatar>
                    }
                    label={option.name}
                    sx={{ borderRadius: '6px' }}
                  />
                ))
              }
              sx={{
                '& .MuiOutlinedInput-root': {
                  padding: '8px',
                },
              }}
            />
            <Typography variant="caption" sx={{ color: '#737373', mt: 1, display: 'block' }}>
              已选择 {formData.members.length} 名成员
            </Typography>
          </Box>
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
