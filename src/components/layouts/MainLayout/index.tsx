import React, { FC, ReactNode, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Sidebar from '@src/components/organisms/Sidebar';
import Header from '@src/components/organisms/Header';
import { isAuthenticatedState } from '@src/stores';
import ROUTES from '@src/routes/route';

import {
  StyledMainContainer,
  StyledMainContent,
  StyledContentArea,
} from './index.styled';
import { IconAtom } from '@src/components/atoms';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const { t } = useTranslation();
  const isAuthenticated = useRecoilValue(isAuthenticatedState);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const menuItems = [
    {
      key: ROUTES.HOME,
      icon: <IconAtom name="home" size={collapsed ? 24 : 16} />,
      label: t('common:dashboard'),
    },
    {
      key: ROUTES.SUPPLIER_REGISTRATION,
      icon: <IconAtom name="userGroup" size={collapsed ? 24 : 16} />,
      label: t('common:partnerRegistration'),
    },
    {
      key: ROUTES.LEADS,
      icon: <span>📋</span>,
      label: t('common:leads'),
    },
    {
      key: ROUTES.SETTINGS,
      icon: <span>⚙️</span>,
      label: t('common:settings'),
    },
  ];

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleMobileToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMobileClose = () => {
    setMobileOpen(false);
  };

  const getBreadcrumbItems = () => {
    const breadcrumbItems = [
      {
        title: t('common:supplierPortal'),
        onClick: () => navigate(ROUTES.HOME),
      },
    ];

    const getCurrentPageTitle = () => {
      switch (location.pathname) {
        case ROUTES.HOME:
          return t('common:dashboard');
        case ROUTES.LEADS:
          return t('common:leads');
        case ROUTES.SETTINGS:
          return t('common:settings');
        case ROUTES.SUPPLIER_REGISTRATION:
          return t('common:partnerRegistration');
        default:
          return t('common:dashboard');
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
          <Header
            collapsed={collapsed}
            onMobileToggle={handleMobileToggle}
            breadcrumbItems={getBreadcrumbItems()}
          />
          <StyledMainContent component="main">
            <Sidebar
              collapsed={collapsed}
              mobileOpen={mobileOpen}
              menuItems={menuItems}
              onMobileClose={handleMobileClose}
              onToggleCollapse={handleCollapse}
            />
            <StyledContentArea>{children}</StyledContentArea>
          </StyledMainContent>
        </StyledMainContainer>
      )}
    </>
  );
};

export default MainLayout;
