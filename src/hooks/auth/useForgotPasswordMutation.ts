import { useMutation } from '@tanstack/react-query';
import { authService, ForgotPasswordRequest } from '@src/api/services';
import { ApiError } from '@src/api/ApiError';

export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) =>
      authService.forgotPassword(data),
    onError: (error: ApiError) => {
      console.error('Forgot password error:', error);
    },
  });
};
