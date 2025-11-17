'use client';

import React from 'react';
import PageContainer from '@/components/common/PageContainer';
import DataCard from '@/components/common/DataCard';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Chip,
} from '@mui/material';
import { Email, Phone, LocationOn } from '@mui/icons-material';

export default function SupportPage() {
  return (
    <PageContainer
      title="技术支持"
      description="联系我们获取技术支持和帮助"
      breadcrumbs={[
        { label: '帮助中心', href: '/help' },
        { label: '技术支持' },
      ]}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <DataCard title="提交支持请求">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                label="主题"
                placeholder="请简要描述您的问题"
                fullWidth
                size="small"
              />
              <TextField
                label="问题类型"
                select
                SelectProps={{ native: true }}
                fullWidth
                size="small"
                defaultValue=""
              >
                <option value="">请选择问题类型</option>
                <option value="technical">技术问题</option>
                <option value="account">账号问题</option>
                <option value="feature">功能咨询</option>
                <option value="other">其他</option>
              </TextField>
              <TextField
                label="问题描述"
                placeholder="请详细描述您遇到的问题"
                fullWidth
                multiline
                rows={6}
                size="small"
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button
                  variant="outlined"
                  sx={{
                    textTransform: 'none',
                    color: '#737373',
                    borderColor: '#e5e5e5',
                  }}
                >
                  取消
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: '#0a0a0a',
                    color: '#ffffff',
                    textTransform: 'none',
                    '&:hover': {
                      bgcolor: '#404040',
                    },
                  }}
                >
                  提交
                </Button>
              </Box>
            </Box>
          </DataCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <DataCard title="联系方式">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Email sx={{ color: '#737373', fontSize: '1.25rem' }} />
                <Box>
                  <Typography sx={{ fontSize: '0.75rem', color: '#a3a3a3', mb: 0.5 }}>
                    邮箱
                  </Typography>
                  <Typography sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
                    support@example.com
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Phone sx={{ color: '#737373', fontSize: '1.25rem' }} />
                <Box>
                  <Typography sx={{ fontSize: '0.75rem', color: '#a3a3a3', mb: 0.5 }}>
                    电话
                  </Typography>
                  <Typography sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
                    400-123-4567
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <LocationOn sx={{ color: '#737373', fontSize: '1.25rem' }} />
                <Box>
                  <Typography sx={{ fontSize: '0.75rem', color: '#a3a3a3', mb: 0.5 }}>
                    地址
                  </Typography>
                  <Typography sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
                    北京市朝阳区xxx路xxx号
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontSize: '0.75rem', color: '#a3a3a3', mb: 1 }}>
                  工作时间
                </Typography>
                <Chip
                  label="周一至周五 9:00-18:00"
                  size="small"
                  sx={{
                    bgcolor: '#f5f5f5',
                    color: '#525252',
                    fontSize: '0.75rem',
                  }}
                />
              </Box>
            </Box>
          </DataCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
