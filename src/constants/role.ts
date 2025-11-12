import { AutocompleteOption } from '@src/components/atoms/Autocomplete';

const ROLE_PATH = '/rbac/roles';

export const ROLE_ENDPOINT = {
  CREATE: ROLE_PATH,
  UPDATE: (id: string) => `${ROLE_PATH}/${id}`,
  GET_BY_ID: (id: string) => `${ROLE_PATH}/${id}`,
  GET_LIST: ROLE_PATH,
  BULK_UPDATE: `${ROLE_PATH}/bulk-update-status`,
  GET_ALL: `${ROLE_PATH}/all`,
} as const;

export enum ERetailerType {
  LOTUS = 'LOTUS',
  MARKOS = 'MARKOS',
}

export const RETAILER_TYPE: AutocompleteOption[] = (
  Object.keys(ERetailerType) as Array<keyof typeof ERetailerType>
).map((key) => ({
  id: key,
  label: ERetailerType[key],
}));

export enum EStatusUpdate {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED',
}
