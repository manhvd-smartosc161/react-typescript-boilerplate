import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { userService } from '@src/api/services';
import {
  BulkUpdateUserStatus,
  PaginatedResponse,
  UserRolesItem,
} from '@src/types';
import { getErrorMessage } from '@src/errors';
export const useBulkUpdateUserStatusMutation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: BulkUpdateUserStatus) => {
      return userService.bulkUpdateStatus(data);
    },
    onMutate: async (data: BulkUpdateUserStatus) => {
      await qc.cancelQueries({ queryKey: ['roleQuery'] });

      const snapshots = qc.getQueriesData<PaginatedResponse<UserRolesItem>>({
        queryKey: ['userSearch'],
      });

      snapshots.forEach(([key, old]) => {
        if (!old) return;
        const updated = {
          ...old,
          items: old.items.map((item) =>
            data.userIds.includes(item.id)
              ? {
                  ...item,
                  status: data.status,
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
