import { DeepPartial } from 'react-hook-form';
import * as yup from 'yup';
import {
  PersonInCharge,
  ProductImages,
  ProductLine,
  CompanyInfo,
  CompanyAddress,
  CompanyContact,
  CompanyPayment,
  CompanySupplierSite,
  PercentOffInvoice,
  DnbFinance,
  FactoryData,
  ProductInfo,
  RegistrationFormValues,
} from '@src/types/registration';

// TODO: Need Refactor and verify all schema are correct BRD

const requiredMsg = 'This is a required field.';

export const companyAddressSchema: yup.ObjectSchema<CompanyAddress> =
  yup.object({
    id: yup.string().optional(),
    type: yup
      .string()
      .oneOf(['BUSINESS', 'POSTAL', 'SHIPPING', 'BILLING'])
      .required(requiredMsg),
    name: yup.string().required(requiredMsg),
    line_1: yup.string().required(requiredMsg),
    line_2: yup.string().optional(),
    city: yup.string().required(requiredMsg),
    state: yup.string().required(requiredMsg),
    postal_code: yup.string().required(requiredMsg),
    country: yup.string().required(requiredMsg),
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
    ship_to_location: yup.string().optional(),
    bill_to_location: yup.string().optional(),
    status: yup.string().oneOf(['ACTIVE', 'INACTIVE']).required(requiredMsg),
  });

export const companyContactSchema: yup.ObjectSchema<CompanyContact> =
  yup.object({
    id: yup.string().optional(),
    address_ids: yup
      .array()
      .of(yup.string().required())
      .min(1, 'At least one address must be selected')
      .required(requiredMsg),
    department: yup.string().required(requiredMsg),
    salutation: yup
      .string()
      .oneOf(['Mr.', 'Ms.', 'Mrs.', 'Dr.'])
      .required(requiredMsg),
    first_name: yup.string().required(requiredMsg),
    middle_name: yup.string().optional(),
    last_name: yup.string().required(requiredMsg),
    job_title: yup.string().required(requiredMsg),
    phone: yup.string().required(requiredMsg),
    email: yup.string().email('Invalid email').required(requiredMsg),
    role: yup
      .string()
      .oneOf([
        'PRIMARY_CONTACT',
        'FINANCE_CONTACT',
        'SALES_CONTACT',
        'TECHNICAL_CONTACT',
      ])
      .required(requiredMsg),
    is_primary: yup.string().oneOf(['Y', 'N']).required(requiredMsg),
    receive_po_by_email: yup.string().oneOf(['Y', 'N']).required(requiredMsg),
    receive_remittance: yup.string().oneOf(['Y', 'N']).required(requiredMsg),
    status: yup.string().oneOf(['ACTIVE', 'INACTIVE']).required(requiredMsg),
  });

export const companyPaymentSchema: yup.ObjectSchema<CompanyPayment> =
  yup.object({
    id: yup.string().optional(),
    method: yup.string().required(requiredMsg),
    currency: yup.string().required(requiredMsg),
    bank_name: yup.string().required(requiredMsg),
    bank_branch: yup.string().required(requiredMsg),
    account_number: yup.string().required(requiredMsg),
    account_name: yup.string().required(requiredMsg),
    account_type: yup
      .string()
      .oneOf(['CURRENT', 'SAVINGS', 'CHECKING'])
      .required(requiredMsg),
    proof_attached: yup.string().oneOf(['Y', 'N']).required(requiredMsg),
    remittance_email: yup.string().email('Invalid email').required(requiredMsg),
    payee_name: yup.string().required(requiredMsg),
    ap_type: yup
      .string()
      .oneOf(['NORMAL', 'ADVANCE', 'URGENT'])
      .required(requiredMsg),
    payment_term: yup.string().required(requiredMsg),
    additional_payment_term: yup.string().optional(),
    invoice_submit_channel: yup
      .string()
      .oneOf(['WEB', 'EMAIL', 'MAIL', 'FAX'])
      .required(requiredMsg),
    vendor_traits: yup.string().required(requiredMsg),
    send_remittance_advise: yup
      .string()
      .oneOf(['Y', 'N'])
      .required(requiredMsg),
    status: yup.string().oneOf(['ACTIVE', 'INACTIVE']).required(requiredMsg),
  });

export const percentOffInvoiceSchema: yup.ObjectSchema<PercentOffInvoice> =
  yup.object({
    amount: yup.number().required(requiredMsg).min(0).max(100),
    start_date: yup.string().required(requiredMsg),
    end_date: yup.string().required(requiredMsg),
  });

export const dnbFinanceSchema: yup.ObjectSchema<DnbFinance> = yup.object({
  due_diligence_remarks: yup.string().required(requiredMsg),
  due_diligence_result: yup
    .string()
    .oneOf(['PASSED', 'FAILED', 'PENDING'])
    .required(requiredMsg),
  rating_remarks: yup.string().required(requiredMsg),
  rating: yup.string().required(requiredMsg),
  rating_memo: yup.string().required(requiredMsg),
  credit_term_status: yup
    .string()
    .oneOf(['FOLLOW', 'DELAY', 'DEFAULT'])
    .required(requiredMsg),
  credit_term_memo: yup.string().required(requiredMsg),
  company_status: yup.string().oneOf(['Y', 'N']).required(requiredMsg),
});

export const companySupplierSiteSchema: yup.ObjectSchema<CompanySupplierSite> =
  yup.object({
    id: yup.string().optional(),
    name: yup.string().required(requiredMsg),
    address_id: yup.string().required(requiredMsg),
    payment_ids: yup
      .array()
      .of(yup.string().required())
      .min(1, 'At least one payment must be selected')
      .required(requiredMsg),
    percent_off_invoice: yup.array().of(percentOffInvoiceSchema).optional(),
    dnb_finance: dnbFinanceSchema.optional(),
    returnable_supplier: yup.string().oneOf(['Y', 'N']).required(requiredMsg),
    delivery_mode: yup
      .string()
      .oneOf(['STANDARD_DELIVERY', 'EXPRESS_DELIVERY', 'PICKUP'])
      .required(requiredMsg),
    previous_trade_names: yup.string().optional(),
    preferred_order_day: yup
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
    preferred_delivery_day: yup
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
    min_order_value: yup.number().positive().optional(),
    min_order_qty: yup.number().positive().optional(),
    over_receiving_flag: yup.string().oneOf(['Y', 'N']).required(requiredMsg),
  });

export const personInChargeSchema: yup.ObjectSchema<PersonInCharge> =
  yup.object({
    name: yup.string().required(requiredMsg),
    email: yup.string().email('Invalid email').required(requiredMsg),
    contact: yup.string().required(requiredMsg),
  });

export const productImagesSchema: yup.ObjectSchema<ProductImages> = yup.object({
  packagingFront: yup.mixed().required('Front image required'),
  packagingBehind: yup.mixed().required('Behind image required'),
  packagingSide: yup.mixed().required('Side image required'),
  otherAspects: yup.mixed().required('Other aspects image required'),
});

export const productLineSchema: yup.ObjectSchema<ProductLine> = yup.object({
  soldAt: yup.object({
    makro: yup.boolean(),
    lotus: yup.boolean(),
  }),
  brandNameTh: yup.string().required(requiredMsg),
  brandNameEn: yup.string().required(requiredMsg),
  productCategory: yup.string().required(requiredMsg),
  productSubcategory: yup.string().required(requiredMsg),
  skuCount: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required(requiredMsg)
    .min(1),
  offerExclusivity: yup.string().oneOf(['yes', 'no']).required(requiredMsg),
  targetCustomerType: yup.string().required(requiredMsg),
  availableChannels: yup
    .array()
    .of(yup.string().required())
    .min(1, 'Select at least one'),
  usp: yup.string(),
  currentlySoldIn: yup.string(),
  images: productImagesSchema,
});

export const companyInfoSchema: yup.ObjectSchema<CompanyInfo> = yup.object({
  companyNameTh: yup.string().required(requiredMsg).default(null),
  companyNameEn: yup.string().required(requiredMsg).default(null),

  companyAddressTh: yup.string().required(requiredMsg).default(null),
  companyAddressEn: yup.string().required(requiredMsg).default(null),

  province: yup.string().required(requiredMsg).default(null),
  zipCode: yup.string().required(requiredMsg).default(null),
  companyEmail: yup.string().email().required(requiredMsg).default(null),

  companyWebsite: yup.string().optional().default(null),
  contactNumber: yup.string().required(requiredMsg).default(null),
  telephoneNumber: yup.string().optional().default(null),

  annualRevenue: yup
    .number()
    .transform((v) => (isNaN(v) ? undefined : v))
    .required(requiredMsg)
    .default(null),

  establishmentDate: yup
    .date()
    .typeError('Invalid Date')
    .required(requiredMsg)
    .default(null),

  taxpayerNumber: yup.string().required(requiredMsg).default(null),

  companyRegistrationDocuments: yup
    .array()
    .of(yup.string().required())
    .default([]),

  personsInCharge: yup.array().of(personInChargeSchema).min(1).max(5),

  addresses: yup.array().of(companyAddressSchema).optional().default([]),

  contacts: yup.array().of(companyContactSchema).optional().default([]),

  payments: yup.array().of(companyPaymentSchema).optional().default([]),

  sites: yup.array().of(companySupplierSiteSchema).optional().default([]),
});

export const factoryDataSchema: yup.ObjectSchema<FactoryData> = yup.object({
  factoryName: yup.string().required(requiredMsg),
  factoryAddress: yup.string().required(requiredMsg),
  province: yup.string().required(requiredMsg),
  zipCode: yup.string().required(requiredMsg),
  licensingStatus: yup
    .string()
    .oneOf(['licensed', 'not_licensed'])
    .required(requiredMsg),
  factoryRegistrationNumber: yup.string().when('licensingStatus', {
    is: 'licensed',
    then: (schema) =>
      schema.required('Registration # is required for licensed factories'),
    otherwise: (schema) => schema.notRequired().nullable(),
  }),
  licenseExpirationDate: yup
    .date()
    .nullable()
    .when('licensingStatus', {
      is: 'licensed',
      then: (schema) =>
        schema.typeError('Invalid Date').required('Exp. Date required'),
      otherwise: (schema) => schema.notRequired().nullable(),
    }),
  factoryStandards: yup
    .array()
    .of(yup.string().required())
    .min(1, 'Select at least one standard'),
});

export const productInfoSchema: yup.ObjectSchema<ProductInfo> = yup.object({
  productLines: yup
    .array()
    .of(productLineSchema)
    .min(1, 'Add at least one product line'),
});

export const registrationMasterSchema: yup.ObjectSchema<RegistrationFormValues> =
  yup.object({
    companyInfo: companyInfoSchema,
    factoryData: factoryDataSchema,
    productInfo: productInfoSchema,
  });

export const registrationSchemaType: yup.ObjectSchema<RegistrationFormValues> =
  registrationMasterSchema;

export const defaultRegistrationValues: DeepPartial<RegistrationFormValues> = {
  companyInfo: {
    personsInCharge: [{ name: '', email: '', contact: '' }],
    companyRegistrationDocuments: [],
    addresses: [],
    contacts: [],
    payments: [],
    sites: [],
  },
  factoryData: {
    licensingStatus: undefined,
    factoryStandards: [],
  },
  productInfo: {
    productLines: [
      {
        soldAt: { makro: false, lotus: false },
        brandNameTh: '',
        brandNameEn: '',
        productCategory: '',
        productSubcategory: '',
        skuCount: 1,
        offerExclusivity: 'no',
        targetCustomerType: '',
        availableChannels: [],
        usp: '',
        currentlySoldIn: '',
        images: {
          packagingFront: null,
          packagingBehind: null,
          packagingSide: null,
          otherAspects: null,
        },
      },
    ],
  },
};
