import apiClient from '../index';
import { AUDIT_LOG_ENDPOINT } from '@src/constants';
import { AuditLogSearchParams, AuditLogsResponse } from '@src/types/auditLog';

export const auditLogService = {
  getAuditLogs: async (
    searchParams: AuditLogSearchParams,
  ): Promise<AuditLogsResponse> => {
    try {
      const response = await apiClient.get(AUDIT_LOG_ENDPOINT.GET_LOGS, {
        params: searchParams,
      });
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
};
