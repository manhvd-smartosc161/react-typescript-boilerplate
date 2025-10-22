import { enumToOptions } from '@src/utils';
import { booleanFlagOptions } from './common';

export enum EProductDivision {
  HARD_LINE_ELECTRIC = 'HARD_LINE_ELECTRIC',
  SOFT_LINE = 'SOFT_LINE',
  FOOD = 'FOOD',
}

export enum EProductType {
  ELECTRIC = 'ELECTRIC',
  NON_ELECTRIC = 'NON_ELECTRIC',
}

export enum EDistributionArea {
  LOCAL = 'LOCAL',
  INTERNATIONAL = 'INTERNATIONAL',
  REGIONAL = 'REGIONAL',
}

export enum EDocumentQuality {
  YES = 'Y',
  NO = 'N',
}

export enum EDeliveryMode {
  STANDARD_DELIVERY = 'STANDARD_DELIVERY',
  EXPRESS_DELIVERY = 'EXPRESS_DELIVERY',
  PICKUP = 'PICKUP',
}

export enum EDueDiligenceResult {
  PASSED = 'PASSED',
  FAILED = 'FAILED',
  PENDING = 'PENDING',
}

export enum EDay {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

export enum ESiteStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export const ProductDivisionLabels: Record<EProductDivision, string> = {
  [EProductDivision.HARD_LINE_ELECTRIC]: 'Hard Line Electric',
  [EProductDivision.SOFT_LINE]: 'Soft Line',
  [EProductDivision.FOOD]: 'Food',
};

export const ProductTypeLabels: Record<EProductType, string> = {
  [EProductType.ELECTRIC]: 'Electric',
  [EProductType.NON_ELECTRIC]: 'Non-Electric',
};

export const DistributionAreaLabels: Record<EDistributionArea, string> = {
  [EDistributionArea.LOCAL]: 'Local',
  [EDistributionArea.INTERNATIONAL]: 'International',
  [EDistributionArea.REGIONAL]: 'Regional',
};

export const DocumentQualityLabels: Record<EDocumentQuality, string> = {
  [EDocumentQuality.YES]: 'Yes',
  [EDocumentQuality.NO]: 'No',
};

export const DeliveryModeLabels: Record<EDeliveryMode, string> = {
  [EDeliveryMode.STANDARD_DELIVERY]: 'Standard Delivery',
  [EDeliveryMode.EXPRESS_DELIVERY]: 'Express Delivery',
  [EDeliveryMode.PICKUP]: 'Pickup',
};

export const DueDiligenceResultLabels: Record<EDueDiligenceResult, string> = {
  [EDueDiligenceResult.PASSED]: 'Passed',
  [EDueDiligenceResult.FAILED]: 'Failed',
  [EDueDiligenceResult.PENDING]: 'Pending',
};

export const DayLabels: Record<EDay, string> = {
  [EDay.MONDAY]: 'Monday',
  [EDay.TUESDAY]: 'Tuesday',
  [EDay.WEDNESDAY]: 'Wednesday',
  [EDay.THURSDAY]: 'Thursday',
  [EDay.FRIDAY]: 'Friday',
  [EDay.SATURDAY]: 'Saturday',
  [EDay.SUNDAY]: 'Sunday',
};

export const SiteStatusLabels: Record<ESiteStatus, string> = {
  [ESiteStatus.ACTIVE]: 'Active',
  [ESiteStatus.INACTIVE]: 'Inactive',
};

export const productDivisionOptions = enumToOptions(
  EProductDivision,
  ProductDivisionLabels,
);
export const productTypeOptions = enumToOptions(
  EProductType,
  ProductTypeLabels,
);
export const distributionAreaOptions = enumToOptions(
  EDistributionArea,
  DistributionAreaLabels,
);
export const documentQualityOptions = enumToOptions(
  EDocumentQuality,
  DocumentQualityLabels,
);
export const deliveryModeOptions = enumToOptions(
  EDeliveryMode,
  DeliveryModeLabels,
);
export const dueDiligenceResultOptions = enumToOptions(
  EDueDiligenceResult,
  DueDiligenceResultLabels,
);
export const dayOptions = enumToOptions(EDay, DayLabels);
export const siteStatusOptions = enumToOptions(ESiteStatus, SiteStatusLabels);

export const yesNoOptions = booleanFlagOptions;

export const DELIVERY_MODE_MAP = DeliveryModeLabels;
export const DUE_DILIGENCE_RESULT_MAP = DueDiligenceResultLabels;
export const DAY_MAP = DayLabels;
export const SITE_STATUS_MAP = SiteStatusLabels;
