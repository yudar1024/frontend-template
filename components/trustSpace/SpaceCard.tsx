'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  IconButton,
  Box,
  Tooltip,
  Checkbox,
} from '@mui/material';
import { Edit, Delete, MoreVert } from '@mui/icons-material';
import { TrustSpace } from '@/types/trustSpace';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface SpaceCardProps {
  space: TrustSpace;
  selected: boolean;
  onSelect: (id: string) => void;
  onEdit: (space: TrustSpace) => void;
  onDelete: (id: string) => void;
}

export default function SpaceCard({
  space,
  selected,
  onSelect,
  onEdit,
  onDelete,
}: SpaceCardProps) {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'yyyy-MM-dd', { locale: zhCN });
    } catch {
      return dateString;
    }
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        border: selected ? '2px solid #0a0a0a' : '1px solid #e5e5e5',
        borderRadius: '8px',
        transition: 'all 0.2s ease',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      {/* 选择框 */}
      <Box
        sx={{
          position: 'absolute',
          top: 10,
          right: 8,
          zIndex: 1,
          bgcolor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '4px',
        }}
      >
        <Checkbox
          checked={selected}
          onChange={() => onSelect(space.id)}
          size="small"
          sx={{
            '&.Mui-checked': {
              color: '#0a0a0a',
            },
          }}
        />
      </Box>

      {/* Logo/图片 */}
      <CardMedia
        component="img"
        height="180"
        image={space.logo || 'https://via.placeholder.com/400x180/f5f5f5/737373?text=No+Logo'}
        alt={space.name}
        sx={{
          objectFit: 'cover',
          bgcolor: '#f5f5f5',
        }}
      />

      {/* 内容 */}
      <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 600,
            fontSize: '1.125rem',
            mb: 1,
            color: '#0a0a0a',
            letterSpacing: '-0.01em',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            minHeight: '2.5em',
          }}
        >
          {space.name}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: '#737373',
            fontSize: '0.875rem',
            lineHeight: 1.6,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            minHeight: '4em',
            mb: 2,
          }}
        >
          {space.description}
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              variant="caption"
              sx={{ color: '#a3a3a3', fontSize: '0.75rem' }}
            >
              创建人:
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: '#525252', fontSize: '0.75rem', fontWeight: 500 }}
            >
              {space.createdBy}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              variant="caption"
              sx={{ color: '#a3a3a3', fontSize: '0.75rem' }}
            >
              创建时间:
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: '#525252', fontSize: '0.75rem' }}
            >
              {formatDate(space.createdAt)}
            </Typography>
          </Box>
        </Box>
      </CardContent>

      {/* 操作按钮 */}
      <CardActions
        sx={{
          justifyContent: 'flex-end',
          px: 2,
          pb: 2,
          pt: 0,
        }}
      >
        <Tooltip title="编辑">
          <IconButton
            size="small"
            onClick={() => onEdit(space)}
            sx={{
              color: '#737373',
              '&:hover': {
                color: '#0a0a0a',
                bgcolor: '#f5f5f5',
              },
            }}
          >
            <Edit fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="删除">
          <IconButton
            size="small"
            onClick={() => onDelete(space.id)}
            sx={{
              color: '#737373',
              '&:hover': {
                color: '#dc2626',
                bgcolor: '#fef2f2',
              },
            }}
          >
            <Delete fontSize="small" />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
