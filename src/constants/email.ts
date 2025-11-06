const EMAIL_TEMPLATES_PATH = '/email-templates';

export const EMAIL_ENDPOINT = {
  GET_TEMPLATES: EMAIL_TEMPLATES_PATH,
  GET_TEMPLATE_BY_ID: (id: string) => `${EMAIL_TEMPLATES_PATH}/${id}`,
  UPDATE_TEMPLATE: (id: string) => `${EMAIL_TEMPLATES_PATH}/${id}`,
} as const;
