'use client';

import React from 'react';
import PageContainer from '@/components/common/PageContainer';
import DataCard from '@/components/common/DataCard';
import { Grid, Box, Typography } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';

// 统计卡片组件
function StatCard({
  title,
  value,
  trend,
  trendValue,
}: {
  title: string;
  value: string | number;
  trend: 'up' | 'down';
  trendValue: string;
}) {
  const isUp = trend === 'up';
  return (
    <DataCard>
      <Typography
        variant="body2"
        sx={{ color: '#737373', fontSize: '0.875rem', mb: 1 }}
      >
        {title}
      </Typography>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 600,
          fontSize: '2rem',
          color: '#0a0a0a',
          mb: 1,
          letterSpacing: '-0.02em',
        }}
      >
        {value}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        {isUp ? (
          <TrendingUp sx={{ fontSize: '1rem', color: '#16a34a' }} />
        ) : (
          <TrendingDown sx={{ fontSize: '1rem', color: '#dc2626' }} />
        )}
        <Typography
          variant="caption"
          sx={{
            color: isUp ? '#16a34a' : '#dc2626',
            fontSize: '0.75rem',
            fontWeight: 500,
          }}
        >
          {trendValue}
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: '#a3a3a3', fontSize: '0.75rem' }}
        >
          vs 上月
        </Typography>
      </Box>
    </DataCard>
  );
}

export default function DashboardOverviewPage() {
  return (
    <PageContainer
      title="首页概览"
      description="查看系统整体运行状态和关键指标"
      breadcrumbs={[
        { label: '首页', href: '/dashboard' },
        { label: '首页概览' },
      ]}
    >
      <Grid container spacing={3}>
        {/* 统计卡片 */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="总用户数" value="12,345" trend="up" trendValue="+12.5%" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="活跃用户" value="8,432" trend="up" trendValue="+8.2%" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="总订单数" value="3,456" trend="up" trendValue="+15.3%" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="系统负载" value="45%" trend="down" trendValue="-5.2%" />
        </Grid>

        {/* 最近活动 */}
        <Grid item xs={12} md={8}>
          <DataCard title="最近活动">
            <Box sx={{ py: 2 }}>
              <Typography variant="body2" sx={{ color: '#737373' }}>
                暂无最近活动数据
              </Typography>
            </Box>
          </DataCard>
        </Grid>

        {/* 快速操作 */}
        <Grid item xs={12} md={4}>
          <DataCard title="快速操作">
            <Box sx={{ py: 2 }}>
              <Typography variant="body2" sx={{ color: '#737373' }}>
                快速操作功能开发中...
              </Typography>
            </Box>
          </DataCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
