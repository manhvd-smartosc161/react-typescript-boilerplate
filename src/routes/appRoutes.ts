import { lazy } from 'react';
import routes from './route';
import { LayoutType } from '@src/components/layouts';

const Home = lazy(() => import('@src/pages/Home'));
const Login = lazy(() => import('@src/pages/Login'));
const SignUp = lazy(() => import('@src/pages/SignUp'));
const ForgotPassword = lazy(() => import('@src/pages/ForgotPassword'));
const ResetPassword = lazy(() => import('@src/pages/ResetPassword'));
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
] as AppRoute[];
