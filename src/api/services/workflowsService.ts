import { AssignmentLeadFormData } from '@src/types';
import apiClient from '..';
import { WORKFLOWS_ENDPOINT } from '@src/constants';
export const workflowsService = {
  assignLead: async (payload: AssignmentLeadFormData) => {
    const response = await apiClient.post(WORKFLOWS_ENDPOINT.POST, payload);
    return response.data;
  },
};
