import { FC, ReactNode, useState, useEffect } from 'react';
import { Layout as AntLayout, Menu, Button, Breadcrumb, Avatar } from 'antd';
import {
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  SettingOutlined,
  BellOutlined,
  SearchOutlined,
  TeamOutlined,
  TransactionOutlined,
  FileTextOutlined,
  SafetyOutlined,
  QuestionCircleOutlined,
  DownloadOutlined,
  RightOutlined,
  DownOutlined,
  // TaskOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  StyledLayout,
  StyledSider,
  StyledHeader,
  Logo,
  LogoWrapper,
  StyledContent,
  HeaderLeft,
  CustomMenu,
  UserProfileWrapper,
  UserProfileCard,
  UserAvatar,
  UserInfo,
  UserName,
  UserRole,
  SettingsButton,
  ExportButton,
} from './index.styled';
import Image from '@src/components/Image';
import logoImage from '@src/assets/images/logo.png';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  // Define menu structure
  const menuItems = [
    {
      type: 'group' as const,
      key: 'quick-action',
      label: 'Quick Action',
      children: [
        {
          key: '/customer-tasks',
          icon: <TransactionOutlined />,
          label: 'Customer Tasks',
        },
        {
          key: '/customer-search',
          icon: <SearchOutlined />,
          label: 'Customer Search',
        },
      ],
    },
    {
      type: 'divider' as const,
    },
    {
      type: 'group' as const,
      key: 'main-navigation',
      label: 'Main Navigation',
      children: [
        {
          key: 'general',
          icon: <DashboardOutlined />,
          label: 'General',
          children: [
            {
              key: '/overview',
              label: 'Overview',
              icon: <FileTextOutlined />,
            },
            {
              key: '/',
              label: 'Dashboard',
              icon: <DashboardOutlined />,
            },
          ],
        },
        {
          key: '/customers',
          icon: <TeamOutlined />,
          label: 'Customers Management',
        },
        {
          key: '/transactions',
          icon: <TransactionOutlined />,
          label: 'Transactions',
        },
        {
          key: '/reports',
          icon: <FileTextOutlined />,
          label: 'Report',
        },
        {
          key: '/compliance',
          icon: <SafetyOutlined />,
          label: 'Compliance',
        },
      ],
    },
    {
      type: 'divider' as const,
    },
    {
      type: 'group' as const,
      key: 'system-setting',
      label: 'System & Setting',
      children: [
        {
          key: '/settings',
          icon: <SettingOutlined />,
          label: 'System Settings',
        },
        {
          key: '/notifications',
          icon: <BellOutlined />,
          label: 'Notifications',
        },
        {
          key: '/help-support',
          icon: <QuestionCircleOutlined />,
          label: 'Help & Support',
        },
        {
          key: '/user-management',
          icon: <UserOutlined />,
          label: 'User Management',
        },
      ],
    },
  ];

  const findParentKey = (path: string): string | null => {
    for (const group of menuItems) {
      if (group.type === 'group' && group.children) {
        for (const item of group.children) {
          if (item.key === path) {
            return item.key as string;
          }
          if (item.children) {
            const subItem = item.children.find((child) => child.key === path);
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
    const parentKey = findParentKey(location.pathname);
    if (parentKey) {
      setOpenKeys((prev) => {
        if (!prev.includes(parentKey)) {
          return [...prev, parentKey];
        }
        return prev;
      });
    }
  }, [location.pathname]);

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key.startsWith('/')) {
      navigate(key);
    }
  };

  const handleOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const getBreadcrumbItems = () => {
    const breadcrumbItems: any[] = [
      {
        title: (
          <span onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            Admin Portal
          </span>
        ),
      },
    ];

    // Find the current active menu item
    for (const group of menuItems) {
      if (group.type === 'group' && group.children) {
        for (const item of group.children) {
          if (item.key === location.pathname) {
            breadcrumbItems.push({ title: item.label });
            break;
          }
          if (item.children) {
            const subItem = item.children.find(
              (child) => child.key === location.pathname,
            );
            if (subItem) {
              breadcrumbItems.push({ title: item.label });
              breadcrumbItems.push({ title: subItem.label });
              break;
            }
          }
        }
      }
    }

    if (breadcrumbItems.length === 1 && location.pathname === '/') {
      breadcrumbItems.push({ title: 'Dashboard' });
    }

    return breadcrumbItems;
  };

  // Custom expandIcon for submenu
  const expandIcon = ({ isOpen }: { isOpen?: boolean }) => {
    return isOpen ? <DownOutlined /> : <RightOutlined />;
  };

  return (
    <StyledLayout>
      <StyledSider
        width={280}
        collapsed={collapsed}
        style={{
          background: '#fff',
          borderRight: '1px solid #f0f0f0',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <LogoWrapper>
          <Logo
            style={{
              textAlign: 'left',
              padding: '10px 15px 15px',
              color: 'black',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Image width={36} height={36} src={logoImage} alt="Logo" />
            &nbsp;
            {!collapsed && 'SmartBank'}
            {collapsed && 'SMB'}
          </Logo>
        </LogoWrapper>

        <CustomMenu>
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
        </CustomMenu>

        <UserProfileWrapper>
          {/* Component E: User Profile */}
          <UserProfileCard>
            <UserAvatar>
              <Avatar size={40} icon={<UserOutlined />} />
            </UserAvatar>
            <UserInfo>
              <UserName>John Doe</UserName>
              <UserRole>Administrator</UserRole>
            </UserInfo>
            <SettingsButton>
              <SettingOutlined style={{ fontSize: '16px' }} />
            </SettingsButton>
          </UserProfileCard>

          {/* Component F: Export Button */}
          <ExportButton icon={<DownloadOutlined />}>Export Data</ExportButton>
        </UserProfileWrapper>
      </StyledSider>

      <AntLayout style={{ background: '#F5F6FA' }}>
        <StyledHeader>
          <HeaderLeft>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={handleCollapse}
              style={{
                fontSize: '16px',
                width: 40,
                height: 40,
              }}
            />
            <div>
              <Breadcrumb separator=" > " items={getBreadcrumbItems()} />
            </div>
          </HeaderLeft>
        </StyledHeader>

        <StyledContent>{children}</StyledContent>
      </AntLayout>
    </StyledLayout>
  );
};

export default Layout;
