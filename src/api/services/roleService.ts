import {
  PaginatedResponse,
  RolePermissionItem,
  SearchParams,
  RoleDetailData,
  BulkUpdateRole,
} from '@src/types';
import apiClient from '..';
import { ROLE_ENDPOINT } from '@src/constants';

export const roleService = {
  getList: async (
    searchParams: SearchParams,
  ): Promise<PaginatedResponse<RolePermissionItem>> => {
    try {
      const response = await apiClient.get(ROLE_ENDPOINT.GET_LIST, {
        params: searchParams,
      });
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
  update: async (id: string, data: RoleDetailData) => {
    try {
      const response = await apiClient.put(ROLE_ENDPOINT.UPDATE(id), data);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
  create: async (data: RoleDetailData) => {
    try {
      const response = await apiClient.post(ROLE_ENDPOINT.CREATE, data);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
  bulkUpdate: async (params: BulkUpdateRole) => {
    try {
      const response = await apiClient.put(ROLE_ENDPOINT.BULK_UPDATE, params);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
  getAll: async (): Promise<RolePermissionItem[]> => {
    try {
      const response = await apiClient.get(ROLE_ENDPOINT.GET_ALL);
      return response.data.roles;
    } catch (error: any) {
      throw error;
    }
  },
};
