import * as yup from 'yup';
import { MESSAGES } from '@src/constants';
import { ContactUsFormData } from '@src/types/contactUs';

export const contactUsSchema: yup.ObjectSchema<ContactUsFormData> = yup
  .object()
  .shape({
    name: yup.string().required(MESSAGES.MSG_001),
    email: yup.string().required(MESSAGES.MSG_001),
    question: yup.string().required(MESSAGES.MSG_001),
  });
