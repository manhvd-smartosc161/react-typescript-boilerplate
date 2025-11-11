import { useQuery } from '@tanstack/react-query';
import { permissionService } from '@src/api/services';

export const useGetAllPermissions = () => {
  return useQuery({
    queryKey: ['allPermissions'],
    queryFn: () => {
      return permissionService.getAllPermissions();
    },
    staleTime: 5 * 60 * 1000,
    retry: (failureCount, error: any) => {
      if (error?.status === 404 || error?.code === 404) {
        return false;
      }
      return failureCount < 3;
    },
  });
};
