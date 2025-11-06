import { useMutation, useQueryClient } from '@tanstack/react-query';
import { emailService } from '@src/api/services';
import { getErrorMessage } from '@src/errors';
import { toast } from 'react-toastify';

interface UpdateEmailTemplateParams {
  id: string;
  data: {
    subject: string;
    emailEn: string;
    emailTh: string;
    remark: string;
  };
}

export const useUpdateEmailTemplateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateEmailTemplateParams) => {
      return emailService.updateEmailTemplate(id, {
        subject: data.subject,
        emailEn: data.emailEn,
        emailTh: data.emailTh,
        remarks: data.remark,
      });
    },
    onSuccess: (updatedTemplate, variables) => {
      // Update all emailTemplates queries with the new data
      queryClient.setQueriesData(
        {
          predicate: (query) =>
            Array.isArray(query.queryKey) &&
            query.queryKey[0] === 'emailTemplates',
        },
        (oldData: any) => {
          if (!oldData?.items) return oldData;

          const updatedItems = oldData.items.map((item: any) => {
            if (item.id === variables.id) {
              return updatedTemplate;
            }
            return item;
          });

          return {
            ...oldData,
            items: updatedItems,
          };
        },
      );

      toast.success('Email template updated successfully!');
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(message || 'Failed to update email template!');
    },
  });
};
