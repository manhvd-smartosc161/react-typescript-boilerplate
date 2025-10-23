import { FC, useState, useEffect } from 'react';
import {
  Box,
  List,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { LogoAtom } from '@src/components/atoms';
import {
  StyledDrawer,
  StyledLogoSection,
  StyledMenuSection,
  StyledList,
  StyledGroupLabel,
  StyledListItemButton,
  StyledSubMenuItemButton,
  StyledToggleBtn,
} from './index.styled';

interface MenuItem {
  key?: string;
  icon?: React.ReactNode;
  label?: string;
  type?: string;
  children?: MenuItem[];
}

export interface SidebarProps {
  collapsed: boolean;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
  menuItems: MenuItem[];
  onToggleCollapse: () => void;
}

const Sidebar: FC<SidebarProps> = ({
  collapsed,
  mobileOpen,
  onMobileClose,
  menuItems,
  onToggleCollapse,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
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
      // Close mobile menu when item is clicked
      if (onMobileClose) {
        onMobileClose();
      }
    }
  };

  const handleToggleSubmenu = (key: string) => {
    setOpenKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  const renderMenuItems = (items: any[] = []) => {
    return items.map((item: any) => {
      if (item.type === 'divider') {
        return <Divider key={item.key || Math.random()} sx={{ my: 1 }} />;
      }

      if (item.type === 'group' && item.children) {
        return (
          <Box key={item.key}>
            {!collapsed && (
              <StyledGroupLabel variant="caption">
                {item.label}
              </StyledGroupLabel>
            )}
            {item.children.map((childItem: any) => {
              const hasChildren =
                childItem.children && childItem.children.length > 0;
              const isOpen = openKeys.includes(childItem.key);
              const isActive = location.pathname === childItem.key;

              if (hasChildren) {
                return (
                  <Box key={childItem.key}>
                    <StyledListItemButton
                      onClick={() => handleToggleSubmenu(childItem.key)}
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
                    </StyledListItemButton>
                    <Collapse in={isOpen && !collapsed} timeout="auto">
                      <List component="div" disablePadding>
                        {childItem.children.map((subItem: any) => (
                          <StyledSubMenuItemButton
                            key={subItem.key}
                            onClick={() => handleMenuClick(subItem.key)}
                            selected={location.pathname === subItem.key}
                          >
                            <ListItemIcon sx={{ minWidth: 40 }}>
                              {subItem.icon}
                            </ListItemIcon>
                            <ListItemText primary={subItem.label} />
                          </StyledSubMenuItemButton>
                        ))}
                      </List>
                    </Collapse>
                  </Box>
                );
              }

              return (
                <StyledListItemButton
                  key={childItem.key}
                  onClick={() => handleMenuClick(childItem.key)}
                  selected={isActive}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    {childItem.icon}
                  </ListItemIcon>
                  {!collapsed && <ListItemText primary={childItem.label} />}
                </StyledListItemButton>
              );
            })}
          </Box>
        );
      }

      const isActive = location.pathname === item.key;
      return (
        <StyledListItemButton
          key={item.key}
          onClick={() => handleMenuClick(item.key)}
          selected={isActive}
        >
          <ListItemIcon
            sx={{
              minWidth: 40,
              color: `${isActive ? '#424242' : 'text.secondary'}`,
            }}
          >
            {item.icon}
          </ListItemIcon>
          {!collapsed && <ListItemText primary={item.label} />}
        </StyledListItemButton>
      );
    });
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <StyledDrawer
        variant="permanent"
        collapsed={collapsed}
        sx={{
          display: { xs: 'none', md: 'block' },
        }}
      >
        <StyledMenuSection collapsed={collapsed}>
          <StyledList component="nav">{renderMenuItems(menuItems)}</StyledList>
        </StyledMenuSection>
      </StyledDrawer>
      <StyledToggleBtn
        aria-label="Toggle sidebar"
        collapsed={collapsed}
        onClick={onToggleCollapse}
      >
        {collapsed ? (
          <ChevronRightIcon fontSize="small" />
        ) : (
          <ChevronLeftIcon fontSize="small" />
        )}
      </StyledToggleBtn>

      {/* Mobile Sidebar */}
      <StyledDrawer
        variant="temporary"
        collapsed={false}
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
      >
        <StyledLogoSection>
          <LogoAtom collapsed={false} />
        </StyledLogoSection>
        <StyledMenuSection>
          <StyledList component="nav">{renderMenuItems(menuItems)}</StyledList>
        </StyledMenuSection>
      </StyledDrawer>
    </>
  );
};

export default Sidebar;
