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
import { Edit, Delete, Storage, Description } from '@mui/icons-material';
import { DataSource } from '@/types/dataSource';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface DataSourceTableProps {
  dataSources: DataSource[];
  selected: string[];
  onSelect: (ids: string[]) => void;
  onEdit: (dataSource: DataSource) => void;
  onDelete: (id: string) => void;
}

export default function DataSourceTable({
  dataSources,
  selected,
  onSelect,
  onEdit,
  onDelete,
}: DataSourceTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      onSelect(dataSources.map(ds => ds.id));
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

  const getTypeIcon = (type: string) => {
    return type === 'database' ? (
      <Storage sx={{ fontSize: '1rem', mr: 0.5 }} />
    ) : (
      <Description sx={{ fontSize: '1rem', mr: 0.5 }} />
    );
  };

  const getTypeLabel = (type: string) => {
    return type === 'database' ? '数据库' : '文件';
  };

  const paginatedDataSources = dataSources.slice(
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
                  indeterminate={selected.length > 0 && selected.length < dataSources.length}
                  checked={dataSources.length > 0 && selected.length === dataSources.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>数据源名称</TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>类型</TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>连接信息</TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>创建时间</TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>创建人</TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="right">
                操作
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedDataSources.map((dataSource) => {
              const isItemSelected = isSelected(dataSource.id);

              return (
                <TableRow
                  key={dataSource.id}
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
                      onChange={() => handleSelectOne(dataSource.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                      {dataSource.name}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      icon={getTypeIcon(dataSource.type)}
                      label={getTypeLabel(dataSource.type)}
                      size="small"
                      sx={{
                        bgcolor: dataSource.type === 'database' ? '#dbeafe' : '#fef3c7',
                        color: dataSource.type === 'database' ? '#1e40af' : '#92400e',
                        fontSize: '0.75rem',
                        height: '24px',
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ fontSize: '0.875rem', color: '#737373' }}>
                      {dataSource.type === 'database'
                        ? dataSource.databaseUrl
                        : dataSource.filePath}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ fontSize: '0.875rem', color: '#737373' }}>
                      {formatDate(dataSource.createdAt)}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ fontSize: '0.875rem', color: '#737373' }}>
                      {dataSource.createdBy}
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
                      <Tooltip title="编辑">
                        <IconButton
                          size="small"
                          onClick={() => onEdit(dataSource)}
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
                          onClick={() => onDelete(dataSource.id)}
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
        count={dataSources.length}
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
