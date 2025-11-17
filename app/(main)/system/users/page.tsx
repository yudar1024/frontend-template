'use client';

import React from 'react';
import PageContainer from '@/components/common/PageContainer';
import DataCard from '@/components/common/DataCard';
import EmptyState from '@/components/common/EmptyState';
import { Button } from '@mui/material';
import { Add, People } from '@mui/icons-material';

export default function UsersPage() {
  return (
    <PageContainer
      title="用户管理"
      description="管理系统用户账号和权限"
      breadcrumbs={[
        { label: '系统设置', href: '/system' },
        { label: '用户管理' },
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
          添加用户
        </Button>
      }
    >
      <DataCard>
        <EmptyState
          icon={<People />}
          title="暂无用户"
          description="添加系统用户,管理用户权限和角色"
          action={{
            label: '添加用户',
            onClick: () => console.log('Add user'),
          }}
        />
      </DataCard>
    </PageContainer>
  );
}
