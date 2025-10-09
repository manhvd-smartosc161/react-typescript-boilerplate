import * as yup from 'yup';
import { MESSAGES } from '@src/constants';
import {
  LoginFormData,
  RegisterFormData,
  ForgotPasswordFormData,
  ResetPasswordFormData,
  ValidateResetTokenRequest,
} from '@src/types';

export const loginSchema: yup.ObjectSchema<LoginFormData> = yup.object().shape({
  email: yup.string().required(MESSAGES.MSG_001),
  password: yup.string().required(MESSAGES.MSG_001),
});

export const registerSchema: yup.ObjectSchema<RegisterFormData> = yup
  .object()
  .shape({
    email: yup.string().required(MESSAGES.MSG_001).email(MESSAGES.MSG_005),
    password: yup
      .string()
      .required(MESSAGES.MSG_001)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/,
        MESSAGES.MSG_006,
      ),
    confirmPassword: yup
      .string()
      .required(MESSAGES.MSG_001)
      .oneOf([yup.ref('password')], MESSAGES.MSG_007),
    name: yup
      .string()
      .required(MESSAGES.MSG_001)
      .matches(/^[a-zA-Z\s\u0E00-\u0E7F]{3,32}$/, MESSAGES.MSG_008),
    surname: yup
      .string()
      .optional()
      .test('surname-validation', MESSAGES.MSG_008, function (value) {
        if (!value || value.trim() === '') {
          return true;
        }
        return /^[a-zA-Z\s\u0E00-\u0E7F]{3,32}$/.test(value);
      }),
    agreedTerms: yup
      .boolean()
      .required(MESSAGES.MSG_001)
      .oneOf([true], MESSAGES.MSG_009),
  });

export const forgotPasswordSchema: yup.ObjectSchema<ForgotPasswordFormData> =
  yup.object().shape({
    email: yup.string().required(MESSAGES.MSG_001).email(MESSAGES.MSG_005),
  });

export const resetPasswordSchema: yup.ObjectSchema<ResetPasswordFormData> = yup
  .object()
  .shape({
    newPassword: yup
      .string()
      .required(MESSAGES.MSG_001)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/,
        MESSAGES.MSG_006,
      ),
    confirmPassword: yup
      .string()
      .required(MESSAGES.MSG_001)
      .oneOf([yup.ref('newPassword')], MESSAGES.MSG_007),
  });

export const validateResetTokenSchema: yup.ObjectSchema<ValidateResetTokenRequest> =
  yup.object().shape({
    token: yup.string().required(MESSAGES.MSG_001),
  });
