import { FC, useState, useEffect } from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
  Divider,
  Typography,
} from '@mui/material';
// Removed Ant Design import - using MUI components instead
import { MenuItem } from '@src/types/menu';
import { useNavigate, useLocation } from 'react-router-dom';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { UserProfile } from '@src/molecules';
import { Button, Image, Title } from '@src/atoms';
import { useAuth } from '@src/hooks';
import logoImage from '@src/assets/images/logo.png';

export interface SidebarProps {
  collapsed: boolean;
  menuItems: MenuItem[];
  onExport?: () => void;
}

const Sidebar: FC<SidebarProps> = ({ collapsed, menuItems, onExport }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const findParentKey = (path: string, items: any[]): string | null => {
    for (const group of items) {
      if (group.type === 'group' && group.children) {
        for (const item of group.children) {
          if (item.key === path) {
            return item.key as string;
          }
          if (item.children) {
            const subItem = item.children.find(
              (child: any) => child.key === path,
            );
            if (subItem) {
              return item.key as string;
            }
          }
        }
      }
    }
    return null;
  };

  useEffect(() => {
    const parentKey = findParentKey(location.pathname, menuItems || []);
    if (parentKey) {
      setOpenKeys((prev) => {
        if (!prev.includes(parentKey)) {
          return [...prev, parentKey];
        }
        return prev;
      });
    }
  }, [location.pathname, menuItems]);

  const handleMenuClick = (key: string) => {
    if (key.startsWith('/')) {
      navigate(key);
    }
  };

  const handleToggleSubmenu = (key: string) => {
    setOpenKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  const renderMenuItems = (items: any[] = []) => {
    return items.map((item: any) => {
      // Divider
      if (item.type === 'divider') {
        return <Divider key={item.key || Math.random()} sx={{ my: 1 }} />;
      }

      // Group with children (nested menu)
      if (item.type === 'group' && item.children) {
        return (
          <Box key={item.key}>
            {!collapsed && (
              <Typography
                variant="caption"
                sx={{
                  px: 2,
                  py: 1,
                  color: 'text.secondary',
                  fontWeight: 600,
                  display: 'block',
                }}
              >
                {item.label}
              </Typography>
            )}
            {item.children.map((childItem: any) => {
              const hasChildren =
                childItem.children && childItem.children.length > 0;
              const isOpen = openKeys.includes(childItem.key);
              const isActive = location.pathname === childItem.key;

              if (hasChildren) {
                return (
                  <Box key={childItem.key}>
                    <ListItemButton
                      onClick={() => handleToggleSubmenu(childItem.key)}
                      sx={{ borderRadius: 1, mx: 1 }}
                    >
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        {childItem.icon}
                      </ListItemIcon>
                      {!collapsed && (
                        <>
                          <ListItemText primary={childItem.label} />
                          {isOpen ? <ExpandLess /> : <ExpandMore />}
                        </>
                      )}
                    </ListItemButton>
                    <Collapse in={isOpen && !collapsed} timeout="auto">
                      <List component="div" disablePadding>
                        {childItem.children.map((subItem: any) => (
                          <ListItemButton
                            key={subItem.key}
                            onClick={() => handleMenuClick(subItem.key)}
                            selected={location.pathname === subItem.key}
                            sx={{ pl: 4, borderRadius: 1, mx: 1 }}
                          >
                            <ListItemIcon sx={{ minWidth: 40 }}>
                              {subItem.icon}
                            </ListItemIcon>
                            <ListItemText primary={subItem.label} />
                          </ListItemButton>
                        ))}
                      </List>
                    </Collapse>
                  </Box>
                );
              }

              return (
                <ListItemButton
                  key={childItem.key}
                  onClick={() => handleMenuClick(childItem.key)}
                  selected={isActive}
                  sx={{ borderRadius: 1, mx: 1 }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    {childItem.icon}
                  </ListItemIcon>
                  {!collapsed && <ListItemText primary={childItem.label} />}
                </ListItemButton>
              );
            })}
          </Box>
        );
      }

      // Flat menu item (single level)
      const isActive = location.pathname === item.key;
      return (
        <ListItemButton
          key={item.key}
          onClick={() => handleMenuClick(item.key)}
          selected={isActive}
          sx={{ borderRadius: 1, mx: 1, mb: 0.5 }}
        >
          <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
          {!collapsed && <ListItemText primary={item.label} />}
        </ListItemButton>
      );
    });
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? 80 : 280,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: collapsed ? 80 : 280,
          height: '100vh',
          boxSizing: 'border-box',
          borderRight: 'none',
          transition: 'width 0.2s',
          boxShadow: '2px 0 8px rgba(0, 0, 0, 0.05)',
          position: 'fixed',
          top: 0,
          left: 0,
        },
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px 15px',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Image width={36} height={36} src={logoImage} alt="Logo" />
        {!collapsed && (
          <Title level={4} sx={{ marginLeft: 1, marginBottom: 0 }}>
            Smart Logo
          </Title>
        )}
      </Box>

      {/* Menu */}
      <Box sx={{ flex: 1, overflowY: 'auto', py: 1 }}>
        <List component="nav">{renderMenuItems(menuItems)}</List>
      </Box>

      {/* User Profile - From Recoil */}
      {currentUser && (
        <Box sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
          <UserProfile
            name={currentUser.fullName}
            role={currentUser.department || 'Employee'}
            avatarUrl={currentUser.avatar}
            collapsed={collapsed}
          />
          {!collapsed && (
            <Box sx={{ padding: 2 }}>
              <Button
                variant="secondary"
                fullWidth
                icon={<FileDownloadIcon />}
                onClick={onExport}
              >
                Export Data
              </Button>
            </Box>
          )}
        </Box>
      )}
    </Drawer>
  );
};

export default Sidebar;
