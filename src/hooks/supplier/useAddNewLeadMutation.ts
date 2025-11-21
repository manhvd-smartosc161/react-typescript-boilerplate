import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { PaginatedResponse, SupplierInfoItem } from '@src/types';

const prependLeadItem = (
  prev: PaginatedResponse<SupplierInfoItem>,
  created: SupplierInfoItem,
): PaginatedResponse<SupplierInfoItem> => {
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
export const useAddNewLeadMutation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (newSupplier: SupplierInfoItem) => newSupplier,

    onSuccess: (newSupplier) => {
      qc.setQueriesData<PaginatedResponse<SupplierInfoItem>>(
        { queryKey: ['suppliersSearch'] },
        (oldData) => {
          if (!oldData) return oldData;
          return prependLeadItem(oldData, newSupplier);
        },
      );
      toast.success('Add lead successfully!');
    },
  });
};
