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
  name: '企业管理系统',
  logo: '/logo.png', // 可选：公司Logo
  userInfo: {
    name: '张三',
    avatar: '/avatar.png', // 可选：用户头像
    role: '系统管理员',
  },
};

// 示例：菜单配置
export const menuConfig: MenuItem[] = [
  {
    id: 'dashboard',
    label: '工作台',
    icon: <Dashboard fontSize="small" />,
    path: '/dashboard',
    children: [
      {
        id: 'dashboard-overview',
        label: '数据概览',
        icon: <Assessment fontSize="small" />,
        path: '/dashboard/overview',
      },
      {
        id: 'dashboard-analytics',
        label: '数据分析',
        icon: <Assessment fontSize="small" />,
        path: '/dashboard/analytics',
      },
    ],
  },
  {
    id: 'customers',
    label: '客户管理',
    icon: <People fontSize="small" />,
    path: '/customers',
    children: [
      {
        id: 'customers-list',
        label: '客户列表',
        path: '/customers/list',
      },
      {
        id: 'customers-groups',
        label: '客户分组',
        path: '/customers/groups',
        children: [
          {
            id: 'customers-groups-enterprise',
            label: '企业客户',
            path: '/customers/groups/enterprise',
          },
          {
            id: 'customers-groups-individual',
            label: '个人客户',
            path: '/customers/groups/individual',
          },
        ],
      },
      {
        id: 'customers-analysis',
        label: '客户分析',
        path: '/customers/analysis',
      },
    ],
  },
  {
    id: 'products',
    label: '产品管理',
    icon: <Inventory fontSize="small" />,
    path: '/products',
    children: [
      {
        id: 'products-list',
        label: '产品列表',
        path: '/products/list',
      },
      {
        id: 'products-categories',
        label: '产品分类',
        path: '/products/categories',
      },
      {
        id: 'products-inventory',
        label: '库存管理',
        path: '/products/inventory',
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
      {
        id: 'orders-pending',
        label: '待处理订单',
        path: '/orders/pending',
      },
      {
        id: 'orders-completed',
        label: '已完成订单',
        path: '/orders/completed',
      },
    ],
  },
  {
    id: 'finance',
    label: '财务管理',
    icon: <AccountBalance fontSize="small" />,
    path: '/finance',
    children: [
      {
        id: 'finance-income',
        label: '收入管理',
        path: '/finance/income',
      },
      {
        id: 'finance-expense',
        label: '支出管理',
        path: '/finance/expense',
      },
      {
        id: 'finance-reports',
        label: '财务报表',
        path: '/finance/reports',
      },
    ],
  },
  {
    id: 'reports',
    label: '报表中心',
    icon: <Description fontSize="small" />,
    path: '/reports',
    children: [
      {
        id: 'reports-sales',
        label: '销售报表',
        path: '/reports/sales',
      },
      {
        id: 'reports-performance',
        label: '业绩报表',
        path: '/reports/performance',
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
        id: 'system-logs',
        label: '操作日志',
        icon: <Description fontSize="small" />,
        path: '/system/logs',
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
