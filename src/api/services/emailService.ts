import apiClient from '../index';
import { EMAIL_ENDPOINT } from '@src/constants';
import { PaginatedResponse, SearchParams } from '@src/types';
import { EmailTemplate } from '@src/types/email';

export interface UpdateEmailTemplateRequest {
  subject: string;
  emailEn: string;
  emailTh: string;
  remarks?: string;
}

export const emailService = {
  getEmailTemplates: async (
    searchParams: SearchParams,
  ): Promise<PaginatedResponse<EmailTemplate>> => {
    const response = await apiClient.get(EMAIL_ENDPOINT.GET_TEMPLATES, {
      params: searchParams,
    });
    return response.data;
  },

  getEmailTemplateById: async (id: string): Promise<EmailTemplate> => {
    const response = await apiClient.get(EMAIL_ENDPOINT.GET_TEMPLATE_BY_ID(id));
    return response.data;
  },

  updateEmailTemplate: async (
    id: string,
    data: UpdateEmailTemplateRequest,
  ): Promise<EmailTemplate> => {
    const response = await apiClient.patch(
      EMAIL_ENDPOINT.UPDATE_TEMPLATE(id),
      data,
    );
    return response.data;
  },
};
