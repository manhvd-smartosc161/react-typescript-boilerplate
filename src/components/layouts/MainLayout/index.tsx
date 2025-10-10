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

  const menuItems = [
    {
      key: ROUTES.HOME,
      icon: <span>🏠</span>,
      label: t('common:dashboard'),
    },
    {
      key: ROUTES.SUPPLIER_REGISTRATION,
      icon: <IconAtom name="userGroup" />,
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

  const [collapsed, setCollapsed] = React.useState(false);

  const handleCollapse = () => {
    setCollapsed(!collapsed);
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
