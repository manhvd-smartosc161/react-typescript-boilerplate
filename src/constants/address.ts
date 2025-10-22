import { enumToOptions } from '@src/utils';
import { statusOptions } from './common';

export enum EAddressType {
  BUSINESS = 'BUSINESS',
  POSTAL = 'POSTAL',
  SHIPPING = 'SHIPPING',
  BILLING = 'BILLING',
}

export enum EAddressPurpose {
  ORDERING = 'ORDERING',
  REMIT = 'REMIT',
  RFQ = 'RFQ',
  SHIPPING = 'SHIPPING',
  BILLING = 'BILLING',
}

export enum ECountry {
  TH = 'TH',
  SG = 'SG',
  MY = 'MY',
  VN = 'VN',
  ID = 'ID',
  PH = 'PH',
  MM = 'MM',
  KH = 'KH',
  LA = 'LA',
  BN = 'BN',
}

export const AddressTypeLabels: Record<EAddressType, string> = {
  [EAddressType.BUSINESS]: 'Business Address',
  [EAddressType.POSTAL]: 'Postal Address',
  [EAddressType.SHIPPING]: 'Shipping Address',
  [EAddressType.BILLING]: 'Billing Address',
};

export const AddressPurposeLabels: Record<EAddressPurpose, string> = {
  [EAddressPurpose.ORDERING]: 'Ordering',
  [EAddressPurpose.REMIT]: 'Remit',
  [EAddressPurpose.RFQ]: 'RFQ',
  [EAddressPurpose.SHIPPING]: 'Shipping',
  [EAddressPurpose.BILLING]: 'Billing',
};

export const CountryLabels: Record<ECountry, string> = {
  [ECountry.TH]: 'Thailand',
  [ECountry.SG]: 'Singapore',
  [ECountry.MY]: 'Malaysia',
  [ECountry.VN]: 'Vietnam',
  [ECountry.ID]: 'Indonesia',
  [ECountry.PH]: 'Philippines',
  [ECountry.MM]: 'Myanmar',
  [ECountry.KH]: 'Cambodia',
  [ECountry.LA]: 'Laos',
  [ECountry.BN]: 'Brunei',
};

export const addressTypeOptions = enumToOptions(
  EAddressType,
  AddressTypeLabels,
);
export const addressPurposeOptions = enumToOptions(
  EAddressPurpose,
  AddressPurposeLabels,
);
export const countryOptions = enumToOptions(ECountry, CountryLabels);

export const addressStatusOptions = statusOptions;

export const ADDRESS_CONST = {
  addressStatusOptions,
};
