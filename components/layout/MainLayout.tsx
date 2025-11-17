'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Box, CssBaseline } from '@mui/material';
import { usePathname } from 'next/navigation';
import CompanyBanner from './CompanyBanner';
import PrimaryMenu from './PrimaryMenu';
import SecondaryMenu from './SecondaryMenu';
import { CompanyInfo, MenuItem } from './types';

interface MainLayoutProps {
  companyInfo: CompanyInfo;
  menuItems: MenuItem[];
  children: React.ReactNode;
}

export default function MainLayout({
  companyInfo,
  menuItems,
  children,
}: MainLayoutProps) {
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState<string>(
    menuItems[0]?.id || ''
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // 根据当前路径自动设置活动菜单
  useEffect(() => {
    // 查找匹配当前路径的菜单项
    for (const menu of menuItems) {
      // 检查一级菜单路径
      if (pathname.startsWith(menu.path)) {
        setActiveMenu(menu.id);
        return;
      }
      // 检查二级菜单路径
      if (menu.children) {
        for (const child of menu.children) {
          if (pathname.startsWith(child.path)) {
            setActiveMenu(menu.id);
            return;
          }
          // 检查三级菜单路径
          if (child.children) {
            for (const grandChild of child.children) {
              if (pathname.startsWith(grandChild.path)) {
                setActiveMenu(menu.id);
                return;
              }
            }
          }
        }
      }
    }
  }, [pathname, menuItems]);

  // 根据当前选中的一级菜单，获取对应的二级菜单
  const secondaryMenuItems = useMemo(() => {
    const activeMenuItem = menuItems.find(
      (item) => item.id === activeMenu
    );
    return activeMenuItem?.children || [];
  }, [activeMenu, menuItems]);

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
          items={menuItems}
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
