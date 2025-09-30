import { lazy } from 'react';
import routes from '@src/constants/route';

// Lazy load only necessary pages
const Home = lazy(() => import('@src/pages/Home'));
const Login = lazy(() => import('@src/pages/Login'));
const Settings = lazy(() => import('@src/pages/Settings'));
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
    path: routes.HOME,
    component: Home,
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
