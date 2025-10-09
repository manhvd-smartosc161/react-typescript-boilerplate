import * as yup from 'yup';
import {
  ChangePasswordFormData,
  NotificationFormData,
  ProfileFormData,
} from '@src/types';
import {
  getAuthMessage,
  LANGUAGE_CODES,
  LANGUAGE_DISPLAY,
} from '@src/constants';

const NAME_REGEX = /^[A-Za-z\u0E00-\u0E7F\s]+$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;

export const profileFormSchema: yup.ObjectSchema<ProfileFormData> = yup
  .object()
  .shape({
    name: yup
      .string()
      .min(3, getAuthMessage('MSG_008'))
      .max(32, getAuthMessage('MSG_008'))
      .matches(NAME_REGEX, getAuthMessage('MSG_008'))
      .required(getAuthMessage('MSG_001')),
    interfaceLanguage: yup
      .string()
      .oneOf(
        [LANGUAGE_DISPLAY.THAI, LANGUAGE_DISPLAY.ENGLISH],
        'Please select a valid language',
      )
      .required('Please select interface language'),
    language: yup
      .string()
      .oneOf(
        [LANGUAGE_CODES.TH, LANGUAGE_CODES.EN],
        'Please select a valid language',
      )
      .required('Please select language'),
    avatar: yup
      .mixed<File>()
      .nullable()
      .test('fileSize', 'File size must be less than 3MB', (value) => {
        if (!value) return true;
        return value.size <= 3 * 1024 * 1024;
      })
      .test('fileType', 'Only PNG and JPEG files are allowed', (value) => {
        if (!value) return true;
        return ['image/png', 'image/jpeg', 'image/jpg'].includes(value.type);
      }),
  });

export const changePasswordFormSchema: yup.ObjectSchema<ChangePasswordFormData> =
  yup
    .object()
    .shape({
      currentPassword: yup.string().required(),
      newPassword: yup.string().required(),
      confirmPassword: yup.string().required(),
    })
    .test('password-group', '', function (values) {
      const { currentPassword, newPassword, confirmPassword } = values || {};

      const allEmpty =
        !currentPassword?.trim() &&
        !newPassword?.trim() &&
        !confirmPassword?.trim();

      if (allEmpty) return true;

      if (!currentPassword?.trim()) {
        return this.createError({
          path: 'currentPassword',
          message: getAuthMessage('MSG_001'),
        });
      }

      if (!newPassword?.trim()) {
        return this.createError({
          path: 'newPassword',
          message: getAuthMessage('MSG_001'),
        });
      }

      if (!confirmPassword?.trim()) {
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
    emailNotifications: yup.boolean().required(),
    marketingNotifications: yup.boolean().required(),
  });
