'use client';

import React, { useState, useEffect } from 'react';
import PageContainer from '@/components/common/PageContainer';
import EmptyState from '@/components/common/EmptyState';
import SpaceCard from '@/components/trustSpace/SpaceCard';
import SpaceDialog from '@/components/trustSpace/SpaceDialog';
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
import { Add, Delete, Refresh, Dashboard } from '@mui/icons-material';
import { TrustSpace } from '@/types/trustSpace';
import {
  getAllTrustSpaces,
  createTrustSpace,
  updateTrustSpace,
  deleteTrustSpace,
  batchDeleteTrustSpaces,
  initializeTrustSpacesFromLocalStorage,
} from '@/services/trustSpaceService';

export default function TrustSpacePage() {
  const [spaces, setSpaces] = useState<TrustSpace[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editData, setEditData] = useState<TrustSpace | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [batchDeleteDialogOpen, setBatchDeleteDialogOpen] = useState(false);

  // Toast state
  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info' | 'warning',
  });

  // 当前用户
  const currentUser = '吴希言';

  // 初始化数据
  useEffect(() => {
    initializeTrustSpacesFromLocalStorage();
    loadSpaces();
  }, []);

  const loadSpaces = async () => {
    try {
      setLoading(true);
      const data = await getAllTrustSpaces();
      setSpaces(data);
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

  const handleEdit = (space: TrustSpace) => {
    setEditData(space);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditData(null);
  };

  const handleSubmit = async (data: any) => {
    try {
      if (data.id) {
        await updateTrustSpace(data);
        showToast('空间更新成功', 'success');
      } else {
        await createTrustSpace(data);
        showToast('空间创建成功', 'success');
      }
      handleCloseDialog();
      loadSpaces();
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
      setSelected(spaces.map(s => s.id));
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
      await deleteTrustSpace(deleteId);
      showToast('空间删除成功', 'success');
      setDeleteDialogOpen(false);
      setDeleteId(null);
      loadSpaces();
      setSelected(prev => prev.filter(id => id !== deleteId));
    } catch (error) {
      showToast('删除失败', 'error');
    }
  };

  const handleBatchDeleteClick = () => {
    if (selected.length === 0) {
      showToast('请先选择要删除的空间', 'warning');
      return;
    }
    setBatchDeleteDialogOpen(true);
  };

  const handleConfirmBatchDelete = async () => {
    try {
      const count = await batchDeleteTrustSpaces(selected);
      showToast(`成功删除 ${count} 个空间`, 'success');
      setBatchDeleteDialogOpen(false);
      setSelected([]);
      loadSpaces();
    } catch (error) {
      showToast('批量删除失败', 'error');
    }
  };

  const handleRefresh = () => {
    loadSpaces();
    showToast('数据已刷新', 'info');
  };

  return (
    <PageContainer
      title="可信空间"
      description="管理和查看所有可信数据空间"
      breadcrumbs={[
        { label: '首页', href: '/dashboard' },
        { label: '可信空间' },
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
            新建空间
          </Button>
        </Box>
      }
    >
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : spaces.length === 0 ? (
        <Box
          sx={{
            bgcolor: '#ffffff',
            border: '1px solid #e5e5e5',
            borderRadius: '8px',
            p: 3,
          }}
        >
          <EmptyState
            icon={<Dashboard />}
            title="暂无可信空间"
            description="创建您的第一个可信数据空间，开始数据协作和共享"
            action={{
              label: '新建空间',
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
                  indeterminate={selected.length > 0 && selected.length < spaces.length}
                  checked={spaces.length > 0 && selected.length === spaces.length}
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
            {spaces.map((space) => (
              <Grid size={4} xs={12} sm={6} md={4} lg={3} key={space.id}>
                <SpaceCard
                  space={space}
                  selected={selected.includes(space.id)}
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
      <SpaceDialog
        open={dialogOpen}
        editData={editData}
        currentUser={currentUser}
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
            确定要删除这个可信空间吗？此操作无法撤销。
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
            确定要删除选中的 {selected.length} 个可信空间吗？此操作无法撤销。
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
