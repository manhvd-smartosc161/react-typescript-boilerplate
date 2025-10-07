import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
  authService,
  ResetPasswordRequest,
} from '@src/api/services/authService';
import { AuthError } from '@src/api/services/authService';

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
