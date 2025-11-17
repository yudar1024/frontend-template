'use client';

import React from 'react';
import PageContainer from '@/components/common/PageContainer';
import DataCard from '@/components/common/DataCard';
import {
  Box,
  Typography,
  TextField,
  Switch,
  FormControlLabel,
  Button,
  Divider,
} from '@mui/material';

export default function SettingsPage() {
  return (
    <PageContainer
      title="系统配置"
      description="配置系统参数和偏好设置"
      breadcrumbs={[
        { label: '系统设置', href: '/system' },
        { label: '系统配置' },
      ]}
    >
      <DataCard title="基本设置">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="系统名称"
            defaultValue="可信数据空间"
            fullWidth
            size="small"
          />
          <TextField
            label="系统描述"
            defaultValue="企业级数据管理平台"
            fullWidth
            multiline
            rows={3}
            size="small"
          />
          <Divider />
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
              功能开关
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="启用用户注册"
              />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="启用邮件通知"
              />
              <FormControlLabel
                control={<Switch />}
                label="启用API访问"
              />
            </Box>
          </Box>
          <Divider />
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
              保存设置
            </Button>
          </Box>
        </Box>
      </DataCard>
    </PageContainer>
  );
}
