'use client';

import React, { useState, useMemo } from 'react';
import { Box, CssBaseline } from '@mui/material';
import CompanyBanner from './CompanyBanner';
import PrimaryMenu from './PrimaryMenu';
import SecondaryMenu from './SecondaryMenu';
import { CompanyInfo, MenuItem } from './types';

interface MainLayoutProps {
  companyInfo: CompanyInfo;
  primaryMenuItems: MenuItem[];
  children: React.ReactNode;
}

export default function MainLayout({
  companyInfo,
  primaryMenuItems,
  children,
}: MainLayoutProps) {
  const [activeMenu, setActiveMenu] = useState<string>(
    primaryMenuItems[0]?.id || ''
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // 根据当前选中的一级菜单，获取对应的二级菜单
  const secondaryMenuItems = useMemo(() => {
    const activeMenuItem = primaryMenuItems.find(
      (item) => item.id === activeMenu
    );
    return activeMenuItem?.children || [];
  }, [activeMenu, primaryMenuItems]);

  const handleMenuChange = (menuId: string) => {
    setActiveMenu(menuId);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <CssBaseline />
      
      {/* Company Banner */}
      <CompanyBanner companyInfo={companyInfo} />
      
      {/* Primary Menu */}
      <Box sx={{ mt: 8 }}>
        <PrimaryMenu
          items={primaryMenuItems}
          activeMenu={activeMenu}
          onMenuChange={handleMenuChange}
          sidebarOpen={sidebarOpen}
          hasSecondaryMenu={secondaryMenuItems.length > 0}
        />
      </Box>

      {/* Content Area with Secondary Menu */}
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden', mt: 7 }}>
        {/* Secondary Menu - Only show if there are secondary items */}
        {secondaryMenuItems.length > 0 && (
          <SecondaryMenu
            items={secondaryMenuItems}
            open={sidebarOpen}
            onToggle={handleSidebarToggle}
          />
        )}

        {/* Main Content Area */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            overflow: 'auto',
            bgcolor: 'background.default',
            ml: secondaryMenuItems.length > 0 
              ? (sidebarOpen ? 0 : 0) 
              : 0,
            transition: (theme) =>
              theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
