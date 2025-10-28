import { enumToOptions } from '@src/utils';
import { EBooleanFlag, BooleanFlagLabels, booleanFlagOptions } from './common';

export enum EBusinessUnit {
  LOTUS = 'LOTUS',
  MAKRO = 'MAKRO',
}

export enum EBusinessRelationship {
  PROSPECTIVE = 'PROSPECTIVE',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum ESupplierType {
  BRANDED = 'BRANDED',
  NON_BRANDED = 'NON_BRANDED',
  SERVICE = 'SERVICE',
}

export enum ESupplierTradingType {
  BRANDED_CREDIT = 'BRANDED_CREDIT',
  BRANDED_CASH = 'BRANDED_CASH',
  CONSIGNMENT = 'CONSIGNMENT',
}

export enum EConnectionType {
  NORMAL = 'NORMAL',
  RELATED_PARTY = 'RELATED_PARTY',
}

export enum EJuristicType {
  CORPORATION = 'CORPORATION',
  INDIVIDUAL = 'INDIVIDUAL',
  PARTNERSHIP = 'PARTNERSHIP',
}

export enum EVendorTraints {
  MBAS_SUPPLIER = 'MBAS_SUPPLIER',
  REGULAR_SUPPLIER = 'REGULAR_SUPPLIER',
  PREMIUM_SUPPLIER = 'PREMIUM_SUPPLIER',
  STRATEGIC_SUPPLIER = 'STRATEGIC_SUPPLIER',
}

export const BusinessUnitLabels: Record<EBusinessUnit, string> = {
  [EBusinessUnit.LOTUS]: 'Lotus',
  [EBusinessUnit.MAKRO]: 'Makro',
};

export const BusinessRelationshipLabels: Record<EBusinessRelationship, string> =
  {
    [EBusinessRelationship.PROSPECTIVE]: 'Prospective',
    [EBusinessRelationship.ACTIVE]: 'Active',
    [EBusinessRelationship.INACTIVE]: 'Inactive',
  };

export const SupplierTypeLabels: Record<ESupplierType, string> = {
  [ESupplierType.BRANDED]: 'Branded',
  [ESupplierType.NON_BRANDED]: 'Non-Branded',
  [ESupplierType.SERVICE]: 'Service',
};

export const SupplierTradingTypeLabels: Record<ESupplierTradingType, string> = {
  [ESupplierTradingType.BRANDED_CREDIT]: 'Branded Credit',
  [ESupplierTradingType.BRANDED_CASH]: 'Branded Cash',
  [ESupplierTradingType.CONSIGNMENT]: 'Consignment',
};

export const ConnectionTypeLabels: Record<EConnectionType, string> = {
  [EConnectionType.NORMAL]: 'Normal',
  [EConnectionType.RELATED_PARTY]: 'Related Party',
};

export const JuristicTypeLabels: Record<EJuristicType, string> = {
  [EJuristicType.CORPORATION]: 'Corporation',
  [EJuristicType.INDIVIDUAL]: 'Individual',
  [EJuristicType.PARTNERSHIP]: 'Partnership',
};

export const VendorTraintsLabels: Record<EVendorTraints, string> = {
  [EVendorTraints.MBAS_SUPPLIER]: 'MBAS Supplier',
  [EVendorTraints.REGULAR_SUPPLIER]: 'Regular Supplier',
  [EVendorTraints.PREMIUM_SUPPLIER]: 'Premium Supplier',
  [EVendorTraints.STRATEGIC_SUPPLIER]: 'Strategic Supplier',
};

export const businessUnitOptions = enumToOptions(
  EBusinessUnit,
  BusinessUnitLabels,
);
export const businessRelationshipOptions = enumToOptions(
  EBusinessRelationship,
  BusinessRelationshipLabels,
);
export const supplierTypeOptions = enumToOptions(
  ESupplierType,
  SupplierTypeLabels,
);
export const supplierTradingTypeOptions = enumToOptions(
  ESupplierTradingType,
  SupplierTradingTypeLabels,
);
export const connectionTypeOptions = enumToOptions(
  EConnectionType,
  ConnectionTypeLabels,
);
export const juristicTypeOptions = enumToOptions(
  EJuristicType,
  JuristicTypeLabels,
);
export const vendorTraintsOptions = enumToOptions(
  EVendorTraints,
  VendorTraintsLabels,
);

export const ESmeFlag = EBooleanFlag;
export const SmeFlagLabels = BooleanFlagLabels;
export const smeFlagOptions = booleanFlagOptions;
