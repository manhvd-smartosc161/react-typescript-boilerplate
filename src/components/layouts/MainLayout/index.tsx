import React, { FC, ReactNode, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
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
import AuthPageTemplate from '@src/components/templates/AuthPageTemplate';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const { t } = useTranslation();
  const isAuthenticated = useRecoilValue(isAuthenticatedState);
  const navigate = useNavigate();

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
      icon: <IconAtom name="home" size={collapsed ? 20 : 16} />,
      label: t('common:dashboard'),
    },
    {
      key: ROUTES.SUPPLIER_REGISTRATION,
      icon: <IconAtom name="userGroup" size={collapsed ? 20 : 16} />,
      label: t('common:partnerRegistration'),
    },
    {
      key: ROUTES.LEADS,
      icon: <IconAtom name="lead" size={collapsed ? 20 : 16} />,
      label: t('common:leads'),
    },
    {
      key: ROUTES.AUDIT_LOGS,
      icon: <IconAtom name="article" size={collapsed ? 20 : 16} />,
      label: t('common:auditLogs'),
    },
    {
      key: ROUTES.SETTINGS,
      icon: <IconAtom name="settings" size={collapsed ? 20 : 16} />,
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

  return (
    <>
      {isAuthenticated && (
        <StyledMainContainer>
          <Header collapsed={collapsed} onMobileToggle={handleMobileToggle} />
          <StyledMainContent component="main">
            <Sidebar
              collapsed={collapsed}
              mobileOpen={mobileOpen}
              menuItems={menuItems}
              onMobileClose={handleMobileClose}
              onToggleCollapse={handleCollapse}
            />
            <StyledContentArea>
              <AuthPageTemplate>{children}</AuthPageTemplate>
            </StyledContentArea>
          </StyledMainContent>
        </StyledMainContainer>
      )}
    </>
  );
};

export default MainLayout;
