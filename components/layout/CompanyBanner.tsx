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
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: layoutColors.primaryMenu,
        color: '#ffffff',
        boxShadow: 3,
      }}
    >
      <Toolbar>
        {/* Logo and Company Name */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          {companyInfo.logo && (
            <Avatar 
              src={companyInfo.logo} 
              alt={companyInfo.name}
              sx={{ mr: 2, width: 40, height: 40 }}
            />
          )}
          <Typography variant="h6" component="div" fontWeight="bold">
            {companyInfo.name}
          </Typography>
        </Box>

        {/* Right side actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton color="inherit">
            <Notifications />
          </IconButton>
          <IconButton color="inherit">
            <Settings />
          </IconButton>
          
          {companyInfo.userInfo && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
              <Avatar 
                src={companyInfo.userInfo.avatar}
                alt={companyInfo.userInfo.name}
                sx={{ width: 32, height: 32 }}
              >
                {companyInfo.userInfo.name.charAt(0)}
              </Avatar>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Typography variant="body2" fontWeight="medium">
                  {companyInfo.userInfo.name}
                </Typography>
                {companyInfo.userInfo.role && (
                  <Typography variant="caption" sx={{ opacity: 0.9 }}>
                    {companyInfo.userInfo.role}
                  </Typography>
                )}
              </Box>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
