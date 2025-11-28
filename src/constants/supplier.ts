const REGISTRATIONS_PATH = '/registrations';

export const SUPPLIER_ENDPOINT = {
  CREATE: REGISTRATIONS_PATH,
  UPDATE: (id: string) => `${REGISTRATIONS_PATH}/${id}`,
  GET_BY_ID: (id: string) => `${REGISTRATIONS_PATH}/${id}`,
  GET_LIST: () => REGISTRATIONS_PATH,
  SUBMIT: (id: string) => `${REGISTRATIONS_PATH}/${id}/submit`,
} as const;
