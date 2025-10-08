import { DeepPartial } from 'react-hook-form';
import * as yup from 'yup';
import {
  PersonInCharge,
  ProductImages,
  ProductLine,
  CompanyInfo,
  FactoryData,
  ProductInfo,
  RegistrationFormValues,
} from '@src/types/registration';

// TODO: Need Refactor and verify all schema are correct BRD

const requiredMsg = 'This is a required field.';

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
