'use client';

import React from 'react';
import PageContainer from '@/components/common/PageContainer';
import DataCard from '@/components/common/DataCard';
import EmptyState from '@/components/common/EmptyState';
import { Description } from '@mui/icons-material';

export default function LogsPage() {
  return (
    <PageContainer
      title="操作日志"
      description="查看系统操作记录和审计日志"
      breadcrumbs={[
        { label: '系统设置', href: '/system' },
        { label: '操作日志' },
      ]}
    >
      <DataCard>
        <EmptyState
          icon={<Description />}
          title="暂无操作日志"
          description="系统操作日志将在这里显示"
        />
      </DataCard>
    </PageContainer>
  );
}
