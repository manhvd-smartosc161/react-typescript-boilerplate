import { useQuery } from '@tanstack/react-query';
import { supplierService } from '@src/api/services';

export const useGetSupplierById = (id: string | undefined) => {
  return useQuery({
    queryKey: ['supplier', id],
    queryFn: () => supplierService.getSupplierById(id!),
    enabled: Boolean(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error: any) => {
      if (error?.status === 404 || error?.code === 404) {
        return false;
      }
      return failureCount < 3;
    },
  });
};
