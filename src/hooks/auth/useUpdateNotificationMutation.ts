import { useMutation } from '@tanstack/react-query';
import { authService } from '@src/api/services/authService';

export interface UpdateNotificationRequest {
  emailNotifications: boolean;
  marketingNotifications: boolean;
}

export const useUpdateNotificationMutation = () => {
  return useMutation({
    mutationFn: (data: UpdateNotificationRequest) =>
      authService.updateNotificationSettings(data),
  });
};
