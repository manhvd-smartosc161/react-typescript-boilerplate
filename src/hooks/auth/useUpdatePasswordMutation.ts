import { useMutation } from '@tanstack/react-query';
import { authService } from '@src/api/services/authService';

export interface UpdatePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const useUpdatePasswordMutation = () => {
  return useMutation({
    mutationFn: (data: UpdatePasswordRequest) =>
      authService.updatePassword(data),
  });
};
