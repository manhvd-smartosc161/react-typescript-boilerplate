import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import {
  authService,
  LoginRequest,
  RegisterRequest,
} from '@src/api/services/authService';
import { authState, saveAuthState } from '@src/store/auth';
import { authKeys } from '@src/constants';

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

      saveAuthState(newAuthState);

      toast.success('Login successful! Redirecting...');
      setTimeout(() => navigate('/'), 800);
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Login failed! Please try again.';
      toast.error(errorMessage);
    },
  });
};

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

export const useCurrentUser = () => {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: () => {
      return authService.getCurrentUser();
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
