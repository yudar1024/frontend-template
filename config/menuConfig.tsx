import React from 'react';
import {
  Dashboard,
  People,
  Settings,
  Assessment,
  Inventory,
  ShoppingCart,
  AccountBalance,
  Description,
  Security,
  Help,
} from '@mui/icons-material';
import { MenuItem, CompanyInfo } from '@/components/layout/types';

// 示例：公司信息配置
export const companyInfo: CompanyInfo = {
  name: 'GCL-可信数据空间',
  logo: '/img/logo.png', // 可选：公司Logo
  userInfo: {
    name: '吴希言',
    avatar: '/avatar.png', // 可选：用户头像
    role: '系统管理员',
  },
};

// 示例：菜单配置
export const menuConfig: MenuItem[] = [
  {
    id: 'dashboard',
    label: '首页',
    icon: <Dashboard fontSize="small" />,
    path: '/dashboard',
    children: [
        {
            id: 'trust-space',
            label: '可信空间',
            icon: <Assessment fontSize="small" />,
            path: '/dashboard/trust-space',
        },
    ],
  },
  {
    id: 'linker',
    label: '链接器',
    icon: <People fontSize="small" />,
    path: '/linker',
    children: [
      {
        id: 'product',
        label: '数据产品',
        path: '/linker/product',
      },
      {
        id: 'data-assets',
        label: '数据资产',
        path: '/linker/data-assets',
        children: [
          {
            id: 'data-assets-local',
            label: '本地数据源',
            path: '/linker/data-assets/local',
          },
        ],
      },
    ],
  },
  {
    id: 'orders',
    label: '订单管理',
    icon: <ShoppingCart fontSize="small" />,
    path: '/orders',
    children: [
      {
        id: 'orders-all',
        label: '全部订单',
        path: '/orders/all',
      },
    ],
  },
  {
    id: 'data-processing',
    label: '数据平台',
    icon: <AccountBalance fontSize="small" />,
    path: '/data-processing',
    children: [
      {
        id: 'data-handling',
        label: '数据加工',
        path: '/data-processing',
      },
    ],
  },
  {
    id: 'system',
    label: '系统设置',
    icon: <Settings fontSize="small" />,
    path: '/system',
    children: [
      {
        id: 'system-users',
        label: '用户管理',
        icon: <People fontSize="small" />,
        path: '/system/users',
      },
      {
        id: 'system-roles',
        label: '角色权限',
        icon: <Security fontSize="small" />,
        path: '/system/roles',
      },
      {
        id: 'system-settings',
        label: '系统配置',
        icon: <Settings fontSize="small" />,
        path: '/system/settings',
      },
      {
        id: 'organizations',
        label: '组织',
        icon: <Description fontSize="small" />,
        path: '/system/organizations',
      },
    ],
  },
  {
    id: 'help',
    label: '帮助中心',
    icon: <Help fontSize="small" />,
    path: '/help',
    children: [
      {
        id: 'help-docs',
        label: '使用文档',
        path: '/help/docs',
      },
      {
        id: 'help-faq',
        label: '常见问题',
        path: '/help/faq',
      },
      {
        id: 'help-support',
        label: '技术支持',
        path: '/help/support',
      },
    ],
  },
];
