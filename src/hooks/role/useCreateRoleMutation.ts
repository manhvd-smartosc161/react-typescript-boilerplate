import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { getErrorMessage } from '@src/errors';
import { roleService } from '@src/api/services/roleService';
import {
  PaginatedResponse,
  RoleDetailData,
  RolePermissionItem,
  SearchParams,
} from '@src/types';

const clone = <T>(v: T): T => JSON.parse(JSON.stringify(v));

function prependItemAndAdjust(
  list: PaginatedResponse<RolePermissionItem>,
  created: RolePermissionItem,
): PaginatedResponse<RolePermissionItem> {
  const perPage =
    list.pagination.perPage || list.pagination.limit || list.items.length || 10;
  const next = clone(list);
  next.items = [created, ...next.items].slice(0, perPage);

  const nextTotal = (list.pagination.total ?? 0) + 1;
  next.pagination.total = nextTotal;
  next.pagination.pagesCount = Math.max(1, Math.ceil(nextTotal / perPage));
  next.pagination.to = next.pagination.from + next.items.length - 1;
  next.pagination.hasMore =
    next.pagination.currentPage < next.pagination.pagesCount;

  return next;
}

export const useCreateRoleMutation = (currentParams: SearchParams) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: RoleDetailData) => {
      return roleService.create(data);
    },
    onSuccess: (created) => {
      const key = ['roleQuery', currentParams];
      const old = qc.getQueryData<PaginatedResponse<RolePermissionItem>>(key);
      if (!old) {
        const perPage = currentParams.limit || 10;
        qc.setQueryData<PaginatedResponse<RolePermissionItem>>(key, {
          items: [created as RolePermissionItem],
          pagination: {
            pagesCount: 1,
            total: 1,
            currentPage: currentParams.page ?? 1,
            perPage,
            from: 1,
            to: 1,
            limit: perPage,
            hasMore: false,
          },
        });
      } else {
        qc.setQueryData<PaginatedResponse<RolePermissionItem>>(
          key,
          prependItemAndAdjust(old, created as RolePermissionItem),
        );
      }

      toast.success('Created!');
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(message || 'Failed to save!');
    },
  });
};
