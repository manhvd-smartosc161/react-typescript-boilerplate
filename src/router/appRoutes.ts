import { lazy } from 'react';
import routes from '@src/constants/route';

// Lazy load all page components for code splitting
const Home = lazy(() => import('@src/pages/Home'));
const CustomerTasks = lazy(() => import('@src/pages/CustomerTasks'));
const Overview = lazy(() => import('@src/pages/Overview'));
const Login = lazy(() => import('@src/pages/Login'));
const Reports = lazy(() => import('@src/pages/Reports'));
const Settings = lazy(() => import('@src/pages/Settings'));
const General = lazy(() => import('@src/pages/General'));
const Customers = lazy(() => import('@src/pages/Customers'));
const Tasks = lazy(() => import('@src/pages/Tasks'));
const Transactions = lazy(() => import('@src/pages/Transactions'));
const Accounts = lazy(() => import('@src/pages/Accounts'));
const AuditLogs = lazy(() => import('@src/pages/AuditLogs'));
const RiskManagement = lazy(() => import('@src/pages/RiskManagement'));
const FraudDetection = lazy(() => import('@src/pages/FraudDetection'));
const NotFound = lazy(() => import('@src/pages/NotFound'));

export default [
  {
    path: routes.LOGIN,
    component: Login,
    exact: true,
    restricted: true,
    isPrivate: false,
  },
  {
    path: routes.CUSTOMER_TASKS,
    component: CustomerTasks,
    exact: true,
    restricted: true,
    isPrivate: false,
  },
  {
    path: routes.HOME,
    component: Home,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: routes.OVERVIEW,
    component: Overview,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: routes.REPORTS,
    component: Reports,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: routes.SETTINGS,
    component: Settings,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: routes.GENERAL,
    component: General,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: routes.CUSTOMERS,
    component: Customers,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: routes.TASKS,
    component: Tasks,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: routes.TRANSACTIONS,
    component: Transactions,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: routes.ACCOUNTS,
    component: Accounts,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: routes.AUDIT_LOGS,
    component: AuditLogs,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: '/risk-management',
    component: RiskManagement,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: '/fraud-detection',
    component: FraudDetection,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: '/404',
    component: NotFound,
    exact: true,
    restricted: false,
    isPrivate: false,
  },
  {
    path: '*',
    component: NotFound,
    exact: false,
    restricted: false,
    isPrivate: false,
  },
];
