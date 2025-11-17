'use client';

import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { companyInfo, menuConfig } from '@/config/menuConfig';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainLayout companyInfo={companyInfo} menuItems={menuConfig}>
      {children}
    </MainLayout>
  );
}
