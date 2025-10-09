import React, { FC, ReactNode, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { HandshakeOutlined } from '@mui/icons-material';
import { Sidebar, Header } from '@src/components';
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
      key: '/supplier-registration',
      icon: <HandshakeOutlined />,
      label: 'Partner Registration',
    },
    {
      key: '/leads',
      icon: <span>📋</span>,
      label: 'Leads',
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
          <Sidebar collapsed={collapsed} menuItems={menuItems} />
          <StyledMainContent component="main">
            <Header
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
