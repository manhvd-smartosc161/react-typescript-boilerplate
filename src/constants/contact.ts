import { enumToOptions } from '@src/utils';
import { StatusLabels, statusOptions } from './common';

export enum ECommunicationLanguage {
  ENGLISH = 'EN',
  THAI = 'TH',
}

export enum ESalutation {
  MR = 'Mr.',
  MS = 'Ms.',
  MRS = 'Mrs.',
  DR = 'Dr.',
}

export enum EContactRole {
  PRIMARY_CONTACT = 'PRIMARY_CONTACT',
  FINANCE_CONTACT = 'FINANCE_CONTACT',
  SALES_CONTACT = 'SALES_CONTACT',
  TECHNICAL_CONTACT = 'TECHNICAL_CONTACT',
}

export const CommunicationLanguageLabels: Record<
  ECommunicationLanguage,
  string
> = {
  [ECommunicationLanguage.ENGLISH]: 'English',
  [ECommunicationLanguage.THAI]: 'Thai',
};

export const SalutationLabels: Record<ESalutation, string> = {
  [ESalutation.MR]: 'Mr.',
  [ESalutation.MS]: 'Ms.',
  [ESalutation.MRS]: 'Mrs.',
  [ESalutation.DR]: 'Dr.',
};

export const ContactRoleLabels: Record<EContactRole, string> = {
  [EContactRole.PRIMARY_CONTACT]: 'Primary Contact',
  [EContactRole.FINANCE_CONTACT]: 'Finance Contact',
  [EContactRole.SALES_CONTACT]: 'Sales Contact',
  [EContactRole.TECHNICAL_CONTACT]: 'Technical Contact',
};

export const communicationLanguageOptions = enumToOptions(
  ECommunicationLanguage,
  CommunicationLanguageLabels,
);
export const salutationOptions = enumToOptions(ESalutation, SalutationLabels);
export const contactRoleOptions = enumToOptions(
  EContactRole,
  ContactRoleLabels,
);

export const contactStatusOptions = statusOptions;

export const SALUTATION_MAP = SalutationLabels;
export const CONTACT_ROLE_MAP = ContactRoleLabels;
export const CONTACT_STATUS_MAP = StatusLabels;
