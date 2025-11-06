export const authKeys = {
  all: ['auth'] as const,
  user: () => [...authKeys.all, 'user'] as const,
};

// API Endpoints
const AUTH_PATH = '/auth';

export const AUTH_ENDPOINT = {
  LOGIN: `${AUTH_PATH}/login`,
  REGISTER: `${AUTH_PATH}/register`,
  LOGOUT: `${AUTH_PATH}/logout`,
  ME: `${AUTH_PATH}/me`,
  FORGOT_PASSWORD: `${AUTH_PATH}/forgot-password`,
  VALIDATE_RESET_TOKEN: `${AUTH_PATH}/validate-reset-token`,
  RESET_PASSWORD: `${AUTH_PATH}/reset-password`,
  PROFILE: `${AUTH_PATH}/profile`,
  PASSWORD: `${AUTH_PATH}/password`,
  NOTIFICATIONS: `${AUTH_PATH}/notifications`,
} as const;
