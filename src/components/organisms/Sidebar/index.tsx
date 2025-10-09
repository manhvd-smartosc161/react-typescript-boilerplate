import { FC, useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
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
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { UserProfileMolecule } from '@src/components/molecules';
import { ButtonAtom, LogoAtom } from '@src/components/atoms';
import { currentUserState } from '@src/store/auth';
import {
  StyledDrawer,
  StyledLogoSection,
  StyledMenuSection,
  StyledList,
  StyledGroupLabel,
  StyledListItemButton,
  StyledSubMenuItemButton,
  StyledUserSection,
  StyledExportSection,
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
  menuItems: MenuItem[];
  onExport?: () => void;
}

const Sidebar: FC<SidebarProps> = ({ collapsed, menuItems, onExport }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = useRecoilValue(currentUserState);
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
              color: `${isActive ? '#fff' : 'text.secondary'}`,
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
    <StyledDrawer variant="permanent" $collapsed={collapsed}>
      <StyledLogoSection>
        <LogoAtom collapsed={collapsed} />
      </StyledLogoSection>

      <StyledMenuSection>
        <StyledList component="nav">{renderMenuItems(menuItems)}</StyledList>
      </StyledMenuSection>

      {currentUser && (
        <StyledUserSection>
          <UserProfileMolecule
            name={currentUser.name}
            role="Employee"
            avatarUrl=""
            collapsed={collapsed}
          />
          {!collapsed && (
            <StyledExportSection>
              <ButtonAtom
                variant="secondary"
                fullWidth
                icon={<FileDownloadIcon />}
                onClick={onExport}
              >
                Export Data
              </ButtonAtom>
            </StyledExportSection>
          )}
        </StyledUserSection>
      )}
    </StyledDrawer>
  );
};

export default Sidebar;
