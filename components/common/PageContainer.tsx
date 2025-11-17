'use client';

import React from 'react';
import { Box, Container, Typography, Breadcrumbs, Link, Paper } from '@mui/material';
import { NavigateNext } from '@mui/icons-material';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageContainerProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
}

export default function PageContainer({
  title,
  description,
  breadcrumbs,
  actions,
  children,
  maxWidth = 'xl',
}: PageContainerProps) {
  return (
    <Box
      sx={{
        bgcolor: '#fafafa',
        minHeight: '100vh',
        pt: 3,
        pb: 6,
      }}
    >
      <Container maxWidth={maxWidth}>
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumbs
            separator={<NavigateNext fontSize="small" />}
            sx={{
              mb: 2,
              '& .MuiBreadcrumbs-separator': {
                color: '#a3a3a3',
              },
            }}
          >
            {breadcrumbs.map((item, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return isLast ? (
                <Typography
                  key={item.label}
                  sx={{
                    color: '#0a0a0a',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                  }}
                >
                  {item.label}
                </Typography>
              ) : (
                <Link
                  key={item.label}
                  href={item.href || '#'}
                  underline="hover"
                  sx={{
                    color: '#737373',
                    fontSize: '0.875rem',
                    '&:hover': {
                      color: '#0a0a0a',
                    },
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </Breadcrumbs>
        )}

        {/* Page Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mb: 3,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 600,
                fontSize: '1.875rem',
                letterSpacing: '-0.02em',
                color: '#0a0a0a',
                mb: description ? 1 : 0,
              }}
            >
              {title}
            </Typography>
            {description && (
              <Typography
                variant="body1"
                sx={{
                  color: '#737373',
                  fontSize: '0.875rem',
                  maxWidth: '600px',
                }}
              >
                {description}
              </Typography>
            )}
          </Box>
          {actions && <Box>{actions}</Box>}
        </Box>

        {/* Page Content */}
        {children}
      </Container>
    </Box>
  );
}
