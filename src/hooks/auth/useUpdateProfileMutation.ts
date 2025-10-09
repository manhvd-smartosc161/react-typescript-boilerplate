import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '@src/api/services/authService';
import { authKeys } from '@src/constants';

export interface UpdateProfileRequest {
  name: string;
  surname: string;
  language: string;
  avatar?: File | null;
}

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileRequest) =>
      authService.updateUserProfile(data),
    onSuccess: () => {
      // Invalidate user query to refetch updated data
      queryClient.invalidateQueries({ queryKey: authKeys.user() });
    },
  });
};
