'use client';

import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
  Box,
  Divider,
} from '@mui/material';
import {
  ExpandLess,
  ExpandMore,
  ChevronLeft,
  ChevronRight,
} from '@mui/icons-material';
import { MenuItem } from './types';
import { layoutColors } from '@/app/theme';

interface SecondaryMenuProps {
  items: MenuItem[];
  open: boolean;
  onToggle: () => void;
}

const DRAWER_WIDTH = 260;
const DRAWER_WIDTH_COLLAPSED = 64;

function MenuItemComponent({ 
  item, 
  level = 0, 
  collapsed 
}: { 
  item: MenuItem; 
  level?: number; 
  collapsed: boolean;
}) {
  const [open, setOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  const handleClick = () => {
    if (hasChildren) {
      setOpen(!open);
    }
  };

  return (
    <>
      <ListItemButton
        onClick={handleClick}
        sx={{
          pl: 2 + level * 2,
          justifyContent: collapsed ? 'center' : 'flex-start',
          color: '#424242',
          '&:hover': {
            bgcolor: layoutColors.secondaryMenuHover,
          },
          '&.Mui-selected': {
            bgcolor: layoutColors.secondaryMenuSelected,
            color: '#ffffff',
            '&:hover': {
              bgcolor: '#616161',
            },
          },
        }}
      >
        {item.icon && (
          <ListItemIcon sx={{ minWidth: collapsed ? 0 : 40, color: 'inherit' }}>
            {item.icon}
          </ListItemIcon>
        )}
        {!collapsed && (
          <>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontSize: level > 0 ? '0.875rem' : '1rem',
              }}
            />
            {hasChildren && (open ? <ExpandLess /> : <ExpandMore />)}
          </>
        )}
      </ListItemButton>
      
      {hasChildren && !collapsed && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children!.map((child) => (
              <MenuItemComponent
                key={child.id}
                item={child}
                level={level + 1}
                collapsed={collapsed}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
}

export default function SecondaryMenu({ items, open, onToggle }: SecondaryMenuProps) {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? DRAWER_WIDTH : DRAWER_WIDTH_COLLAPSED,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? DRAWER_WIDTH : DRAWER_WIDTH_COLLAPSED,
          boxSizing: 'border-box',
          top: 120, // AppBar + PrimaryMenu height
          height: 'calc(100% - 120px)',
          bgcolor: layoutColors.secondaryMenu,
          borderRight: '1px solid #e0e0e0',
          transition: (theme) =>
            theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          overflowX: 'hidden',
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Menu Items */}
        <List component="nav" sx={{ flexGrow: 1, overflow: 'auto', pt: 0 }}>
          {items.map((item) => (
            <MenuItemComponent
              key={item.id}
              item={item}
              collapsed={!open}
            />
          ))}
        </List>

        {/* Toggle Button at Bottom */}
        <Divider sx={{ borderColor: '#e0e0e0' }} />
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 1 }}>
          <IconButton onClick={onToggle} size="small" sx={{ color: '#616161' }}>
            {open ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </Box>
      </Box>
    </Drawer>
  );
}
