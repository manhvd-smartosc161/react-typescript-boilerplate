import { useQuery } from '@tanstack/react-query';

import { userService } from '@src/api/services';
import { SearchParams } from '@src/types';

export const useGetUsers = (searchParams: SearchParams) => {
  return useQuery({
    queryKey: ['userSearch', searchParams],
    queryFn: () => {
      return userService.getList(searchParams);
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
