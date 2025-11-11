import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { getErrorMessage } from '@src/errors';
import { roleService } from '@src/api/services';
import {
  PaginatedResponse,
  RoleDetailData,
  RolePermissionItem,
  SearchParams,
} from '@src/types';

const prependRoleItem = (
  prev: PaginatedResponse<RolePermissionItem>,
  created: RolePermissionItem,
): PaginatedResponse<RolePermissionItem> => {
  const {
    items,
    pagination: { perPage, total, currentPage },
  } = prev;

  const limit = perPage || items.length || 10;
  const updatedItems = [created, ...items].slice(0, limit);
  const updatedTotal = total + 1;
  const updatedPagesCount = Math.max(1, Math.ceil(updatedTotal / limit));

  return {
    ...prev,
    items: updatedItems,
    pagination: {
      ...prev.pagination,
      total: updatedTotal,
      pagesCount: updatedPagesCount,
      hasMore: currentPage < updatedPagesCount,
      to: prev.pagination.from + updatedItems.length - 1,
    },
  };
};

export const useCreateRoleMutation = (currentParams: SearchParams) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: RoleDetailData) => {
      return roleService.create(data);
    },
    onSuccess: (newRecord) => {
      const key = ['roleQuery', currentParams];
      const old = qc.getQueryData<PaginatedResponse<RolePermissionItem>>(key);
      if (!old) {
        const perPage = currentParams.limit || 10;
        qc.setQueryData<PaginatedResponse<RolePermissionItem>>(key, {
          items: [newRecord as RolePermissionItem],
          pagination: {
            pagesCount: 1,
            total: 1,
            currentPage: currentParams.page ?? 1,
            perPage,
            from: 1,
            to: 1,
            hasMore: false,
          },
        });
      } else {
        const updated = prependRoleItem(old, newRecord as RolePermissionItem);
        qc.setQueryData<PaginatedResponse<RolePermissionItem>>(key, updated);
      }

      toast.success('Created!');
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(message || 'Failed to save!');
    },
  });
};
