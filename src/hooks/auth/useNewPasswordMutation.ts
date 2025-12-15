import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { authService, NewPasswordRequest } from '@src/api/services';
import { ApiError } from '@src/api/ApiError';

export const useNewPasswordMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: NewPasswordRequest) => authService.newPassword(data),
    onSuccess: () => {
      toast.success('Password reset successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    },
    onError: (error: ApiError) => {
      console.error('Reset password error:', error);
    },
  });
};
