import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { authService, tokenService } from '@src/api/services';
import { authState } from '@src/stores';
import ROUTES from '@src/routes/route';

export const useOneClickLoginMutation = () => {
  const setAuthState = useSetRecoilState(authState);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => {
      return authService.oneClickLogin();
    },
    onSuccess: (data) => {
      const newAuthState = {
        isAuthenticated: true,
        user: data.user,
        token: data.token,
      };

      setAuthState(newAuthState);

      // Ensure token is saved (already saved in authService, but save again for consistency)
      tokenService.saveToken(data.token);

      toast.success('OneLogin successful! Redirecting...');
      setTimeout(() => navigate(ROUTES.HOME), 800);
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || 'OneLogin failed. Please try again.',
      );
    },
  });
};
