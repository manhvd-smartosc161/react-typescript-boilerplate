import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isAuthenticatedState } from '@src/store/auth';
import routes from '@src/routes/route';

interface PublicRouteProps {
  children: ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const isAuthenticated = useRecoilValue(isAuthenticatedState);

  if (isAuthenticated) {
    return <Navigate to={routes.HOME} replace />;
  }

  return <>{children}</>;
};
