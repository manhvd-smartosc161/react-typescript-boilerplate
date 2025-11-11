import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { getErrorMessage } from '@src/errors';
import { roleService } from '@src/api/services';
import {
  PaginatedResponse,
  RoleDetailData,
  RolePermissionItem,
} from '@src/types';

interface UpdateRoleParams {
  id: string;
  data: RoleDetailData;
}

export const useUpdateRoleMutation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateRoleParams) => {
      return roleService.update(id, data);
    },
    onMutate: async ({ id, data }) => {
      await qc.cancelQueries({ queryKey: ['roleQuery'] });

      const snapshots = qc.getQueriesData<
        PaginatedResponse<RolePermissionItem>
      >({
        queryKey: ['roleQuery'],
      });

      snapshots.forEach(([key, old]) => {
        if (!old) return;
        const updated = {
          ...old,
          items: old.items.map((item) =>
            item.id === id ? { ...item, ...data } : item,
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
