import { useMutation } from '@tanstack/react-query';
import { supplierService } from '@src/api/services';

export const useCreateSupplierMutation = () => {
  return useMutation({
    mutationFn: () => {
      return supplierService.createSupplier();
    },
  });
};
