import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { inquiryService, CreateInquiryRequest } from '@src/api/services';
import { getErrorMessage } from '@src/errors';

export const useCreateInquiryMutation = () => {
  return useMutation({
    mutationFn: (data: CreateInquiryRequest) => {
      return inquiryService.create(data);
    },
    onSuccess: () => {
      toast.success('Inquiry submitted successfully!');
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(message || 'Failed to submit inquiry. Please try again.');
    },
  });
};

