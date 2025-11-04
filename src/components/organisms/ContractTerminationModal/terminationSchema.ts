import * as yup from 'yup';
import { TerminationFormData } from './index';

export const terminationSchema: yup.ObjectSchema<TerminationFormData> = yup
  .object()
  .shape({
    terminationReason: yup
      .string()
      .required('Please select termination reason'),
    effectiveDate: yup
      .string()
      .required('Please select effective termination date'),
    remarks: yup
      .string()
      .max(255, 'Remarks must not exceed 255 characters')
      .optional(),
    sendEmailNotification: yup.boolean().required(),
  });
