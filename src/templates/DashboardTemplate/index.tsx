import { FC, ReactNode, useState } from 'react';
import { Layout, BreadcrumbProps } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import type { MenuProps } from 'antd';
import {
  DashboardOutlined,
  SettingOutlined,
  BellOutlined,
  SearchOutlined,
  TeamOutlined,
  TransactionOutlined,
  FileTextOutlined,
  SafetyOutlined,
  QuestionCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Sidebar, Header } from '@src/organisms';
import { StyledLayout, StyledContent } from './index.styled';

const { Content } = Layout;

export interface DashboardTemplateProps {
  children: ReactNode;
}

const DashboardTemplate: FC<DashboardTemplateProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  // Define menu structure
  const menuItems: MenuProps['items'] = [
    {
      type: 'group',
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
      type: 'divider',
    },
    {
      type: 'group',
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
      type: 'divider',
    },
    {
      type: 'group',
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

  const getBreadcrumbItems = (): BreadcrumbProps['items'] => {
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
    const findMenuItem = (items: any[], path: string): any => {
      for (const group of items) {
        if (group.type === 'group' && group.children) {
          for (const item of group.children) {
            if (item.key === path) {
              return item;
            }
            if (item.children) {
              const subItem = item.children.find(
                (child: any) => child.key === path,
              );
              if (subItem) {
                return { parent: item, current: subItem };
              }
            }
          }
        }
      }
      return null;
    };

    const menuItem = findMenuItem(menuItems, location.pathname);

    if (menuItem) {
      if (menuItem.parent) {
        breadcrumbItems.push({ title: menuItem.parent.label });
        breadcrumbItems.push({ title: menuItem.current.label });
      } else {
        breadcrumbItems.push({ title: menuItem.label });
      }
    }

    if (breadcrumbItems.length === 1 && location.pathname === '/') {
      breadcrumbItems.push({ title: 'Dashboard' });
    }

    return breadcrumbItems;
  };

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <StyledLayout>
      <Sidebar
        collapsed={collapsed}
        menuItems={menuItems}
        userName="John Doe"
        userRole="Administrator"
      />
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 280,
          transition: 'margin-left 0.2s',
          background: '#F5F6FA',
        }}
      >
        <Header
          collapsed={collapsed}
          onToggleCollapse={handleCollapse}
          breadcrumbItems={getBreadcrumbItems()}
        />
        <Content style={{ margin: '24px', minHeight: 280 }}>
          <StyledContent>{children}</StyledContent>
        </Content>
      </Layout>
    </StyledLayout>
  );
};

export default DashboardTemplate;
