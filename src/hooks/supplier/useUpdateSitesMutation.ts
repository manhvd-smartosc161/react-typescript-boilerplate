import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
  supplierService,
  UpdateSitesResponse,
} from '@src/api/services/supplierService';
import { ApiError } from '@src/api/ApiError';
import { SupplierSite } from '@src/types/supplier';

export interface UpdateSitesRequest {
  registrationId: string;
  sites: SupplierSite[];
}

export const useUpdateSitesMutation = () => {
  return useMutation<UpdateSitesResponse, ApiError, UpdateSitesRequest>({
    mutationFn: async ({ registrationId, sites }) => {
      try {
        return await supplierService.updateSites(registrationId, sites);
      } catch (error: any) {
        throw error;
      }
    },
    onSuccess: () => {
      toast.success('Sites updated successfully!');
    },
    onError: (error) => {
      console.error('Failed to update sites:', error);
    },
  });
};
