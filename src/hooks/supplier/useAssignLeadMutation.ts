import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { PaginatedResponse, SupplierInfoItem } from '@src/types';

export const useAssignLeadMutation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (newSupplier: SupplierInfoItem) => newSupplier,

    onSuccess: (newSupplier) => {
      qc.setQueriesData<PaginatedResponse<SupplierInfoItem>>(
        { queryKey: ['suppliersSearch'] },
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            items: oldData.items.map((el) =>
              el.id === newSupplier.id ? { ...el, isAssigned: true } : el,
            ),
          };
        },
      );
      toast.success('Lead has been assigned successfully!');
    },
  });
};
