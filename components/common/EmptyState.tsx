'use client';

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Inbox } from '@mui/icons-material';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        px: 2,
      }}
    >
      <Box
        sx={{
          color: '#d4d4d4',
          mb: 2,
          '& .MuiSvgIcon-root': {
            fontSize: '4rem',
          },
        }}
      >
        {icon || <Inbox fontSize="inherit" />}
      </Box>
      <Typography
        variant="h6"
        sx={{
          color: '#0a0a0a',
          fontWeight: 600,
          fontSize: '1.125rem',
          mb: 1,
        }}
      >
        {title}
      </Typography>
      {description && (
        <Typography
          variant="body2"
          sx={{
            color: '#737373',
            fontSize: '0.875rem',
            textAlign: 'center',
            maxWidth: '400px',
            mb: action ? 3 : 0,
          }}
        >
          {description}
        </Typography>
      )}
      {action && (
        <Button
          variant="contained"
          onClick={action.onClick}
          sx={{
            bgcolor: '#0a0a0a',
            color: '#ffffff',
            textTransform: 'none',
            fontWeight: 500,
            px: 3,
            '&:hover': {
              bgcolor: '#404040',
            },
          }}
        >
          {action.label}
        </Button>
      )}
    </Box>
  );
}
