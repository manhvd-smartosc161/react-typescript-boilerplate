import React, { FC, ReactNode } from 'react';
import { useRecoilValue } from 'recoil';
import { SidebarOrganism, HeaderOrganism } from '@src/components/organisms';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { isAuthenticatedState } from '@src/store/auth';
import {
  StyledMainContainer,
  StyledMainContent,
  StyledContentArea,
} from './index.styled';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const isAuthenticated = useRecoilValue(isAuthenticatedState);
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Simple menu items for main layout
  const menuItems = [
    {
      key: '/',
      icon: <span>🏠</span>,
      label: 'Dashboard',
    },
    {
      key: '/settings',
      icon: <span>⚙️</span>,
      label: 'Settings',
    },
  ];

  const [collapsed, setCollapsed] = React.useState(false);

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const getBreadcrumbItems = () => [
    {
      title: 'Employee Portal',
      onClick: () => navigate('/'),
    },
    {
      title: 'Dashboard',
    },
  ];

  return (
    <>
      {isAuthenticated && (
        <StyledMainContainer>
          <SidebarOrganism collapsed={collapsed} menuItems={menuItems} />
          <StyledMainContent component="main">
            <HeaderOrganism
              collapsed={collapsed}
              onToggleCollapse={handleCollapse}
              breadcrumbItems={getBreadcrumbItems()}
            />
            <StyledContentArea>{children}</StyledContentArea>
          </StyledMainContent>
        </StyledMainContainer>
      )}
    </>
  );
};

export default MainLayout;
