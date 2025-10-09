import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { authService, tokenService, LoginRequest } from '@src/api/services';
import { authState } from '@src/stores';

export const useLoginMutation = () => {
  const setAuthState = useSetRecoilState(authState);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (credentials: LoginRequest) => {
      return authService.login(credentials);
    },
    onSuccess: (data) => {
      const newAuthState = {
        isAuthenticated: true,
        user: data.user,
        token: data.token,
      };

      setAuthState(newAuthState);

      tokenService.saveToken(data.token);

      toast.success('Login successful! Redirecting...');
      setTimeout(() => navigate('/'), 800);
    },
    onError: () => {},
  });
};
