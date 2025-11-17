'use client';

import React from 'react';
import PageContainer from '@/components/common/PageContainer';
import DataCard from '@/components/common/DataCard';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

const faqs = [
  {
    id: 1,
    question: '如何创建新的数据产品?',
    answer: '进入"链接器 > 数据产品"页面,点击"新建产品"按钮,填写产品信息后提交即可创建新的数据产品。',
  },
  {
    id: 2,
    question: '如何管理用户权限?',
    answer: '在"系统设置 > 角色权限"中配置角色权限,然后在"用户管理"中为用户分配相应的角色。',
  },
  {
    id: 3,
    question: '如何查看系统操作日志?',
    answer: '进入"系统设置 > 操作日志"页面,可以查看所有系统操作记录和审计日志。',
  },
  {
    id: 4,
    question: '如何添加本地数据源?',
    answer: '在"链接器 > 数据资产 > 本地数据源"页面,点击"添加数据源"按钮,配置数据源连接信息即可。',
  },
  {
    id: 5,
    question: '忘记密码怎么办?',
    answer: '请联系系统管理员重置密码,或使用登录页面的"忘记密码"功能通过邮箱重置。',
  },
];

export default function FAQPage() {
  return (
    <PageContainer
      title="常见问题"
      description="查看常见问题解答"
      breadcrumbs={[
        { label: '帮助中心', href: '/help' },
        { label: '常见问题' },
      ]}
    >
      <DataCard>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {faqs.map((faq) => (
            <Accordion
              key={faq.id}
              elevation={0}
              sx={{
                border: '1px solid #e5e5e5',
                borderRadius: '6px !important',
                '&:before': { display: 'none' },
                '&.Mui-expanded': {
                  margin: 0,
                  mb: 1,
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                sx={{
                  '& .MuiAccordionSummary-content': {
                    my: 1.5,
                  },
                }}
              >
                <Typography sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ pt: 0 }}>
                <Typography sx={{ color: '#737373', fontSize: '0.875rem', lineHeight: 1.6 }}>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </DataCard>
    </PageContainer>
  );
}
