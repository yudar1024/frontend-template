'use client';

import React from 'react';
import PageContainer from '@/components/common/PageContainer';
import DataCard from '@/components/common/DataCard';
import EmptyState from '@/components/common/EmptyState';
import { Button } from '@mui/material';
import { Add, Security } from '@mui/icons-material';

export default function RolesPage() {
  return (
    <PageContainer
      title="角色权限"
      description="管理系统角色和权限配置"
      breadcrumbs={[
        { label: '系统设置', href: '/system' },
        { label: '角色权限' },
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
          添加角色
        </Button>
      }
    >
      <DataCard>
        <EmptyState
          icon={<Security />}
          title="暂无角色"
          description="创建角色并配置权限,实现精细化访问控制"
          action={{
            label: '添加角色',
            onClick: () => console.log('Add role'),
          }}
        />
      </DataCard>
    </PageContainer>
  );
}
