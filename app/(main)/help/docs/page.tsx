'use client';

import React from 'react';
import PageContainer from '@/components/common/PageContainer';
import DataCard from '@/components/common/DataCard';
import { Box, Typography, List, ListItem, ListItemButton, ListItemText, Chip } from '@mui/material';
import { Description } from '@mui/icons-material';

const docs = [
  { id: 1, title: '快速开始指南', category: '入门', status: 'new' },
  { id: 2, title: '用户管理手册', category: '管理', status: '' },
  { id: 3, title: '数据产品使用指南', category: '产品', status: '' },
  { id: 4, title: 'API接口文档', category: '开发', status: 'updated' },
  { id: 5, title: '系统配置说明', category: '配置', status: '' },
];

export default function DocsPage() {
  return (
    <PageContainer
      title="使用文档"
      description="查看系统使用文档和操作指南"
      breadcrumbs={[
        { label: '帮助中心', href: '/help' },
        { label: '使用文档' },
      ]}
    >
      <DataCard title="文档列表" noPadding>
        <List>
          {docs.map((doc, index) => (
            <React.Fragment key={doc.id}>
              {index > 0 && <Box sx={{ borderTop: '1px solid #e5e5e5' }} />}
              <ListItem disablePadding>
                <ListItemButton sx={{ px: 3, py: 2 }}>
                  <Box sx={{ mr: 2, color: '#737373' }}>
                    <Description fontSize="small" />
                  </Box>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                          {doc.title}
                        </Typography>
                        {doc.status === 'new' && (
                          <Chip
                            label="新"
                            size="small"
                            sx={{
                              height: '18px',
                              fontSize: '0.625rem',
                              bgcolor: '#dcfce7',
                              color: '#16a34a',
                            }}
                          />
                        )}
                        {doc.status === 'updated' && (
                          <Chip
                            label="更新"
                            size="small"
                            sx={{
                              height: '18px',
                              fontSize: '0.625rem',
                              bgcolor: '#dbeafe',
                              color: '#2563eb',
                            }}
                          />
                        )}
                      </Box>
                    }
                    secondary={doc.category}
                    secondaryTypographyProps={{
                      sx: { fontSize: '0.75rem', color: '#a3a3a3' },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </DataCard>
    </PageContainer>
  );
}
