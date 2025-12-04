import * as yup from 'yup';
import { MESSAGES } from '@src/constants';
import { AddLeadFormValue, LeadAssignmentForm } from '@src/types';

export const leadSchema: yup.ObjectSchema<AddLeadFormValue> = yup
  .object()
  .shape({
    saleAt: yup
      .array()
      .of(yup.string().required())
      .min(1, MESSAGES.MSG_001)
      .required(MESSAGES.MSG_001),

    email: yup.string().email(MESSAGES.MSG_005).required(MESSAGES.MSG_001),

    companyName: yup.string().trim().required(MESSAGES.MSG_001),

    productCategory: yup
      .array()
      .of(yup.string().required())
      .min(1, MESSAGES.MSG_001)
      .required(),

    remarks: yup.string().trim().max(500, MESSAGES.MSG_027).optional(),
  });
export const leadAsignmentSchema: yup.ObjectSchema<LeadAssignmentForm> = yup
  .object({
    leadOwnerMakro: yup.string().optional(),
    leadOwnerLotus: yup.string().optional(),
  })
  .test('atLeastOneOwner', MESSAGES.MSG_001, function (value) {
    const valid = Boolean(value?.leadOwnerMakro || value?.leadOwnerLotus);
    if (valid) return true;

    return this.createError({
      path: 'atLeastOneOwner',
      message: MESSAGES.MSG_028,
    });
  });
