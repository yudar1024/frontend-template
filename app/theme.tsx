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

// 导出自定义颜色供布局组件使用
export const layoutColors = {
  banner: '#0d47a1', // 深科技蓝 - Banner
  primaryMenu: '#1565c0', // 中等科技蓝 - 一级菜单
  secondaryMenu: '#f5f5f5', // 浅灰色 - 二级菜单
  secondaryMenuHover: '#e0e0e0', // 二级菜单悬停色
  secondaryMenuSelected: '#424242', // 深灰色 - 二级菜单选中色
};

export default theme;