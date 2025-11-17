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
        borderBottom: `1px solid ${layoutColors.primaryMenuBorder}`,
        bgcolor: layoutColors.primaryMenu,
        position: 'sticky',
        top: 64, // AppBar height
        zIndex: (theme) => theme.zIndex.drawer,
        paddingLeft: `${leftOffset}px`,
        transition: (theme) =>
          theme.transitions.create('padding-left', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
      }}
    >
      <Tabs
        value={activeMenu}
        onChange={handleChange}
        sx={{
          minHeight: 48,
          px: 3,
          '& .MuiTabs-flexContainer': {
            gap: 1,
          },
          '& .MuiTab-root': {
            minHeight: 48,
            px: 3,
            py: 1.5,
            color: layoutColors.primaryMenuText,
            fontSize: '0.875rem',
            fontWeight: 500,
            textTransform: 'none',
            letterSpacing: '-0.01em',
            borderRadius: '6px',
            transition: 'all 0.2s ease',
            '&.Mui-selected': {
              color: layoutColors.primaryMenuActive,
              bgcolor: 'transparent',
            },
            '&:hover': {
              color: layoutColors.primaryMenuActive,
              bgcolor: layoutColors.primaryMenuHover,
            },
          },
          '& .MuiTabs-indicator': {
            backgroundColor: layoutColors.primaryMenuIndicator,
            height: 2,
            borderRadius: '2px 2px 0 0',
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
              '& .MuiSvgIcon-root': {
                fontSize: '1.125rem',
              },
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
}
