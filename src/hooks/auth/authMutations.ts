import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import {
  authService,
  tokenService,
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  AuthError,
} from '@src/api/services/authService';
import { authState, saveAuthState } from '@src/store/auth';
import ROUTES from '@src/routes/route';
import {
  ValidateResetTokenRequest,
  ValidateResetTokenResponse,
} from '@src/types';

// Login Mutation
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

      saveAuthState(newAuthState);

      toast.success('Login successful! Redirecting...');
      setTimeout(() => navigate('/'), 800);
    },
    onError: () => {},
  });
};

// Register Mutation
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

// Logout Mutation
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
      saveAuthState(newAuthState);

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
      saveAuthState(newAuthState);

      tokenService.removeToken();

      queryClient.clear();

      navigate(ROUTES.LOGIN);
      toast.success('Logout successful!');
    },
  });
};

// Forgot Password Mutation
export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) =>
      authService.forgotPassword(data),
    onError: (error: AuthError) => {
      console.error('Forgot password error:', error);
    },
  });
};

// Reset Password Mutation
export const useResetPasswordMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: ResetPasswordRequest) => authService.resetPassword(data),
    onSuccess: () => {
      toast.success('Password reset successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    },
    onError: (error: AuthError) => {
      console.error('Reset password error:', error);
    },
  });
};

// Validate Reset Token Mutation
export const useValidateResetTokenMutation = () => {
  return useMutation<
    ValidateResetTokenResponse,
    Error,
    ValidateResetTokenRequest
  >({
    mutationFn: (data: ValidateResetTokenRequest) =>
      authService.validateResetToken(data),
  });
};
