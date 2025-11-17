'use client';

import React from 'react';
import PageContainer from '@/components/common/PageContainer';
import DataCard from '@/components/common/DataCard';
import EmptyState from '@/components/common/EmptyState';
import { Button } from '@mui/material';
import { Add, ShoppingCart } from '@mui/icons-material';

export default function AllOrdersPage() {
  return (
    <PageContainer
      title="全部订单"
      description="查看和管理所有订单信息"
      breadcrumbs={[
        { label: '订单管理', href: '/orders' },
        { label: '全部订单' },
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
          新建订单
        </Button>
      }
    >
      <DataCard>
        <EmptyState
          icon={<ShoppingCart />}
          title="暂无订单"
          description="创建您的第一个订单,开始管理订单流程"
          action={{
            label: '新建订单',
            onClick: () => console.log('Create order'),
          }}
        />
      </DataCard>
    </PageContainer>
  );
}
