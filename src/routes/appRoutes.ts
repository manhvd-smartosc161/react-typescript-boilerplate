import { lazy } from 'react';
import routes from './route';
import { LayoutType } from '@src/components/layouts';

const Home = lazy(() => import('@src/pages/Home'));
const Login = lazy(() => import('@src/pages/Login'));
const SignUp = lazy(() => import('@src/pages/SignUp'));
const ForgotPassword = lazy(() => import('@src/pages/ForgotPassword'));
const ResetPassword = lazy(() => import('@src/pages/ResetPassword'));
const Settings = lazy(() => import('@src/pages/Settings'));
const Leads = lazy(() => import('@src/pages/Leads'));
const SupplierRegistration = lazy(() => import('@src/pages/RegistrationPage'));
const NotFound = lazy(() => import('@src/pages/Error'));
const ContactUs = lazy(() => import('@src/pages/ContactUs'));
const AuditLogs = lazy(() => import('@src/pages/AuditLogs'));
const EmailSettings = lazy(() => import('@src/pages/EmailSettings'));
const Contracts = lazy(() => import('@src/pages/Contracts'));
const UserManagement = lazy(() => import('@src/pages/UserMangement'));
const RolesPermission = lazy(() => import('@src/pages/RolesPermission'));
const ItemManagement = lazy(() => import('@src/pages/ItemManagement'));

export interface AppRoute {
  path: string;
  component: React.ComponentType;
  exact?: boolean;
  restricted?: boolean;
  isPrivate?: boolean;
  layout?: LayoutType;
}

export default [
  {
    path: routes.LOGIN,
    component: Login,
    restricted: true,
    isPrivate: false,
    layout: 'auth',
  },
  {
    path: routes.SIGNUP,
    component: SignUp,
    restricted: true,
    isPrivate: false,
    layout: 'auth',
  },
  {
    path: routes.FORGOT_PASSWORD,
    component: ForgotPassword,
    restricted: true,
    isPrivate: false,
    layout: 'auth',
  },
  {
    path: routes.RESET_PASSWORD,
    component: ResetPassword,
    restricted: true,
    isPrivate: false,
    layout: 'auth',
  },
  {
    path: routes.HOME,
    component: Home,
    restricted: false,
    isPrivate: true,
    layout: 'main',
  },
  {
    path: routes.SETTINGS,
    component: Settings,
    restricted: false,
    isPrivate: true,
    layout: 'main',
  },
  {
    path: routes.LEADS,
    component: Leads,
    restricted: false,
    isPrivate: true,
    layout: 'main',
  },
  {
    path: routes.CONTACT_US,
    component: ContactUs,
    restricted: false,
    isPrivate: true,
    layout: 'main',
  },
  {
    path: routes.USERS,
    component: UserManagement,
    restricted: false,
    isPrivate: true,
    layout: 'main',
  },
  {
    path: '/404',
    component: NotFound,
    restricted: false,
    isPrivate: false,
    layout: 'none',
  },
  {
    path: '*',
    component: NotFound,
    restricted: false,
    isPrivate: false,
    layout: 'none',
  },
  {
    path: routes.SUPPLIER_REGISTRATION,
    component: SupplierRegistration,
    restricted: false,
    isPrivate: true,
    layout: 'main',
  },
  {
    path: routes.AUDIT_LOGS,
    component: AuditLogs,
    restricted: false,
    isPrivate: true,
    layout: 'main',
  },
  {
    path: routes.EMAIL_SETTINGS,
    component: EmailSettings,
    restricted: false,
    isPrivate: true,
    layout: 'main',
  },
  {
    path: routes.CONTRACTS,
    component: Contracts,
    restricted: false,
    isPrivate: true,
    layout: 'main',
  },
  {
    path: routes.ROLES_PERMISSION,
    component: RolesPermission,
    restricted: false,
    isPrivate: true,
    layout: 'main',
  },
  {
    path: routes.ITEMS,
    component: ItemManagement,
    restricted: false,
    isPrivate: true,
    layout: 'main',
  },
] as AppRoute[];
