import { MESSAGES } from '@src/constants';
import { UserRoleFormData } from '@src/types';
import * as yup from 'yup';
export const userSchema: yup.ObjectSchema<UserRoleFormData> = yup
  .object()
  .shape({
    id: yup.string().required(),
    name: yup.string().min(3).required(MESSAGES.MSG_001),
    status: yup.number().required(MESSAGES.MSG_001),
    emailNotifications: yup.boolean().default(false).optional(),
    roleId: yup.string().optional(),
  });
