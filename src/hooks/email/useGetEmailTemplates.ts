import { useQuery } from '@tanstack/react-query';
import { emailService } from '@src/api/services';
import { SearchParams } from '@src/types';

export const useGetEmailTemplates = (searchParams: SearchParams) => {
  return useQuery({
    queryKey: ['emailTemplates', searchParams],
    queryFn: () => {
      return emailService.getEmailTemplates(searchParams);
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
