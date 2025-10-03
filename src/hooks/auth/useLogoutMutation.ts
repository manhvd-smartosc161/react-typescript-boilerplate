import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { useQueryClient } from '@tanstack/react-query';
import { authService } from '@src/api/services/authService';
import { authState } from '@src/store/auth';

export const useLogoutMutation = () => {
  const setAuthState = useSetRecoilState(authState);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return authService.logout();
    },
    onSuccess: () => {
      setAuthState({
        isAuthenticated: false,
        user: null,
        token: null,
      });

      localStorage.removeItem('authState');

      queryClient.clear();

      navigate('/login');
      toast.success('Logout successful!');
    },
    onError: () => {
      setAuthState({
        isAuthenticated: false,
        user: null,
        token: null,
      });

      localStorage.removeItem('authState');
      queryClient.clear();

      navigate('/login');
      toast.success('Logout successful!');
    },
  });
};
