'use client';

import React from 'react';
import PageContainer from '@/components/common/PageContainer';
import DataCard from '@/components/common/DataCard';
import EmptyState from '@/components/common/EmptyState';
import { Button } from '@mui/material';
import { Add, AccountBalance } from '@mui/icons-material';

export default function DataProcessingPage() {
  return (
    <PageContainer
      title="数据加工"
      description="管理数据处理任务和工作流"
      breadcrumbs={[
        { label: '数据平台', href: '/data-processing' },
        { label: '数据加工' },
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
          新建任务
        </Button>
      }
    >
      <DataCard>
        <EmptyState
          icon={<AccountBalance />}
          title="暂无数据加工任务"
          description="创建数据处理任务,开始数据加工流程"
          action={{
            label: '新建任务',
            onClick: () => console.log('Create task'),
          }}
        />
      </DataCard>
    </PageContainer>
  );
}
