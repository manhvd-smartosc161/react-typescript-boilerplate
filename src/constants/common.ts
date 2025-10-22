import { enumToOptions } from '@src/utils';

export enum EBooleanFlag {
  YES = 'Y',
  NO = 'N',
}

export enum EStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export const BooleanFlagLabels: Record<EBooleanFlag, string> = {
  [EBooleanFlag.YES]: 'Yes',
  [EBooleanFlag.NO]: 'No',
};

export const StatusLabels: Record<EStatus, string> = {
  [EStatus.ACTIVE]: 'Active',
  [EStatus.INACTIVE]: 'Inactive',
};

export const booleanFlagOptions = enumToOptions(
  EBooleanFlag,
  BooleanFlagLabels,
);
export const statusOptions = enumToOptions(EStatus, StatusLabels);

export const YES_NO_MAP = BooleanFlagLabels;
export const STATUS_MAP = StatusLabels;
