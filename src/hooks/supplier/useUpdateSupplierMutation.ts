import { useMutation } from '@tanstack/react-query';
import { supplierService } from '@src/api/services';
import { SupplierRegistrationFormValues } from '@src/types/supplier';

interface UpdateSupplierParams {
  id: string;
  data: SupplierRegistrationFormValues;
}

export const useUpdateSupplierMutation = () => {
  return useMutation({
    mutationFn: ({ id, data }: UpdateSupplierParams) => {
      return supplierService.updateSupplier(id, data);
    },
  });
};
