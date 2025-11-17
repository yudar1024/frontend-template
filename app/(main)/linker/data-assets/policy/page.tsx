'use client';

import React from 'react';
import PageContainer from '@/components/common/PageContainer';
import DataCard from '@/components/common/DataCard';
import EmptyState from '@/components/common/EmptyState';
import { Button } from '@mui/material';
import { Add, People } from '@mui/icons-material';

export default function PolicyPage() {
  return (
    <PageContainer
      title="个人客户"
      description="管理个人客户信息和数据策略"
      breadcrumbs={[
        { label: '链接器', href: '/linker' },
        { label: '数据资产', href: '/linker/data-assets' },
        { label: '个人客户' },
      ]}
      actions={
        <Button
          variant="contained"
          startIcon={<Add />}
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
          添加客户
        </Button>
      }
    >
      <DataCard>
        <EmptyState
          icon={<People />}
          title="暂无个人客户"
          description="添加个人客户信息,管理客户数据和策略"
          action={{
            label: '添加客户',
            onClick: () => console.log('Add customer'),
          }}
        />
      </DataCard>
    </PageContainer>
  );
}
