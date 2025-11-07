'use client';

import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { MenuItem } from './types';

interface PrimaryMenuProps {
  items: MenuItem[];
  activeMenu: string;
  onMenuChange: (menuId: string) => void;
}

export default function PrimaryMenu({ items, activeMenu, onMenuChange }: PrimaryMenuProps) {
  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    onMenuChange(newValue);
  };

  return (
    <Box 
      sx={{ 
        borderBottom: 1, 
        borderColor: 'divider',
        bgcolor: 'background.paper',
        position: 'sticky',
        top: 64, // AppBar height
        zIndex: (theme) => theme.zIndex.drawer,
      }}
    >
      <Tabs 
        value={activeMenu} 
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ px: 2 }}
      >
        {items.map((item) => (
          <Tab
            key={item.id}
            label={item.label}
            value={item.id}
            icon={item.icon}
            iconPosition="start"
            sx={{ minHeight: 56 }}
          />
        ))}
      </Tabs>
    </Box>
  );
}
