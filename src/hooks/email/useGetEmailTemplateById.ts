import { useQuery } from '@tanstack/react-query';
import { emailService } from '@src/api/services';

export const useGetEmailTemplateById = (id: string | undefined) => {
  return useQuery({
    queryKey: ['emailTemplate', id],
    queryFn: () => emailService.getEmailTemplateById(id!),
    enabled: Boolean(id),
    staleTime: 5 * 60 * 1000,
    retry: (failureCount, error: any) => {
      if (error?.status === 404 || error?.code === 404) {
        return false;
      }
      return failureCount < 3;
    },
  });
};
