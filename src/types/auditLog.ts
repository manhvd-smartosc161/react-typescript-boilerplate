import { PaginatedResponse } from './api';

export interface AuditLog {
  id: number;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  menu: string;
  details: string;
  userEmail?: string;
  userId?: string;
}

export interface AuditLogItem {
  id: number;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  menu: string;
  details: string;
}

export interface AuditLogSearchParams {
  page?: number;
  limit?: number;
  keyword?: string;
  userEmail?: string;
  action?: string;
  menu?: string;
  userId?: string;
  startDate?: string;
  endDate?: string;
  orderBy?: string;
  order?: 'asc' | 'desc';
}

export type AuditLogsResponse = PaginatedResponse<AuditLog>;
