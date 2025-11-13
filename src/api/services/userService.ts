import {
  BulkUpdateResponse,
  BulkUpdateUserStatus,
  PaginatedResponse,
  SearchParams,
  UserRoleFormData,
  UserRolesItem,
} from '@src/types';
import apiClient from '..';
import { USER_ENDPOINT } from '@src/constants';
import { camelToSnake } from '@src/utils/snakeCase';

export const userService = {
  getList: async (
    searchParams: SearchParams,
  ): Promise<PaginatedResponse<UserRolesItem>> => {
    try {
      const params = {
        ...searchParams,
        sortBy: camelToSnake(searchParams.sortBy || ''),
      };
      const response = await apiClient.get(USER_ENDPOINT.GET_LIST, {
        params,
      });
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
  update: async (id: string, data: UserRoleFormData) => {
    try {
      const response = await apiClient.put(USER_ENDPOINT.UPDATE(id), data);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  bulkUpdateStatus: async (
    data: BulkUpdateUserStatus,
  ): Promise<BulkUpdateResponse> => {
    try {
      const response = await apiClient.put(
        USER_ENDPOINT.BULK_UPDATE_STATUS,
        data,
      );
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
};
