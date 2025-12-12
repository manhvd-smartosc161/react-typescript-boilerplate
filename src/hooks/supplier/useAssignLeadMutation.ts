import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
  AssignmentLeadFormData,
  PaginatedResponse,
  SupplierInfoItem,
} from '@src/types';
import { workflowsService } from '@src/api/services';
import { ERegistrationStatus } from '@src/constants';

export const useAssignLeadMutation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload: AssignmentLeadFormData) => {
      return workflowsService.assignLead(payload);
    },

    onSuccess: (lead) => {
      qc.setQueriesData<PaginatedResponse<SupplierInfoItem>>(
        { queryKey: ['suppliersSearch'] },
        (oldData) => {
          console.log(lead, 'leadleadlead');
          if (!oldData) return oldData;
          return {
            ...oldData,
            items: oldData.items.map((el) =>
              el.id === lead.registrationId
                ? { ...el, status: ERegistrationStatus.PENDING }
                : el,
            ),
          };
        },
      );
      toast.success('Lead has been assigned successfully!');
    },
  });
};
