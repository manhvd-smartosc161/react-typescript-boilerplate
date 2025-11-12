import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { userService } from '@src/api/services';
import {
  PaginatedResponse,
  RolePermissionItem,
  UserRoleFormData,
  UserRolesItem,
} from '@src/types';
import { getErrorMessage } from '@src/errors';
export const useUpdateUserMutation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: UserRoleFormData) => {
      return userService.update(data.id, data);
    },
    onMutate: async (data: UserRoleFormData) => {
      await qc.cancelQueries({ queryKey: ['roleQuery'] });

      const snapshots = qc.getQueriesData<PaginatedResponse<UserRolesItem>>({
        queryKey: ['userSearch'],
      });
      const allRoles = qc.getQueryData<RolePermissionItem[]>(['allRoles']);

      snapshots.forEach(([key, old]) => {
        if (!old) return;
        const updated = {
          ...old,
          items: old.items.map((item) =>
            item.id === data.id
              ? {
                  ...item,
                  ...data,
                  role: allRoles?.find((el) => el.id === data.roleId),
                }
              : item,
          ),
        };
        qc.setQueryData(key, updated);
      });

      return { snapshots };
    },
    onSuccess: () => {
      toast.success('Save successfully!');
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(message || 'Failed to save!');
    },
  });
};
