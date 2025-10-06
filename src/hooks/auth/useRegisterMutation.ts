import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { authService, RegisterRequest } from '@src/api/services/authService';
import { authState } from '@src/store/auth';
import ROUTES from '@src/routes/route';

export const useRegisterMutation = () => {
  const setAuthState = useSetRecoilState(authState);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (userData: RegisterRequest) => {
      return authService.register(userData);
    },
    onSuccess: (data) => {
      const newAuthState = {
        isAuthenticated: false,
        user: data.user,
        token: null,
      };

      setAuthState(newAuthState);

      toast.success('Redirecting to login page...');

      setTimeout(() => {
        navigate(ROUTES.LOGIN);
      }, 1500);
    },
    onError: () => {},
  });
};
