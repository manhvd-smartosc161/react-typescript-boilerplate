import { useQuery } from '@tanstack/react-query';
import { roleService } from '@src/api/services';

export const useGetAllRoles = () => {
  return useQuery({
    queryKey: ['allRoles'],
    queryFn: () => {
      return roleService.getAll();
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
