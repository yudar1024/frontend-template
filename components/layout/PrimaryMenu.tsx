'use client';

import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { MenuItem } from './types';
import { layoutColors } from '@/app/theme';

interface PrimaryMenuProps {
  items: MenuItem[];
  activeMenu: string;
  onMenuChange: (menuId: string) => void;
  sidebarOpen?: boolean;
  hasSecondaryMenu?: boolean;
}

export default function PrimaryMenu({
  items,
  activeMenu,
  onMenuChange,
  sidebarOpen = true,
  hasSecondaryMenu = false,
}: PrimaryMenuProps) {
  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    onMenuChange(newValue);
  };

  // 根据侧边栏状态计算左侧偏移量
  const DRAWER_WIDTH = 260;
  const DRAWER_WIDTH_COLLAPSED = 64;
  const leftOffset = hasSecondaryMenu
    ? (sidebarOpen ? DRAWER_WIDTH : DRAWER_WIDTH_COLLAPSED)
    : 0;

  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: 'rgba(255, 255, 255, 0.12)',
        bgcolor: layoutColors.primaryMenu,
        position: 'sticky',
        top: 64, // AppBar height
        zIndex: (theme) => theme.zIndex.drawer,
        display: 'flex',
        justifyContent: 'flex-end',
        paddingLeft: `${leftOffset}px`,
        transition: (theme) =>
          theme.transitions.create('padding-left', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        boxShadow: 2,
      }}
    >
      <Tabs
        value={activeMenu}
        onChange={handleChange}
        sx={{
          width: '100%',
          '& .MuiTabs-flexContainer': {
            justifyContent: 'space-evenly',
            gap: 2,
          },
          '& .MuiTab-root': {
            color: 'rgba(255, 255, 255, 0.7)',
            '&.Mui-selected': {
              color: '#ffffff',
            },
            '&:hover': {
              color: '#ffffff',
              bgcolor: 'rgba(255, 255, 255, 0.08)',
            },
          },
          '& .MuiTabs-indicator': {
            backgroundColor: '#ffffff',
            height: 3,
          },
        }}
      >
        {items.map((item) => (
          <Tab
            key={item.id}
            label={item.label}
            value={item.id}
            icon={item.icon}
            iconPosition="start"
            sx={{
              minHeight: 56,
              flex: 1,
              maxWidth: 'none',
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
}
