'use client';

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Checkbox,
  Chip,
  Avatar,
  AvatarGroup,
  Tooltip,
} from '@mui/material';
import { Edit, Delete, BusinessCenter } from '@mui/icons-material';
import { Organization } from '@/types/organization';

interface OrganizationCardProps {
  organization: Organization;
  selected: boolean;
  onSelect: (id: string) => void;
  onEdit: (organization: Organization) => void;
  onDelete: (id: string) => void;
}

export default function OrganizationCard({
  organization,
  selected,
  onSelect,
  onEdit,
  onDelete,
}: OrganizationCardProps) {
  return (
    <Card
      sx={{
        position: 'relative',
        border: selected ? '2px solid #0a0a0a' : '1px solid #e5e5e5',
        borderRadius: '8px',
        transition: 'all 0.2s',
        height: '100%',
        '&:hover': {
          borderColor: '#0a0a0a',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        },
      }}
    >
      {/* 选择框 */}
      <Checkbox
        checked={selected}
        onChange={() => onSelect(organization.id)}
        sx={{
          position: 'absolute',
          top: 8,
          left: 8,
          zIndex: 1,
        }}
      />

      <CardContent sx={{ pt: 5, pb: 2 }}>
        {/* 组织图标 */}
        <Box
          sx={{
            width: 48,
            height: 48,
            bgcolor: '#f5f5f5',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2,
          }}
        >
          <BusinessCenter sx={{ fontSize: 28, color: '#0a0a0a' }} />
        </Box>

        {/* 组织名称 */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            fontSize: '1.125rem',
            mb: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {organization.name}
        </Typography>

        {/* 组织描述 */}
        <Typography
          variant="body2"
          sx={{
            color: '#737373',
            mb: 2,
            minHeight: 40,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {organization.description || '暂无描述'}
        </Typography>

        {/* 成员信息 */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="caption" sx={{ color: '#737373', fontWeight: 500 }}>
              组织成员
            </Typography>
            <Chip
              label={`${organization.members.length} 人`}
              size="small"
              sx={{
                height: 20,
                fontSize: '0.75rem',
                bgcolor: '#f5f5f5',
                fontWeight: 500,
              }}
            />
          </Box>

          {organization.members.length > 0 ? (
            <AvatarGroup
              max={4}
              sx={{
                justifyContent: 'flex-start',
                '& .MuiAvatar-root': {
                  width: 28,
                  height: 28,
                  fontSize: '0.75rem',
                  border: '2px solid #fff',
                },
              }}
            >
              {organization.members.map((member) => (
                <Tooltip key={member.id} title={`${member.name} (${member.role})`}>
                  <Avatar sx={{ bgcolor: '#0a0a0a' }}>
                    {member.name.charAt(0)}
                  </Avatar>
                </Tooltip>
              ))}
            </AvatarGroup>
          ) : (
            <Typography variant="caption" sx={{ color: '#a3a3a3' }}>
              暂无成员
            </Typography>
          )}
        </Box>

        {/* 创建时间 */}
        <Typography variant="caption" sx={{ color: '#a3a3a3', display: 'block', mb: 2 }}>
          创建于 {new Date(organization.createdAt).toLocaleDateString('zh-CN')}
        </Typography>

        {/* 操作按钮 */}
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            pt: 2,
            borderTop: '1px solid #f5f5f5',
          }}
        >
          <IconButton
            size="small"
            onClick={() => onEdit(organization)}
            sx={{
              flex: 1,
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
            onClick={() => onDelete(organization.id)}
            sx={{
              flex: 1,
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
      </CardContent>
    </Card>
  );
}
