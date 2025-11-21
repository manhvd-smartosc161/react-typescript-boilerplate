import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { authService, tokenService, RegisterRequest } from '@src/api/services';
import { authState } from '@src/stores';

export const useRegisterMutation = () => {
  const setAuthState = useSetRecoilState(authState);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (userData: RegisterRequest) => {
      return authService.register(userData);
    },
    onSuccess: (data) => {
      const newAuthState = {
        isAuthenticated: true,
        user: data.user,
        token: data.token,
      };

      setAuthState(newAuthState);

      tokenService.saveToken(data.token);

      toast.success('Registration successful! Redirecting...');
      setTimeout(() => navigate('/'), 800);
    },
    onError: () => {},
  });
};
