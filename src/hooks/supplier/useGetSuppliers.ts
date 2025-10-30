import { useQuery } from '@tanstack/react-query';

import { supplierService } from '@src/api/services';
import { SearchParams } from '@src/types';

export const useGetSuppliers = (searchParams: SearchParams) => {
  return useQuery({
    queryKey: ['suppliersSearch', searchParams],
    queryFn: () => {
      return supplierService.getSuppliers(searchParams);
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
