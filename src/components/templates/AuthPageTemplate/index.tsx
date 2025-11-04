import { FC, ReactNode } from 'react';
import { BreadcrumbMolecule } from '@src/components/molecules';
import ROUTES from '@src/routes/route';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IconAtom } from '@src/components/atoms';
import { StyledBreadcrumbItem } from './index.styled';
import { BreadcrumbItem } from '@src/components/molecules/Breadcrumb';

interface AuthPageTemplateProps {
  children: ReactNode;
}

const AuthPageTemplate: FC<AuthPageTemplateProps> = ({ children }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const getBreadcrumbItems = (): BreadcrumbItem[] => {
    const breadcrumbItems = [
      {
        title: (
          <StyledBreadcrumbItem>
            <IconAtom name="home" />
            <span>{t('common:home')}</span>
          </StyledBreadcrumbItem>
        ),
        onClick: () => navigate(ROUTES.HOME),
      },
    ];

    const getCurrentPageTitle = () => {
      switch (location.pathname) {
        case ROUTES.LEADS:
          return <>{t('common:leadsManagement')}</>;
        case ROUTES.SETTINGS:
          return <>{t('common:settings')}</>;
        case ROUTES.SUPPLIER_REGISTRATION:
          return <>{t('common:partnerRegistration')}</>;
        case ROUTES.AUDIT_LOGS:
          return <>{t('common:auditLogs')}</>;
        case ROUTES.EMAIL_SETTINGS:
          return <>{t('common:emailSettings')}</>;
        case ROUTES.CONTRACTS:
          return <>{t('common:contracts')}</>;
        default:
          return <>{t('common:dashboard')}</>;
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
      <BreadcrumbMolecule items={getBreadcrumbItems()} />
      {children}
    </>
  );
};

export default AuthPageTemplate;
