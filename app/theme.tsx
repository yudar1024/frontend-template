'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
  palette: {
    primary: {
      main: '#1976d2', // 科技蓝主色
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#0288d1',
      light: '#03a9f4',
      dark: '#01579b',
    },
    background: {
      default: '#f5f7fa',
      paper: '#ffffff',
    },
  },
  cssVariables: true,
});

// 导出自定义颜色供布局组件使用 - Vercel v0 风格
export const layoutColors = {
  // Banner - 纯白背景,黑色文字
  banner: '#ffffff',
  bannerText: '#0a0a0a',
  bannerBorder: '#e5e5e5',

  // Primary Menu - 浅灰背景
  primaryMenu: '#fafafa',
  primaryMenuText: '#525252',
  primaryMenuActive: '#0a0a0a',
  primaryMenuHover: '#f5f5f5',
  primaryMenuBorder: '#e5e5e5',
  primaryMenuIndicator: '#0a0a0a',

  // Secondary Menu - 白色背景
  secondaryMenu: '#ffffff',
  secondaryMenuText: '#737373',
  secondaryMenuActive: '#0a0a0a',
  secondaryMenuHover: '#f9fafb',
  secondaryMenuBorder: '#e5e5e5',
  secondaryMenuIcon: '#a3a3a3',
};

export default theme;