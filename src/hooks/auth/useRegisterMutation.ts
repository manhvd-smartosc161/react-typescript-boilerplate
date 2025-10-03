import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { authService, RegisterRequest } from '@src/api/services/authService';
import { authState, saveAuthState } from '@src/store/auth';

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

      saveAuthState(newAuthState);

      toast.success('Registration successful! Redirecting...');
      setTimeout(() => navigate('/'), 800);
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Registration failed! Please try again.';
      toast.error(errorMessage);
    },
  });
};
