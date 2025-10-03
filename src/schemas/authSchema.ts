import * as yup from 'yup';
import { getAuthMessage } from '@src/constants/auth';

export const loginSchema = yup.object({
  email: yup.string().required(getAuthMessage('MSG_001')),
  password: yup.string().required(getAuthMessage('MSG_001')),
  remember: yup.boolean().default(false),
});

export const registerSchema = yup.object({
  email: yup
    .string()
    .test('email-format', 'Invalid email format', (value) => {
      if (!value) return true; // Let required validation handle empty values
      return value.includes('@') && value.includes('.');
    })
    .required(getAuthMessage('MSG_001')),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least 1 uppercase, 1 lowercase and 1 number',
    )
    .required(getAuthMessage('MSG_001')),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Password confirmation does not match')
    .required(getAuthMessage('MSG_001')),
  fullName: yup
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .required(getAuthMessage('MSG_001')),
});

export type LoginFormData = yup.InferType<typeof loginSchema>;
export type RegisterFormData = yup.InferType<typeof registerSchema>;
