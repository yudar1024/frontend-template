'use client';

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  IconButton,
  Chip,
  Box,
  Typography,
  Tooltip,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { Role } from '@/types/role';

interface RoleTableProps {
  roles: Role[];
  selected: string[];
  onSelectOne: (id: string) => void;
  onSelectAll: (checked: boolean) => void;
  onEdit: (role: Role) => void;
  onDelete: (id: string) => void;
}

export default function RoleTable({
  roles,
  selected,
  onSelectOne,
  onSelectAll,
  onEdit,
  onDelete,
}: RoleTableProps) {
  const isSelected = (id: string) => selected.includes(id);
  const isAllSelected = roles.length > 0 && selected.length === roles.length;
  const isIndeterminate = selected.length > 0 && selected.length < roles.length;

  return (
    <TableContainer component={Paper} sx={{ borderRadius: '8px', boxShadow: 'none' }}>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: '#fafafa' }}>
            <TableCell padding="checkbox">
              <Checkbox
                checked={isAllSelected}
                indeterminate={isIndeterminate}
                onChange={(e) => onSelectAll(e.target.checked)}
              />
            </TableCell>
            <TableCell sx={{ fontWeight: 600 }}>角色名称</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>范围</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>动作</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>权限表达式</TableCell>
            <TableCell sx={{ fontWeight: 600, width: 120 }}>操作</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roles.map((role) => {
            const isItemSelected = isSelected(role.id);

            return (
              <TableRow
                key={role.id}
                hover
                selected={isItemSelected}
                sx={{
                  '&.Mui-selected': {
                    bgcolor: 'rgba(0, 0, 0, 0.02)',
                  },
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isItemSelected}
                    onChange={() => onSelectOne(role.id)}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                    {role.name}
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={role.scope}
                    size="small"
                    sx={{
                      height: 20,
                      fontSize: '0.75rem',
                      bgcolor: '#f0f0f0',
                      fontWeight: 500,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {role.actions.map((action, index) => (
                      <Chip
                        key={index}
                        label={action}
                        size="small"
                        sx={{
                          height: 20,
                          fontSize: '0.7rem',
                          bgcolor: '#e6f0ff',
                          color: '#1976d2',
                          fontWeight: 500,
                        }}
                      />
                    ))}
                  </Box>
                </TableCell>
                <TableCell>
                  <Tooltip title={role.permissionExpression}>
                    <Typography
                      variant="body2"
                      sx={{
                        maxWidth: 200,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        color: '#525252',
                      }}
                    >
                      {role.permissionExpression}
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => onEdit(role)}
                      sx={{
                        border: '1px solid #e5e5e5',
                        borderRadius: '6px',
                        '&:hover': {
                          bgcolor: '#f5f5f5',
                          borderColor: '#0a0a0a',
                        },
                      }}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => onDelete(role.id)}
                      sx={{
                        border: '1px solid #e5e5e5',
                        borderRadius: '6px',
                        color: '#dc2626',
                        '&:hover': {
                          bgcolor: '#fef2f2',
                          borderColor: '#dc2626',
                        },
                      }}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}