'use client';

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Checkbox,
  Chip,
  Box,
  Tooltip,
  TablePagination,
} from '@mui/material';
import { Edit, Delete, Visibility } from '@mui/icons-material';
import { DataProduct, productTypeLabels, billingModeLabels, applicationFieldLabels } from '@/types/product';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface ProductTableProps {
  products: DataProduct[];
  selected: string[];
  onSelect: (ids: string[]) => void;
  onEdit: (product: DataProduct) => void;
  onDelete: (id: string) => void;
  onView?: (product: DataProduct) => void;
}

export default function ProductTable({
  products,
  selected,
  onSelect,
  onEdit,
  onDelete,
  onView,
}: ProductTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      onSelect(products.map(p => p.id));
    } else {
      onSelect([]);
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

    onSelect(newSelected);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'yyyy-MM-dd HH:mm', { locale: zhCN });
    } catch {
      return dateString;
    }
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      api: { bg: '#dbeafe', text: '#1e40af' },
      data_model: { bg: '#dcfce7', text: '#166534' },
      report: { bg: '#fef3c7', text: '#92400e' },
      corpus: { bg: '#e0e7ff', text: '#3730a3' },
    };
    return colors[type] || { bg: '#f5f5f5', text: '#737373' };
  };

  const paginatedProducts = products.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < products.length}
                  checked={products.length > 0 && selected.length === products.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>产品名称</TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>产品类型</TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>数据源</TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>应用领域</TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>计费模式</TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>标签</TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>创建时间</TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="right">
                操作
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedProducts.map((product) => {
              const isItemSelected = isSelected(product.id);
              const typeColor = getTypeColor(product.productType);

              return (
                <TableRow
                  key={product.id}
                  hover
                  selected={isItemSelected}
                  sx={{
                    '&.Mui-selected': {
                      bgcolor: 'rgba(0, 0, 0, 0.02)',
                    },
                  }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isItemSelected}
                      onChange={() => handleSelectOne(product.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                      {product.name}
                    </Box>
                    <Box sx={{ fontSize: '0.75rem', color: '#a3a3a3', mt: 0.5 }}>
                      {product.dataTheme}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={productTypeLabels[product.productType]}
                      size="small"
                      sx={{
                        bgcolor: typeColor.bg,
                        color: typeColor.text,
                        fontSize: '0.75rem',
                        height: '24px',
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ fontSize: '0.875rem', color: '#737373' }}>
                      {product.dataSourceName}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ fontSize: '0.875rem', color: '#737373' }}>
                      {applicationFieldLabels[product.applicationField]}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ fontSize: '0.875rem', color: '#737373' }}>
                      {billingModeLabels[product.billingMode]}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {product.tags.slice(0, 2).map((tag, index) => (
                        <Chip
                          key={index}
                          label={tag}
                          size="small"
                          sx={{
                            height: '20px',
                            fontSize: '0.7rem',
                            bgcolor: '#f5f5f5',
                            color: '#525252',
                          }}
                        />
                      ))}
                      {product.tags.length > 2 && (
                        <Chip
                          label={`+${product.tags.length - 2}`}
                          size="small"
                          sx={{
                            height: '20px',
                            fontSize: '0.7rem',
                            bgcolor: '#f5f5f5',
                            color: '#525252',
                          }}
                        />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ fontSize: '0.875rem', color: '#737373' }}>
                      {formatDate(product.createdAt)}
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
                      {onView && (
                        <Tooltip title="查看">
                          <IconButton
                            size="small"
                            onClick={() => onView(product)}
                            sx={{
                              color: '#737373',
                              '&:hover': { color: '#0a0a0a', bgcolor: '#f5f5f5' },
                            }}
                          >
                            <Visibility fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                      <Tooltip title="编辑">
                        <IconButton
                          size="small"
                          onClick={() => onEdit(product)}
                          sx={{
                            color: '#737373',
                            '&:hover': { color: '#0a0a0a', bgcolor: '#f5f5f5' },
                          }}
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="删除">
                        <IconButton
                          size="small"
                          onClick={() => onDelete(product.id)}
                          sx={{
                            color: '#737373',
                            '&:hover': { color: '#dc2626', bgcolor: '#fef2f2' },
                          }}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="每页行数:"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} 共 ${count} 条`}
      />
    </Box>
  );
}
