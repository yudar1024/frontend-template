'use client';

import React, { useState, useEffect } from 'react';
import PageContainer from '@/components/common/PageContainer';
import DataCard from '@/components/common/DataCard';
import {
  Button,
  Box,
  IconButton,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { Add, Delete, Refresh } from '@mui/icons-material';
import { Role } from '@/types/role';
import {
  getAllRoles,
  createRole,
  updateRole,
  deleteRole,
  batchDeleteRoles,
  initializeRolesFromLocalStorage,
} from '@/services/roleService';
import RoleTable from '@/components/role/RoleTable';
import RoleDialog from '@/components/role/RoleDialog';

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editData, setEditData] = useState<Role | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [batchDeleteDialogOpen, setBatchDeleteDialogOpen] = useState(false);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' | 'warning' | 'info' });

  useEffect(() => {
    initializeRolesFromLocalStorage();
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await getAllRoles();
      setRoles(data);
    } catch (error) {
      console.error('Failed to load roles:', error);
      showToast('加载角色数据失败', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message: string, severity: 'success' | 'error' | 'warning' | 'info') => {
    setToast({ open: true, message, severity });
  };

  const handleCloseToast = () => {
    setToast(prev => ({ ...prev, open: false }));
  };

  const handleCreate = () => {
    setEditData(null);
    setDialogOpen(true);
  };

  const handleEdit = (role: Role) => {
    setEditData(role);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditData(null);
  };

  const handleSubmit = async (data: any) => {
    try {
      if (editData) {
        // 更新角色
        const updated = await updateRole(data);
        if (updated) {
          showToast('角色更新成功', 'success');
          loadData();
        } else {
          showToast('角色更新失败', 'error');
        }
      } else {
        // 创建角色
        const created = await createRole(data);
        if (created) {
          showToast('角色创建成功', 'success');
          loadData();
        } else {
          showToast('角色创建失败', 'error');
        }
      }
      handleCloseDialog();
    } catch (error) {
      console.error('Failed to save role:', error);
      showToast(editData ? '角色更新失败' : '角色创建失败', 'error');
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    
    try {
      const success = await deleteRole(deleteId);
      if (success) {
        showToast('角色删除成功', 'success');
        setDeleteDialogOpen(false);
        setDeleteId(null);
        loadData();
        setSelected(prev => prev.filter(id => id !== deleteId));
      } else {
        showToast('角色删除失败', 'error');
      }
    } catch (error) {
      console.error('Failed to delete role:', error);
      showToast('角色删除失败', 'error');
    }
  };

  const handleBatchDeleteClick = () => {
    if (selected.length === 0) {
      showToast('请先选择要删除的角色', 'warning');
      return;
    }
    setBatchDeleteDialogOpen(true);
  };

  const handleConfirmBatchDelete = async () => {
    try {
      const count = await batchDeleteRoles(selected);
      showToast(`成功删除 ${count} 个角色`, 'success');
      setBatchDeleteDialogOpen(false);
      setSelected([]);
      loadData();
    } catch (error) {
      console.error('Failed to batch delete roles:', error);
      showToast('批量删除失败', 'error');
    }
  };

  const handleRefresh = () => {
    loadData();
    showToast('数据已刷新', 'info');
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelected(roles.map(role => role.id));
    } else {
      setSelected([]);
    }
  };

  const handleSelectOne = (id: string) => {
    setSelected(prev => 
      prev.includes(id) 
        ? prev.filter(selectedId => selectedId !== id) 
        : [...prev, id]
    );
  };

  return (
    <PageContainer
      title="角色权限"
      description="管理系统角色和权限配置"
      breadcrumbs={[
        { label: '系统设置', href: '/system' },
        { label: '角色权限' },
      ]}
      actions={
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            onClick={handleRefresh}
            sx={{
              border: '1px solid #e5e5e5',
              borderRadius: '6px',
              '&:hover': { bgcolor: '#f5f5f5' },
            }}
          >
            <Refresh />
          </IconButton>
          {selected.length > 0 && (
            <Button
              variant="outlined"
              startIcon={<Delete />}
              onClick={handleBatchDeleteClick}
              sx={{
                textTransform: 'none',
                borderColor: '#e5e5e5',
                color: '#dc2626',
                '&:hover': {
                  borderColor: '#dc2626',
                  bgcolor: '#fef2f2',
                },
              }}
            >
              删除 ({selected.length})
            </Button>
          )}
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleCreate}
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
            添加角色
          </Button>
        </Box>
      }
    >
      <DataCard noPadding>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : roles.length === 0 ? (
          <Box sx={{ py: 8, textAlign: 'center' }}>
            <Box
              component="img"
              src="/img/empty-state.png"
              alt="暂无数据"
              sx={{ width: 120, height: 120, mb: 2 }}
            />
            <Box component="h3" sx={{ fontSize: '1.25rem', fontWeight: 500, mb: 1 }}>
              暂无角色
            </Box>
            <Box sx={{ color: '#737373', mb: 3 }}>
              创建角色并配置权限,实现精细化访问控制
            </Box>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleCreate}
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
              添加角色
            </Button>
          </Box>
        ) : (
          <>
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selected.length > 0 && selected.length === roles.length}
                    indeterminate={selected.length > 0 && selected.length < roles.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                }
                label={
                  <Box component="span" sx={{ fontSize: '0.875rem', color: '#525252' }}>
                    全选 {selected.length > 0 && `(已选 ${selected.length} 项)`}
                  </Box>
                }
              />
            </Box>
            <RoleTable
              roles={roles}
              selected={selected}
              onSelectOne={handleSelectOne}
              onSelectAll={handleSelectAll}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
            />
          </>
        )}
      </DataCard>

      {/* 创建/编辑对话框 */}
      <RoleDialog
        open={dialogOpen}
        editData={editData}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
      />

      {/* 单个删除确认对话框 */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{ sx: { borderRadius: '8px' } }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>确认删除</DialogTitle>
        <DialogContent>
          <DialogContentText>
            确定要删除这个角色吗？此操作无法撤销。
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setDeleteDialogOpen(false)} sx={{ textTransform: 'none' }}>
            取消
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            sx={{
              bgcolor: '#dc2626',
              textTransform: 'none',
              '&:hover': { bgcolor: '#b91c1c' },
            }}
          >
            删除
          </Button>
        </DialogActions>
      </Dialog>

      {/* 批量删除确认对话框 */}
      <Dialog
        open={batchDeleteDialogOpen}
        onClose={() => setBatchDeleteDialogOpen(false)}
        PaperProps={{ sx: { borderRadius: '8px' } }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>确认批量删除</DialogTitle>
        <DialogContent>
          <DialogContentText>
            确定要删除选中的 {selected.length} 个角色吗？此操作无法撤销。
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setBatchDeleteDialogOpen(false)} sx={{ textTransform: 'none' }}>
            取消
          </Button>
          <Button
            onClick={handleConfirmBatchDelete}
            variant="contained"
            sx={{
              bgcolor: '#dc2626',
              textTransform: 'none',
              '&:hover': { bgcolor: '#b91c1c' },
            }}
          >
            删除
          </Button>
        </DialogActions>
      </Dialog>

      {/* Toast 提示 */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseToast}
          severity={toast.severity}
          sx={{ width: '100%', borderRadius: '8px' }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
}