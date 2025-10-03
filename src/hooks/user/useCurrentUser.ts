import { useQuery } from '@tanstack/react-query';
import { authService } from '@src/api/services/authService';
import { authKeys } from '@src/constants';

export const useCurrentUser = () => {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: () => {
      return authService.getCurrentUser();
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
