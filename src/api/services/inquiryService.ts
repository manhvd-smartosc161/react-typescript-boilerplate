import apiClient from '../index';
import { INQUIRY_ENDPOINT } from '@src/constants';

export interface CreateInquiryRequest {
  email: string;
  message: string;
  name: string;
}

export interface CreateInquiryResponse {
  id: string;
  email: string;
  message: string;
  name: string;
  userId?: string;
  createdAt: string;
}

export const inquiryService = {
  create: async (
    data: CreateInquiryRequest,
  ): Promise<CreateInquiryResponse> => {
    const response = await apiClient.post(INQUIRY_ENDPOINT.CREATE, data);
    return response.data;
  },
};
