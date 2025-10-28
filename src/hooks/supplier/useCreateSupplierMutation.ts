import { useMutation } from '@tanstack/react-query';
import { supplierService } from '@src/api/services';
import { toast } from 'react-toastify';

export const useCreateSupplierMutation = () => {
  return useMutation({
    mutationFn: () => {
      return supplierService.createSupplier();
    },
    onError: () => {
      toast.error('Failed to create supplier!');
    },
  });
};
