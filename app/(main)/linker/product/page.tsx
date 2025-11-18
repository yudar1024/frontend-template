'use client';

import React, { useState, useEffect } from 'react';
import PageContainer from '@/components/common/PageContainer';
import DataCard from '@/components/common/DataCard';
import EmptyState from '@/components/common/EmptyState';
import ProductTable from '@/components/product/ProductTable';
import ProductDialog from '@/components/product/ProductDialog';
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
} from '@mui/material';
import { Add, Delete, Refresh, Inventory } from '@mui/icons-material';
import { DataProduct } from '@/types/product';
import { DataSource } from '@/types/dataSource';
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  batchDeleteProducts,
  initializeProductsFromLocalStorage,
} from '@/services/productService';
import { getAllDataSources, initializeFromLocalStorage } from '@/services/dataSourceService';

export default function ProductPage() {
  const [products, setProducts] = useState<DataProduct[]>([]);
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editData, setEditData] = useState<DataProduct | null>(null);
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
    initializeFromLocalStorage();
    initializeProductsFromLocalStorage();
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [productsData, dataSourcesData] = await Promise.all([
        getAllProducts(),
        getAllDataSources(),
      ]);
      setProducts(productsData);
      setDataSources(dataSourcesData);
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
    if (dataSources.length === 0) {
      showToast('请先创建数据源', 'warning');
      return;
    }
    setEditData(null);
    setDialogOpen(true);
  };

  const handleEdit = (product: DataProduct) => {
    setEditData(product);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditData(null);
  };

  const handleSubmit = async (data: any) => {
    try {
      if (data.id) {
        await updateProduct(data);
        showToast('产品更新成功', 'success');
      } else {
        await createProduct(data);
        showToast('产品创建成功', 'success');
      }
      handleCloseDialog();
      loadData();
    } catch (error) {
      showToast('操作失败', 'error');
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteProduct(deleteId);
      showToast('产品删除成功', 'success');
      setDeleteDialogOpen(false);
      setDeleteId(null);
      loadData();
      setSelected(prev => prev.filter(id => id !== deleteId));
    } catch (error) {
      showToast('删除失败', 'error');
    }
  };

  const handleBatchDeleteClick = () => {
    if (selected.length === 0) {
      showToast('请先选择要删除的产品', 'warning');
      return;
    }
    setBatchDeleteDialogOpen(true);
  };

  const handleConfirmBatchDelete = async () => {
    try {
      const count = await batchDeleteProducts(selected);
      showToast(`成功删除 ${count} 个产品`, 'success');
      setBatchDeleteDialogOpen(false);
      setSelected([]);
      loadData();
    } catch (error) {
      showToast('批量删除失败', 'error');
    }
  };

  const handleRefresh = () => {
    loadData();
    showToast('数据已刷新', 'info');
  };

  return (
    <PageContainer
      title="数据产品"
      description="管理和查看所有数据产品"
      breadcrumbs={[
        { label: '链接器', href: '/linker' },
        { label: '数据产品' },
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
            新建产品
          </Button>
        </Box>
      }
    >
      <DataCard noPadding>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : products.length === 0 ? (
          <Box sx={{ p: 3 }}>
            <EmptyState
              icon={<Inventory />}
              title="暂无数据产品"
              description="创建您的第一个数据产品,开始管理和分享数据资源"
              action={{
                label: '新建产品',
                onClick: handleCreate,
              }}
            />
          </Box>
        ) : (
          <ProductTable
            products={products}
            selected={selected}
            onSelect={setSelected}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
        )}
      </DataCard>

      {/* 创建/编辑对话框 */}
      <ProductDialog
        open={dialogOpen}
        editData={editData}
        dataSources={dataSources}
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
            确定要删除这个产品吗？此操作无法撤销。
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
            确定要删除选中的 {selected.length} 个产品吗？此操作无法撤销。
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
