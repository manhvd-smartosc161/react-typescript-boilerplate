import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  authService,
  LoginRequest,
  RegisterRequest,
} from '@src/api/services/authService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { authState, saveAuthState } from '@src/store/auth';

// Query keys
export const authKeys = {
  all: ['auth'] as const,
  user: () => [...authKeys.all, 'user'] as const,
};

// Custom hook for login mutation
export const useLoginMutation = () => {
  const setAuthState = useSetRecoilState(authState);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (credentials: LoginRequest) => {
      return authService.login(credentials);
    },
    onSuccess: (data) => {
      // Create auth state with response from service
      const newAuthState = {
        isAuthenticated: true,
        user: data.user,
        token: data.token,
      };

      // Update Recoil state
      setAuthState(newAuthState);

      // Save to localStorage
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

// Custom hook for register mutation
export const useRegisterMutation = () => {
  const setAuthState = useSetRecoilState(authState);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (userData: RegisterRequest) => {
      return authService.register(userData);
    },
    onSuccess: (data) => {
      // Create auth state with response from service
      const newAuthState = {
        isAuthenticated: true,
        user: data.user,
        token: data.token,
      };

      // Update Recoil state
      setAuthState(newAuthState);

      // Save to localStorage
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

// Custom hook for logout mutation
export const useLogoutMutation = () => {
  const setAuthState = useSetRecoilState(authState);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return authService.logout();
    },
    onSuccess: () => {
      // Clear auth state
      setAuthState({
        isAuthenticated: false,
        user: null,
        token: null,
      });

      // Clear localStorage
      localStorage.removeItem('authState');

      // Clear all queries
      queryClient.clear();

      navigate('/login');
      toast.success('Logout successful!');
    },
    onError: () => {
      // Even if logout API fails, we still want to logout locally
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

// Hook to get current user info from API
export const useCurrentUser = () => {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: () => {
      return authService.getCurrentUser();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};
