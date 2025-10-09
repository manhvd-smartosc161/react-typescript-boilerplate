import { ReactNode, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isAuthenticatedState, authState } from '@src/stores';
import { useCurrentUser } from '@src/hooks/user';
import { tokenService } from '@src/api/services';
import routes from '@src/routes/route';

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isAuthenticated = useRecoilValue(isAuthenticatedState);
  const { error } = useCurrentUser();
  const setAuthState = useSetRecoilState(authState);

  useEffect(() => {
    if (error) {
      setAuthState({
        isAuthenticated: false,
        user: null,
        token: null,
      });
      tokenService.removeToken();
    }
  }, [error, setAuthState]);

  if (!isAuthenticated) {
    return <Navigate to={routes.LOGIN} replace />;
  }

  return <>{children}</>;
};
