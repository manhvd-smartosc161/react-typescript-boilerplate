import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { getErrorMessage } from '@src/errors';
import { roleService } from '@src/api/services/roleService';
import {
  PaginatedResponse,
  RoleDetailData,
  RolePermissionItem,
} from '@src/types';

interface UpdateRoleParams {
  id: string;
  data: RoleDetailData;
}

const clone = <T>(v: T): T => JSON.parse(JSON.stringify(v));

function replaceItemById(
  list: PaginatedResponse<RolePermissionItem>,
  id: string,
  patch: Partial<RolePermissionItem>,
): PaginatedResponse<RolePermissionItem> {
  const idx = list.items.findIndex((r) => r.id === id);
  if (idx === -1) return list;
  const next = clone(list);
  next.items[idx] = { ...next.items[idx], ...patch };
  return next;
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
        const updated = replaceItemById(
          old,
          id,
          data as Partial<RolePermissionItem>,
        );
        if (updated !== old) qc.setQueryData(key, updated);
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
