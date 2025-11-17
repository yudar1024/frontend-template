'use client';

import React from 'react';
import { Card, CardContent, CardHeader, Divider, Box } from '@mui/material';

interface DataCardProps {
  title?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  noPadding?: boolean;
}

export default function DataCard({
  title,
  action,
  children,
  noPadding = false,
}: DataCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        border: '1px solid #e5e5e5',
        borderRadius: '8px',
        bgcolor: '#ffffff',
      }}
    >
      {title && (
        <>
          <CardHeader
            title={title}
            action={action}
            sx={{
              '& .MuiCardHeader-title': {
                fontSize: '1rem',
                fontWeight: 600,
                color: '#0a0a0a',
                letterSpacing: '-0.01em',
              },
            }}
          />
          <Divider sx={{ borderColor: '#e5e5e5' }} />
        </>
      )}
      <CardContent sx={{ p: noPadding ? 0 : 3, '&:last-child': { pb: noPadding ? 0 : 3 } }}>
        {children}
      </CardContent>
    </Card>
  );
}
