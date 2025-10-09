export const authKeys = {
  all: ['auth'] as const,
  user: () => [...authKeys.all, 'user'] as const,
};

// API Endpoints
export const AUTH_ENDPOINT = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  ME: '/auth/me',
  FORGOT_PASSWORD: '/auth/forgot-password',
  VALIDATE_RESET_TOKEN: '/auth/validate-reset-token',
  RESET_PASSWORD: '/auth/reset-password',
  PROFILE: '/auth/profile',
  PASSWORD: '/auth/password',
  NOTIFICATIONS: '/auth/notifications',
} as const;
