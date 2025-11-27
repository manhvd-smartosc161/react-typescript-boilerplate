import React, { FC, ReactNode, useEffect, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Sidebar from '@src/components/organisms/Sidebar';
import Header from '@src/components/organisms/Header';
import { isAuthenticatedState, currentUserState } from '@src/stores';
import ROUTES from '@src/routes/route';
import { EUserRole } from '@src/constants/auth';

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
  const currentUser = useRecoilValue(currentUserState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const menuItems = useMemo(() => {
    const iconSize = collapsed ? 20 : 16;
    const userRole = currentUser?.role?.name;

    // Menu items for Supplier
    const supplierMenuItems = [
      {
        key: ROUTES.HOME,
        icon: <IconAtom name="home" size={iconSize} />,
        label: t('common:dashboard'),
      },
      {
        key: ROUTES.SUPPLIER_REGISTRATION,
        icon: <IconAtom name="userGroup" size={iconSize} />,
        label: t('common:partnerRegistration'),
      },
      {
        key: ROUTES.ITEMS,
        icon: <IconAtom name="email" size={iconSize} />,
        label: t('common:itemManagement'),
      },
      {
        key: ROUTES.SETTINGS,
        icon: <IconAtom name="settings" size={iconSize} />,
        label: t('common:settings'),
      },
    ];

    // Menu items for Buyer
    const buyerMenuItems = [
      {
        key: ROUTES.HOME,
        icon: <IconAtom name="home" size={iconSize} />,
        label: t('common:dashboard'),
      },
      {
        key: ROUTES.LEADS,
        icon: <IconAtom name="lead" size={iconSize} />,
        label: t('common:leads'),
      },
      {
        key: ROUTES.EMAIL_SETTINGS,
        icon: <IconAtom name="email" size={iconSize} />,
        label: t('common:emailSettings'),
      },
      {
        key: ROUTES.CONTRACTS,
        icon: <IconAtom name="contract" size={iconSize} />,
        label: t('common:contracts'),
      },
      {
        key: ROUTES.ROLES_PERMISSION,
        icon: <IconAtom name="rolePermission" size={iconSize} />,
        label: t('common:rolesPermission'),
      },
      {
        key: ROUTES.USERS,
        icon: <IconAtom name="user" size={iconSize} />,
        label: t('common:userManagement'),
      },
      {
        key: ROUTES.ITEMS,
        icon: <IconAtom name="email" size={iconSize} />,
        label: t('common:itemManagement'),
      },
      {
        key: ROUTES.AUDIT_LOGS,
        icon: <IconAtom name="article" size={iconSize} />,
        label: t('common:auditLogs'),
      },
      {
        key: ROUTES.SETTINGS,
        icon: <IconAtom name="settings" size={iconSize} />,
        label: t('common:settings'),
      },
    ];

    if (
      userRole === EUserRole.SUPPLIER ||
      (!userRole && currentUser?.registrationId)
    ) {
      return supplierMenuItems;
    } else if (userRole === EUserRole.BUYER) {
      return buyerMenuItems;
    }
    // Default: show all items if role is not set
    return buyerMenuItems;
  }, [currentUser?.role, collapsed, t]);

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
