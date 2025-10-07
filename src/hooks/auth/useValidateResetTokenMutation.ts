import { useMutation } from '@tanstack/react-query';
import { authService } from '@src/api/services/authService';
import {
  ValidateResetTokenRequest,
  ValidateResetTokenResponse,
} from '@src/types';

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
