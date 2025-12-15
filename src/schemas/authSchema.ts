import * as yup from 'yup';
import { MESSAGES } from '@src/constants';
import {
  LoginFormData,
  RegisterFormData,
  ForgotPasswordFormData,
  ResetPasswordFormData,
  ValidateResetTokenRequest,
  NewPasswordFormData,
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
      .matches(/^[a-zA-Z\s\u0E00-\u0E7F]{1,32}$/, MESSAGES.MSG_008),
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

export const newPasswordSchema: yup.ObjectSchema<NewPasswordFormData> = yup
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
    agreedTerms: yup
      .boolean()
      .required(MESSAGES.MSG_001)
      .oneOf([true], MESSAGES.MSG_009),
  });
