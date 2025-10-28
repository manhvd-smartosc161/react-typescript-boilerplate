import { useMutation } from '@tanstack/react-query';
import { supplierService } from '@src/api/services';
import { SupplierRegistrationFormValues } from '@src/types/supplier';
import { getErrorMessage } from '@src/errors';
import { toast } from 'react-toastify';

interface UpdateSupplierParams {
  id: string;
  data: SupplierRegistrationFormValues;
}

export const useUpdateSupplierMutation = () => {
  return useMutation({
    mutationFn: ({ id, data }: UpdateSupplierParams) => {
      return supplierService.updateSupplier(id, data);
    },
    onSuccess: () => {
      toast.success('Save draft successfully!');
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(message || 'Failed to save draft!');
    },
  });
};
