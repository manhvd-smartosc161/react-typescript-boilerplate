import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { getErrorMessage } from '@src/errors';
import { roleService } from '@src/api/services';
import {
  BulkUpdateRole,
  PaginatedResponse,
  RolePermissionItem,
} from '@src/types';

export const useBulkUpdateRoleStatusMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (params: BulkUpdateRole) => {
      return roleService.bulkUpdate(params);
    },
    onMutate: async ({ roleIds, status }) => {
      await qc.cancelQueries({ queryKey: ['roleQuery'] });
      const snapshots = qc.getQueriesData<
        PaginatedResponse<RolePermissionItem>
      >({
        queryKey: ['roleQuery'],
      });

      snapshots.forEach(([key, old]) => {
        if (!old) return;
        const next = structuredClone(old);

        next.items = next.items.map((item) =>
          roleIds.includes(item.id) ? { ...item, status } : item,
        );

        qc.setQueryData(key, next);
      });

      return { snapshots };
    },

    onSuccess: () => {
      toast.success('Save successfully!');
    },
    onError: (error, _vars, ctx) => {
      ctx?.snapshots?.forEach(([key, prev]) => qc.setQueryData(key, prev));
      const message = getErrorMessage(error);
      toast.error(message || 'Failed to save!');
    },
  });
};
