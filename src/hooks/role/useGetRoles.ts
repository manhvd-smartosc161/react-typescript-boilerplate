import { useQuery } from '@tanstack/react-query';
import { SearchParams } from '@src/types';
import { roleService } from '@src/api/services/roleService';

export const useGetRoles = (searchParams: SearchParams) => {
  return useQuery({
    queryKey: ['roleQuery', searchParams],
    queryFn: () => {
      return roleService.getList(searchParams);
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
