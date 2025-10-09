import React, { FC, ReactNode, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { HandshakeOutlined } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '@src/components/organisms/Sidebar';
import Header from '@src/components/organisms/Header';
import { isAuthenticatedState } from '@src/store/auth';
import ROUTES from '@src/routes/route';
import { PAGE_TITLES } from '@src/constants';

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
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const menuItems = [
    {
      key: ROUTES.HOME,
      icon: <span>🏠</span>,
      label: PAGE_TITLES.DASHBOARD,
    },
    {
      key: ROUTES.SUPPLIER_REGISTRATION,
      icon: <HandshakeOutlined />,
      label: PAGE_TITLES.PARTNER_REGISTRATION,
    },
    {
      key: ROUTES.LEADS,
      icon: <span>📋</span>,
      label: PAGE_TITLES.LEADS,
    },
    {
      key: ROUTES.SETTINGS,
      icon: <span>⚙️</span>,
      label: PAGE_TITLES.SETTINGS,
    },
  ];

  const [collapsed, setCollapsed] = React.useState(false);

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const getBreadcrumbItems = () => {
    const breadcrumbItems = [
      {
        title: 'Supplier Portal',
        onClick: () => navigate(ROUTES.HOME),
      },
    ];

    const getCurrentPageTitle = () => {
      switch (location.pathname) {
        case ROUTES.HOME:
          return PAGE_TITLES.DASHBOARD;
        case ROUTES.LEADS:
          return PAGE_TITLES.LEADS;
        case ROUTES.SETTINGS:
          return PAGE_TITLES.SETTINGS;
        default:
          return PAGE_TITLES.DASHBOARD;
      }
    };

    breadcrumbItems.push({
      title: getCurrentPageTitle(),
      onClick: () => {}, // Current page doesn't need navigation
    });

    return breadcrumbItems;
  };

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
