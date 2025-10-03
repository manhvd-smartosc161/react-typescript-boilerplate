import React, { FC, ReactNode, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { SidebarOrganism, HeaderOrganism } from '@src/components/organisms';
import { isAuthenticatedState } from '@src/store/auth';
import ROUTES from '@src/routes/route';
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

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN, { replace: true });
    }
  }, [isAuthenticated, navigate]);

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
