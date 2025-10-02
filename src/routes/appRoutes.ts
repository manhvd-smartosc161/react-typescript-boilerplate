import { lazy } from 'react';
import routes from './route';
import { LayoutType } from '@src/components/layouts';

// Lazy load components for better performance
const Home = lazy(() => import('@src/pages/Home'));
const Login = lazy(() => import('@src/pages/Login'));
const Settings = lazy(() => import('@src/pages/System'));
const NotFound = lazy(() => import('@src/pages/Error'));

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
    path: '/404',
    component: NotFound,
    restricted: false,
    isPrivate: false,
    layout: 'none',
  },
  // Catch-all route must be last to avoid matching other routes
  {
    path: '*',
    component: NotFound,
    restricted: false,
    isPrivate: false,
    layout: 'none',
  },
] as AppRoute[];
