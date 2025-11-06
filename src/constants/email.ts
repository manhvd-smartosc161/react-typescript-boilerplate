export const EMAIL_ENDPOINT = {
  GET_TEMPLATES: '/email-templates',
  GET_TEMPLATE_BY_ID: (id: string) => `/email-templates/${id}`,
  UPDATE_TEMPLATE: (id: string) => `/email-templates/${id}`,
} as const;
