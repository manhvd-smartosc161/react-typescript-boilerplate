import { useQuery } from '@tanstack/react-query';
import { auditLogService } from '@src/api/services';
import { AuditLogSearchParams } from '@src/types/auditLog';

export const useGetAuditLogs = (searchParams: AuditLogSearchParams) => {
  return useQuery({
    queryKey: ['auditLogs', searchParams],
    queryFn: () => {
      return auditLogService.getAuditLogs(searchParams);
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
