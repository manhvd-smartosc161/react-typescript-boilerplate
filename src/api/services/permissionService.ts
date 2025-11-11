import { PERMISSION_ENDPOINT } from '@src/constants/permission';
import apiClient from '..';
import { PermissionItem } from '@src/types/permission';

export const permissionService = {
  getAllPermissions: async (): Promise<PermissionItem[]> => {
    try {
      const response = await apiClient.get(PERMISSION_ENDPOINT.GET_ALL);
      return response.data.items;
    } catch (error: any) {
      throw error;
    }
  },
};
