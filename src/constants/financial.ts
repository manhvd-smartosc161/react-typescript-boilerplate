import { enumToOptions } from '@src/utils';
import { booleanFlagOptions, StatusLabels, statusOptions } from './common';

export enum ECommercialTax {
  VAT_7 = 'VAT_7',
  VAT_0 = 'VAT_0',
  NO_VAT = 'NO_VAT',
}

export enum ECreditTermStatus {
  FOLLOW = 'FOLLOW',
  DELAY = 'DELAY',
  DEFAULT = 'DEFAULT',
}

export enum ECurrency {
  THB = 'THB',
  USD = 'USD',
  EUR = 'EUR',
  SGD = 'SGD',
  MYR = 'MYR',
  JPY = 'JPY',
}

export enum EAccountType {
  CURRENT = 'CURRENT',
  SAVINGS = 'SAVINGS',
  CHECKING = 'CHECKING',
}

export enum EApType {
  NORMAL = 'NORMAL',
  ADVANCE = 'ADVANCE',
  URGENT = 'URGENT',
}

export enum EInvoiceSubmitChannel {
  WEB = 'WEB',
  EMAIL = 'EMAIL',
  MAIL = 'MAIL',
  FAX = 'FAX',
}

export const CommercialTaxLabels: Record<ECommercialTax, string> = {
  [ECommercialTax.VAT_7]: 'VAT 7%',
  [ECommercialTax.VAT_0]: 'VAT 0%',
  [ECommercialTax.NO_VAT]: 'No VAT',
};

export const CreditTermStatusLabels: Record<ECreditTermStatus, string> = {
  [ECreditTermStatus.FOLLOW]: 'Follow',
  [ECreditTermStatus.DELAY]: 'Delay',
  [ECreditTermStatus.DEFAULT]: 'Default',
};

export const CurrencyLabels: Record<ECurrency, string> = {
  [ECurrency.THB]: 'THB',
  [ECurrency.USD]: 'USD',
  [ECurrency.EUR]: 'EUR',
  [ECurrency.SGD]: 'SGD',
  [ECurrency.MYR]: 'MYR',
  [ECurrency.JPY]: 'JPY',
};

export const AccountTypeLabels: Record<EAccountType, string> = {
  [EAccountType.CURRENT]: 'Current',
  [EAccountType.SAVINGS]: 'Savings',
  [EAccountType.CHECKING]: 'Checking',
};

export const ApTypeLabels: Record<EApType, string> = {
  [EApType.NORMAL]: 'Normal',
  [EApType.ADVANCE]: 'Advance',
  [EApType.URGENT]: 'Urgent',
};

export const InvoiceSubmitChannelLabels: Record<EInvoiceSubmitChannel, string> =
  {
    [EInvoiceSubmitChannel.WEB]: 'Web',
    [EInvoiceSubmitChannel.EMAIL]: 'Email',
    [EInvoiceSubmitChannel.MAIL]: 'Mail',
    [EInvoiceSubmitChannel.FAX]: 'Fax',
  };

export const commercialTaxOptions = enumToOptions(
  ECommercialTax,
  CommercialTaxLabels,
);
export const creditTermStatusOptions = enumToOptions(
  ECreditTermStatus,
  CreditTermStatusLabels,
);
export const currencyOptions = enumToOptions(ECurrency, CurrencyLabels);
export const accountTypeOptions = enumToOptions(
  EAccountType,
  AccountTypeLabels,
);
export const apTypeOptions = enumToOptions(EApType, ApTypeLabels);
export const invoiceSubmitChannelOptions = enumToOptions(
  EInvoiceSubmitChannel,
  InvoiceSubmitChannelLabels,
);

// Reuse common enums
export const withholdingTaxOptions = booleanFlagOptions;
export const paymentStatusOptions = statusOptions;

export const CREDIT_TERM_STATUS_MAP = CreditTermStatusLabels;
export const CURRENCY_MAP = CurrencyLabels;
export const ACCOUNT_TYPE_MAP = AccountTypeLabels;
export const AP_TYPE_MAP = ApTypeLabels;
export const INVOICE_SUBMIT_CHANNEL_MAP = InvoiceSubmitChannelLabels;
export const PAYMENT_STATUS_MAP = StatusLabels;
