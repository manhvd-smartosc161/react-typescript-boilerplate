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
    const response = await apiClient.get(ROLE_ENDPOINT.GET_LIST, {
      params: searchParams,
    });
    return response.data;
  },
  update: async (id: string, data: RoleDetailData) => {
    const response = await apiClient.put(ROLE_ENDPOINT.UPDATE(id), {
      data,
    });
    return response.data;
  },
  create: async (data: RoleDetailData) => {
    const response = await apiClient.post(ROLE_ENDPOINT.CREATE, data);
    return response.data;
  },
  bulkUpdate: async (params: BulkUpdateRole) => {
    const response = await apiClient.put(ROLE_ENDPOINT.BULK_UPDATE, params);
    return response.data;
  },
};
