import * as yup from 'yup';
import {
  ChangePasswordFormData,
  NotificationFormData,
  ProfileFormData,
} from '@src/types';
import { getAuthMessage } from '@src/constants';

const NAME_REGEX = /^[A-Za-z\u0E00-\u0E7F\s]+$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;

export const profileFormSchema: yup.ObjectSchema<ProfileFormData> = yup
  .object()
  .shape({
    email: yup
      .string()
      .email(getAuthMessage('MSG_005'))
      .required(getAuthMessage('MSG_001')),
    name: yup
      .string()
      .min(3, getAuthMessage('MSG_008'))
      .max(32, getAuthMessage('MSG_008'))
      .matches(NAME_REGEX, getAuthMessage('MSG_008'))
      .required(getAuthMessage('MSG_001')),
  });

export const changePasswordFormSchema: yup.ObjectSchema<ChangePasswordFormData> =
  yup
    .object()
    .shape({
      currentPassword: yup.string().nullable(),
      newPassword: yup.string().nullable(),
      confirmPassword: yup.string().nullable(),
    })
    .test('password-group', '', function (values) {
      const { currentPassword, newPassword, confirmPassword } = values || {};

      const allEmpty =
        !currentPassword?.trim() &&
        !newPassword?.trim() &&
        !confirmPassword?.trim();

      if (allEmpty) return true;

      if (!currentPassword) {
        return this.createError({
          path: 'currentPassword',
          message: getAuthMessage('MSG_001'),
        });
      }

      if (!newPassword) {
        return this.createError({
          path: 'newPassword',
          message: getAuthMessage('MSG_001'),
        });
      }

      if (!confirmPassword) {
        return this.createError({
          path: 'confirmPassword',
          message: getAuthMessage('MSG_001'),
        });
      }

      if (newPassword && !PASSWORD_REGEX.test(newPassword)) {
        return this.createError({
          path: 'newPassword',
          message: getAuthMessage('MSG_006'),
        });
      }
      if (confirmPassword !== newPassword) {
        return this.createError({
          path: 'confirmPassword',
          message: getAuthMessage('MSG_007'),
        });
      }

      return true;
    });

export const notificationFormSchema: yup.ObjectSchema<NotificationFormData> =
  yup.object().shape({
    emailNotification: yup.boolean().required(),
    marketingNotification: yup.boolean().required(),
  });
