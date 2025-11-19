'use client';

import React from 'react';
import { AppBar, Toolbar, Typography, Avatar, Box, IconButton } from '@mui/material';
import { Notifications, Settings } from '@mui/icons-material';
import { CompanyInfo } from './types';
import { layoutColors } from '@/app/theme';

interface CompanyBannerProps {
  companyInfo: CompanyInfo;
}

export default function CompanyBanner({ companyInfo }: CompanyBannerProps) {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: layoutColors.bgbanner,
        color: layoutColors.bannerText,
        borderBottom: `1px solid ${layoutColors.bannerBorder}`,
      }}
    >
      <Toolbar sx={{ minHeight: 64, px: 3 }}>
        {/* Logo and Company Name */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          {companyInfo.logo && (
            <Avatar
              src={companyInfo.logo}
              alt={companyInfo.name}
              sx={{
                mr: 2,
                width: 36,
                height: 36,
                borderRadius: '8px',
              }}
            />
          )}
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 600,
              fontSize: '1.8rem',
              letterSpacing: '-0.01em',
            }}
          >
            {companyInfo.name}
          </Typography>
        </Box>

        {/* Right side actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <IconButton
            sx={{
              color: layoutColors.bannerText,
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <Notifications fontSize="small" />
          </IconButton>
          <IconButton
            sx={{
              color: layoutColors.bannerText,
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <Settings fontSize="small" />
          </IconButton>

          {companyInfo.userInfo && (
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              ml: 2,
              pl: 2,
              borderLeft: `1px solid ${layoutColors.bannerBorder}`,
            }}>
              <Box sx={{ display: { xs: 'none', sm: 'block' }, textAlign: 'right' }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    lineHeight: 1.2,
                  }}
                >
                  {companyInfo.userInfo.name}
                </Typography>
                {companyInfo.userInfo.role && (
                  <Typography
                    variant="caption"
                    sx={{
                      color: layoutColors.bannerText,
                      fontSize: '0.75rem',
                    }}
                  >
                    {companyInfo.userInfo.role}
                  </Typography>
                )}
              </Box>
              <Avatar
                src={companyInfo.userInfo.avatar}
                alt={companyInfo.userInfo.name}
                sx={{
                  width: 32,
                  height: 32,
                  border: `1px solid ${layoutColors.bannerBorder}`,
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: '0 0 0 2px rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                {companyInfo.userInfo.name.charAt(0)}
              </Avatar>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
