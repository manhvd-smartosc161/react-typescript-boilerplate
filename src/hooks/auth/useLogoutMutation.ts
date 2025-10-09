import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { authService, tokenService } from '@src/api/services';
import { authState } from '@src/stores';
import ROUTES from '@src/routes/route';

export const useLogoutMutation = () => {
  const setAuthState = useSetRecoilState(authState);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return authService.logout();
    },
    onSuccess: () => {
      const newAuthState = {
        isAuthenticated: false,
        user: null,
        token: null,
      };

      setAuthState(newAuthState);

      tokenService.removeToken();

      queryClient.clear();

      navigate(ROUTES.LOGIN);
      toast.success('Logout successful!');
    },
    onError: () => {
      const newAuthState = {
        isAuthenticated: false,
        user: null,
        token: null,
      };

      setAuthState(newAuthState);

      tokenService.removeToken();

      queryClient.clear();

      navigate(ROUTES.LOGIN);
      toast.success('Logout successful!');
    },
  });
};
