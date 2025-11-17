'use client';

import React from 'react';
import PageContainer from '@/components/common/PageContainer';
import DataCard from '@/components/common/DataCard';
import EmptyState from '@/components/common/EmptyState';
import { Button } from '@mui/material';
import { Add, Inventory } from '@mui/icons-material';

export default function ProductPage() {
  return (
    <PageContainer
      title="数据产品"
      description="管理和查看所有数据产品"
      breadcrumbs={[
        { label: '链接器', href: '/linker' },
        { label: '数据产品' },
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
          新建产品
        </Button>
      }
    >
      <DataCard>
        <EmptyState
          icon={<Inventory />}
          title="暂无数据产品"
          description="创建您的第一个数据产品,开始管理和分享数据资源"
          action={{
            label: '新建产品',
            onClick: () => console.log('Create product'),
          }}
        />
      </DataCard>
    </PageContainer>
  );
}
