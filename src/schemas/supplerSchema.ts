import { DeepPartial } from 'react-hook-form';
import * as yup from 'yup';
import {
  SupplierInfo,
  SupplierAddress,
  SupplierContact,
  SupplierPayment,
  SupplierSite,
  PercentOffInvoice,
  DnbFinance,
  SupplierRegistrationFormValues,
} from '@src/types/supplier';
import { MESSAGES, REGEX } from '@src/constants';
import {
  EAccountType,
  EApType,
  EBusinessUnit,
  EInvoiceSubmitChannel,
  EStatus as EPaymentStatus,
  EBooleanFlag as EYesNo,
} from '@src/constants';
import './methods/supplierMethod';

//TODO: Not completed, needs to be updated to match the BRD documentation
export const supplierAddressSchema: yup.ObjectSchema<SupplierAddress> =
  yup.object({
    id: yup.string().optional(),
    type: yup
      .string()
      .oneOf(['BUSINESS', 'POSTAL', 'SHIPPING', 'BILLING'])
      .required(MESSAGES.MSG_001),
    name: yup.string().required(MESSAGES.MSG_001),
    line1: yup.string().required(MESSAGES.MSG_001),
    line2: yup.string().optional(),
    city: yup.string().required(MESSAGES.MSG_001),
    state: yup.string().required(MESSAGES.MSG_001),
    postalCode: yup.string().required(MESSAGES.MSG_001),
    country: yup.string().required(MESSAGES.MSG_001),
    phone: yup.string().optional(),
    email: yup.string().email('Invalid email').optional(),
    fax: yup.string().optional(),
    purpose: yup
      .array()
      .of(
        yup
          .string()
          .oneOf(['ORDERING', 'REMIT', 'RFQ', 'SHIPPING', 'BILLING'])
          .required(),
      )
      .min(1, 'At least one purpose is required')
      .optional(),
    shipToLocation: yup.string().optional(),
    billToLocation: yup.string().optional(),
    status: yup
      .string()
      .oneOf(['ACTIVE', 'INACTIVE'])
      .required(MESSAGES.MSG_001),
  });

//TODO: Not completed, needs to be updated to match the BRD documentation
export const supplierContactSchema: yup.ObjectSchema<SupplierContact> =
  yup.object({
    id: yup.string().optional(),
    addressIds: yup
      .array()
      .of(yup.string().required())
      .min(1, 'At least one address must be selected')
      .required(MESSAGES.MSG_001),
    department: yup.string().required(MESSAGES.MSG_001),
    salutation: yup
      .string()
      .oneOf(['Mr.', 'Ms.', 'Mrs.', 'Dr.'])
      .required(MESSAGES.MSG_001),
    firstName: yup.string().required(MESSAGES.MSG_001),
    middleName: yup.string().optional(),
    lastName: yup.string().required(MESSAGES.MSG_001),
    jobTitle: yup.string().required(MESSAGES.MSG_001),
    phone: yup.string().required(MESSAGES.MSG_001),
    email: yup.string().email('Invalid email').required(MESSAGES.MSG_001),
    role: yup
      .string()
      .oneOf([
        'PRIMARY_CONTACT',
        'FINANCE_CONTACT',
        'SALES_CONTACT',
        'TECHNICAL_CONTACT',
      ])
      .required(MESSAGES.MSG_001),
    isPrimary: yup.string().oneOf(['Y', 'N']).required(MESSAGES.MSG_001),
    receivePoByEmail: yup.string().oneOf(['Y', 'N']).required(MESSAGES.MSG_001),
    receiveRemittance: yup
      .string()
      .oneOf(['Y', 'N'])
      .required(MESSAGES.MSG_001),
    status: yup
      .string()
      .oneOf(['ACTIVE', 'INACTIVE'])
      .required(MESSAGES.MSG_001),
  });

//TODO: Not completed, needs to be updated to match the BRD documentation
export const supplierPaymentSchema: yup.ObjectSchema<SupplierPayment> =
  yup.object({
    id: yup.string().optional(),
    method: yup.string().required(MESSAGES.MSG_001),
    currency: yup.string().required(MESSAGES.MSG_001),
    bankName: yup.string().required(MESSAGES.MSG_001),
    bankBranch: yup.string().required(MESSAGES.MSG_001),
    accountNumber: yup.string().required(MESSAGES.MSG_001),
    accountName: yup.string().required(MESSAGES.MSG_001),
    accountType: yup
      .string<EAccountType>()
      .oneOf(Object.values(EAccountType))
      .required(MESSAGES.MSG_001),
    proofAttached: yup
      .string<EYesNo>()
      .oneOf(Object.values(EYesNo))
      .required(MESSAGES.MSG_001),
    remittanceEmail: yup
      .string()
      .email('Invalid email')
      .required(MESSAGES.MSG_001),
    payeeName: yup.string().required(MESSAGES.MSG_001),
    apType: yup
      .string<EApType>()
      .oneOf(Object.values(EApType))
      .required(MESSAGES.MSG_001),
    paymentTerm: yup.string().required(MESSAGES.MSG_001),
    additionalPaymentTerm: yup.string().optional(),
    invoiceSubmitChannel: yup
      .string<EInvoiceSubmitChannel>()
      .oneOf(Object.values(EInvoiceSubmitChannel))
      .required(MESSAGES.MSG_001),
    vendorTraits: yup.string().required(MESSAGES.MSG_001),
    sendRemittanceAdvise: yup
      .string<EYesNo>()
      .oneOf(Object.values(EYesNo))
      .required(MESSAGES.MSG_001),
    status: yup
      .string<EPaymentStatus>()
      .oneOf(Object.values(EPaymentStatus))
      .required(MESSAGES.MSG_001),
  });

// TODO: Not completed, needs to be updated to match the BRD documentation
export const percentOffInvoiceSchema: yup.ObjectSchema<PercentOffInvoice> =
  yup.object({
    amount: yup.number().required(MESSAGES.MSG_001).min(0).max(100),
    startDate: yup.string().required(MESSAGES.MSG_001),
    endDate: yup.string().required(MESSAGES.MSG_001),
  });

//TODO: Not completed, needs to be updated to match the BRD documentation
export const dnbFinanceSchema: yup.ObjectSchema<DnbFinance> = yup.object({
  dueDiligenceRemarks: yup.string().required(MESSAGES.MSG_001),
  dueDiligenceResult: yup
    .string()
    .oneOf(['PASSED', 'FAILED', 'PENDING'])
    .required(MESSAGES.MSG_001),
  ratingRemarks: yup.string().required(MESSAGES.MSG_001),
  rating: yup.string().required(MESSAGES.MSG_001),
  ratingMemo: yup.string().required(MESSAGES.MSG_001),
  creditTermStatus: yup
    .string()
    .oneOf(['FOLLOW', 'DELAY', 'DEFAULT'])
    .required(MESSAGES.MSG_001),
  creditTermMemo: yup.string().required(MESSAGES.MSG_001),
  companyStatus: yup.string().oneOf(['Y', 'N']).required(MESSAGES.MSG_001),
});

//TODO: Not completed, needs to be updated to match the BRD documentation
export const supplierSiteSchema: yup.ObjectSchema<SupplierSite> = yup.object({
  id: yup.string().optional(),
  name: yup.string().required(MESSAGES.MSG_001),
  addressId: yup.string().required(MESSAGES.MSG_001),
  paymentIds: yup
    .array()
    .of(yup.string().required())
    .min(1, 'At least one payment must be selected')
    .required(MESSAGES.MSG_001),
  percentOffInvoice: yup.array().of(percentOffInvoiceSchema).optional(),
  dnbFinance: dnbFinanceSchema.optional(),
  returnableSupplier: yup.string().oneOf(['Y', 'N']).required(MESSAGES.MSG_001),
  deliveryMode: yup
    .string()
    .oneOf(['STANDARD_DELIVERY', 'EXPRESS_DELIVERY', 'PICKUP'])
    .required(MESSAGES.MSG_001),
  previousTradeNames: yup.string().optional(),
  preferredOrderDay: yup
    .array()
    .of(
      yup
        .string()
        .oneOf([
          'MONDAY',
          'TUESDAY',
          'WEDNESDAY',
          'THURSDAY',
          'FRIDAY',
          'SATURDAY',
          'SUNDAY',
        ])
        .required(),
    )
    .optional(),
  preferredDeliveryDay: yup
    .array()
    .of(
      yup
        .string()
        .oneOf([
          'MONDAY',
          'TUESDAY',
          'WEDNESDAY',
          'THURSDAY',
          'FRIDAY',
          'SATURDAY',
          'SUNDAY',
        ])
        .required(),
    )
    .optional(),
  minOrderValue: yup.number().positive().optional(),
  minOrderQty: yup.number().positive().optional(),
  overReceivingFlag: yup.string().oneOf(['Y', 'N']).required(MESSAGES.MSG_001),
});

//TODO: Not completed, needs to be updated to match the BRD documentation
export const supplierInfoSchema = yup.object<SupplierInfo>({
  nameTh: yup.string().required(MESSAGES.MSG_001), //
  nameEn: yup.string().required(MESSAGES.MSG_001),

  taxType: yup.string().required(MESSAGES.MSG_001),
  taxCountry: yup.string().required(MESSAGES.MSG_001),
  taxId: yup
    .string()
    .required(MESSAGES.MSG_001)
    .matches(REGEX.TAX_ID_FORMAT, 'Tax ID must be 13 digits')
    .isValidTaxId('Invalid tax identification number'),

  businessRelationship: yup.string().required(MESSAGES.MSG_001),
  supType: yup.string().required(MESSAGES.MSG_001),
  supTradingType: yup.string().required(MESSAGES.MSG_001),
  smeFlag: yup.string().required(MESSAGES.MSG_001),
  numberOfEmp: yup
    .number()
    .typeError(MESSAGES.MSG_001)
    .required(MESSAGES.MSG_001)
    .integer('Must be integer')
    .min(1, 'Must be at least 1'),

  productDivision: yup.string().required(MESSAGES.MSG_001),
  productType: yup.string().required(MESSAGES.MSG_001),
  documentQuality: yup.string().required(MESSAGES.MSG_001),
  connectionType: yup.string().required(MESSAGES.MSG_001),

  contactPersonName: yup.string().required(MESSAGES.MSG_001),
  contactPersonEmail: yup
    .string()
    .required(MESSAGES.MSG_001)
    .matches(REGEX.EMAIL_FORMAT, 'Invalid email format'),
  contactPersonPhone: yup.string().required(MESSAGES.MSG_001),

  buyerId: yup.string().required(MESSAGES.MSG_001),
  buyerPhone: yup.string().required(MESSAGES.MSG_001),
  remark: yup.string().optional(),

  juristicType: yup.string().required(MESSAGES.MSG_001),
  commercialTax: yup.string().required(MESSAGES.MSG_001),
  withholdingTax: yup.string().required(MESSAGES.MSG_001),
  distributionArea: yup.string().required(MESSAGES.MSG_001),
  incorporationCountry: yup.string().required(MESSAGES.MSG_001),
  businessCountry: yup.string().required(MESSAGES.MSG_001),
  commuLanguage: yup.string().required(MESSAGES.MSG_001),
  businessUnits: yup
    .array()
    .of(yup.string().oneOf(Object.values(EBusinessUnit)).required())
    .min(1, 'At least one business unit is required')
    .required(MESSAGES.MSG_001),

  addresses: yup.array().of(supplierAddressSchema).optional().default([]),
  contacts: yup.array().of(supplierContactSchema).optional().default([]),
  payments: yup.array().of(supplierPaymentSchema).optional().default([]),
});

export const registrationMasterSchema =
  yup.object<SupplierRegistrationFormValues>({
    information: supplierInfoSchema,
    sites: yup.array().of(supplierSiteSchema).optional().default([]),
  });

export const registrationSchemaType = registrationMasterSchema;

export const defaultRegistrationValues: DeepPartial<SupplierRegistrationFormValues> =
  {
    information: {
      businessUnits: [],
      addresses: [],
      contacts: [],
      payments: [],
    },
    sites: [],
  };
