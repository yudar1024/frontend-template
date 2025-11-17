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
import { useRouter, usePathname } from 'next/navigation';
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
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  // 检查当前菜单项是否被选中
  const isSelected = pathname === item.path;

  const handleClick = () => {
    if (hasChildren) {
      setOpen(!open);
    } else if (item.path) {
      // 如果没有子菜单且有路径,则进行路由跳转
      router.push(item.path);
    }
  };

  return (
    <>
      <ListItemButton
        onClick={handleClick}
        selected={isSelected}
        sx={{
          mx: 1,
          mb: 0.5,
          pl: 1.5 + level * 2,
          pr: 1.5,
          py: 1,
          borderRadius: '6px',
          justifyContent: collapsed ? 'center' : 'flex-start',
          color: layoutColors.secondaryMenuText,
          minHeight: 36,
          transition: 'all 0.15s ease',
          '&:hover': {
            bgcolor: layoutColors.secondaryMenuHover,
            color: layoutColors.secondaryMenuActive,
          },
          '&.Mui-selected': {
            bgcolor: layoutColors.secondaryMenuSelected,
            color: layoutColors.secondaryMenuActive,
            fontWeight: 500,
            '&:hover': {
              bgcolor: layoutColors.secondaryMenuSelected,
              filter: 'brightness(0.95)',
            },
          },
        }}
      >
        {item.icon && (
          <ListItemIcon
            sx={{
              minWidth: collapsed ? 0 : 36,
              color: 'inherit',
              '& .MuiSvgIcon-root': {
                fontSize: '1.125rem',
              },
            }}
          >
            {item.icon}
          </ListItemIcon>
        )}
        {!collapsed && (
          <>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontSize: level > 0 ? '0.8125rem' : '0.875rem',
                fontWeight: level === 0 ? 500 : 400,
                letterSpacing: '-0.01em',
              }}
            />
            {hasChildren && (
              <Box
                component="span"
                sx={{
                  color: layoutColors.secondaryMenuIcon,
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'transform 0.2s ease',
                  transform: open ? 'rotate(0deg)' : 'rotate(0deg)',
                }}
              >
                {open ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
              </Box>
            )}
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
          top: 112, // AppBar (64px) + PrimaryMenu (48px)
          height: 'calc(100% - 112px)',
          bgcolor: layoutColors.secondaryMenu,
          borderRight: `1px solid ${layoutColors.secondaryMenuBorder}`,
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
        <List
          component="nav"
          sx={{
            flexGrow: 1,
            overflow: 'auto',
            pt: 1.5,
            pb: 1,
            px: 0,
          }}
        >
          {items.map((item) => (
            <MenuItemComponent
              key={item.id}
              item={item}
              collapsed={!open}
            />
          ))}
        </List>

        {/* Toggle Button at Bottom */}
        <Divider sx={{ borderColor: layoutColors.secondaryMenuBorder }} />
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          p: 1.5,
        }}>
          <IconButton
            onClick={onToggle}
            size="small"
            sx={{
              color: layoutColors.secondaryMenuIcon,
              '&:hover': {
                bgcolor: layoutColors.secondaryMenuHover,
                color: layoutColors.secondaryMenuActive,
              },
            }}
          >
            {open ? <ChevronLeft fontSize="small" /> : <ChevronRight fontSize="small" />}
          </IconButton>
        </Box>
      </Box>
    </Drawer>
  );
}
