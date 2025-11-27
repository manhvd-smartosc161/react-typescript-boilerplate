import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { LoginFormOrganism } from '@src/components';
import { isAuthenticatedState } from '@src/stores';
import ROUTES from '@src/routes/route';
import { EUserRole } from '@src/constants/auth';

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = useRecoilValue(isAuthenticatedState);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.HOME, { replace: true });
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const oneLoginToken =
      urlParams.get('token') || urlParams.get('onelogin_token');
    const userRole = urlParams.get('role');

    if (oneLoginToken && userRole === EUserRole.BUYER) {
    }
  }, [isAuthenticated, navigate]);

  return <LoginFormOrganism />;
};

export default LoginPage;
