export const SUPPLIER_ENDPOINT = {
  CREATE: '/registrations',
  UPDATE: (id: string) => `/registrations/${id}`,
  GET_BY_ID: (id: string) => `/registrations/${id}`,
} as const;
