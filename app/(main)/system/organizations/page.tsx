'use client';

import React, { useState, useEffect } from 'react';
import PageContainer from '@/components/common/PageContainer';
import EmptyState from '@/components/common/EmptyState';
import OrganizationCard from '@/components/organization/OrganizationCard';
import OrganizationDialog from '@/components/organization/OrganizationDialog';
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
  Grid,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { Add, Delete, Refresh, BusinessCenter } from '@mui/icons-material';
import { Organization } from '@/types/organization';
import {
  getAllOrganizations,
  createOrganization,
  updateOrganization,
  deleteOrganization,
  batchDeleteOrganizations,
  initializeOrganizationsFromLocalStorage,
} from '@/services/organizationService';

export default function OrganizationsPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editData, setEditData] = useState<Organization | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [batchDeleteDialogOpen, setBatchDeleteDialogOpen] = useState(false);

  // Toast state
  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info' | 'warning',
  });

  // 初始化数据
  useEffect(() => {
    initializeOrganizationsFromLocalStorage();
    loadOrganizations();
  }, []);

  const loadOrganizations = async () => {
    try {
      setLoading(true);
      const data = await getAllOrganizations();
      setOrganizations(data);
    } catch (error) {
      showToast('加载数据失败', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message: string, severity: 'success' | 'error' | 'info' | 'warning' = 'success') => {
    setToast({ open: true, message, severity });
  };

  const handleCloseToast = () => {
    setToast(prev => ({ ...prev, open: false }));
  };

  const handleCreate = () => {
    setEditData(null);
    setDialogOpen(true);
  };

  const handleEdit = (organization: Organization) => {
    setEditData(organization);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditData(null);
  };

  const handleSubmit = async (data: any) => {
    try {
      if (data.id) {
        await updateOrganization(data);
        showToast('组织更新成功', 'success');
      } else {
        await createOrganization(data);
        showToast('组织创建成功', 'success');
      }
      handleCloseDialog();
      loadOrganizations();
    } catch (error) {
      showToast('操作失败', 'error');
    }
  };

  const handleSelectOne = (id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, id];
    } else {
      newSelected = selected.filter(item => item !== id);
    }

    setSelected(newSelected);
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(organizations.map(o => o.id));
    } else {
      setSelected([]);
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteOrganization(deleteId);
      showToast('组织删除成功', 'success');
      setDeleteDialogOpen(false);
      setDeleteId(null);
      loadOrganizations();
      setSelected(prev => prev.filter(id => id !== deleteId));
    } catch (error) {
      showToast('删除失败', 'error');
    }
  };

  const handleBatchDeleteClick = () => {
    if (selected.length === 0) {
      showToast('请先选择要删除的组织', 'warning');
      return;
    }
    setBatchDeleteDialogOpen(true);
  };

  const handleConfirmBatchDelete = async () => {
    try {
      const count = await batchDeleteOrganizations(selected);
      showToast(`成功删除 ${count} 个组织`, 'success');
      setBatchDeleteDialogOpen(false);
      setSelected([]);
      loadOrganizations();
    } catch (error) {
      showToast('批量删除失败', 'error');
    }
  };

  const handleRefresh = () => {
    loadOrganizations();
    showToast('数据已刷新', 'info');
  };

  return (
    <PageContainer
      title="组织管理"
      description="管理系统组织架构和成员信息"
      breadcrumbs={[
        { label: '系统设置', href: '/system' },
        { label: '组织管理' },
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
            新建组织
          </Button>
        </Box>
      }
    >
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : organizations.length === 0 ? (
        <Box
          sx={{
            bgcolor: '#ffffff',
            border: '1px solid #e5e5e5',
            borderRadius: '8px',
            p: 3,
          }}
        >
          <EmptyState
            icon={<BusinessCenter />}
            title="暂无组织"
            description="创建您的第一个组织，开始管理团队成员"
            action={{
              label: '新建组织',
              onClick: handleCreate,
            }}
          />
        </Box>
      ) : (
        <>
          {/* 全选控制 */}
          <Box sx={{ mb: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < organizations.length}
                  checked={organizations.length > 0 && selected.length === organizations.length}
                  onChange={handleSelectAll}
                />
              }
              label={
                <Box component="span" sx={{ fontSize: '0.875rem', color: '#525252' }}>
                  全选 {selected.length > 0 && `(已选 ${selected.length} 项)`}
                </Box>
              }
            />
          </Box>

          {/* 卡片网格 */}
          <Grid container spacing={3}>
            {organizations.map((organization) => (
              <Grid size={4} xs={12} sm={6} md={4} lg={3} key={organization.id}>
                <OrganizationCard
                  organization={organization}
                  selected={selected.includes(organization.id)}
                  onSelect={handleSelectOne}
                  onEdit={handleEdit}
                  onDelete={handleDeleteClick}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {/* 创建/编辑对话框 */}
      <OrganizationDialog
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
            确定要删除这个组织吗？此操作无法撤销。
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
            确定要删除选中的 {selected.length} 个组织吗？此操作无法撤销。
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
