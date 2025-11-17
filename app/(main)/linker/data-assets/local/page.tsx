'use client';

import React from 'react';
import PageContainer from '@/components/common/PageContainer';
import DataCard from '@/components/common/DataCard';
import EmptyState from '@/components/common/EmptyState';
import { Button } from '@mui/material';
import { Add, Storage } from '@mui/icons-material';

export default function LocalDataSourcePage() {
  return (
    <PageContainer
      title="本地数据源"
      description="管理本地数据资产和数据源连接"
      breadcrumbs={[
        { label: '链接器', href: '/linker' },
        { label: '数据资产', href: '/linker/data-assets' },
        { label: '本地数据源' },
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
          添加数据源
        </Button>
      }
    >
      <DataCard>
        <EmptyState
          icon={<Storage />}
          title="暂无本地数据源"
          description="添加您的第一个本地数据源,开始管理数据资产"
          action={{
            label: '添加数据源',
            onClick: () => console.log('Add data source'),
          }}
        />
      </DataCard>
    </PageContainer>
  );
}
