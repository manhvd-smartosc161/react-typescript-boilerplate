import { useMutation } from '@tanstack/react-query';
import {
  authService,
  ForgotPasswordRequest,
  AuthError,
} from '@src/api/services/authService';

export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) =>
      authService.forgotPassword(data),
    onError: (error: AuthError) => {
      console.error('Forgot password error:', error);
    },
  });
};
