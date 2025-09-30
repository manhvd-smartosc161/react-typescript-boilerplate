import { FC, useState, useEffect } from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { DownOutlined, RightOutlined } from '@ant-design/icons';
import { UserProfile } from '@src/molecules';
import { Button, Title, Image } from '@src/atoms';
import {
  StyledSidebar,
  LogoWrapper,
  MenuWrapper,
  UserProfileSection,
  ExportButton,
} from './index.styled';
import logoImage from '@src/assets/images/logo.png';

export interface SidebarProps {
  collapsed: boolean;
  menuItems: MenuProps['items'];
  userName?: string;
  userRole?: string;
  userAvatar?: string;
  onExport?: () => void;
}

const Sidebar: FC<SidebarProps> = ({
  collapsed,
  menuItems,
  userName = 'John Doe',
  userRole = 'Administrator',
  userAvatar,
  onExport,
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

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key.startsWith('/')) {
      navigate(key);
    }
  };

  const handleOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  const expandIcon = ({ isOpen }: { isOpen?: boolean }) => {
    return isOpen ? <DownOutlined /> : <RightOutlined />;
  };

  return (
    <StyledSidebar width={280} collapsed={collapsed}>
      <LogoWrapper>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '10px 15px',
          }}
        >
          <Image width={36} height={36} src={logoImage} alt="Logo" />
          {!collapsed && <Title level={4}>&nbsp;SmartBank</Title>}
        </div>
      </LogoWrapper>

      <MenuWrapper>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          openKeys={collapsed ? [] : openKeys}
          onOpenChange={handleOpenChange}
          style={{
            height: '100%',
            borderRight: 0,
          }}
          items={menuItems}
          onClick={handleMenuClick}
          expandIcon={expandIcon}
        />
      </MenuWrapper>

      <UserProfileSection>
        <UserProfile
          name={userName}
          role={userRole}
          avatarUrl={userAvatar}
          collapsed={collapsed}
        />
        {!collapsed && (
          <ExportButton>
            <Button variant="secondary" block onClick={onExport}>
              Export Data
            </Button>
          </ExportButton>
        )}
      </UserProfileSection>
    </StyledSidebar>
  );
};

export default Sidebar;
