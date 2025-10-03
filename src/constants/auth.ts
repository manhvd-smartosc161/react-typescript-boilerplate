export const LOGIN_ERROR_CODE = {
  INCORRECT_CREDENTIALS: 1000,
  ACCOUNT_DEACTIVATED: 1001,
  ACCOUNT_BLOCKED: 1002,
} as const;

export const authKeys = {
  all: ['auth'] as const,
  user: () => [...authKeys.all, 'user'] as const,
};

export const AUTH_MESSAGES = {
  // General Messages
  MSG_001: 'This is a required field.',
  MSG_002: 'Email or password is incorrect.',
  MSG_003: "You can't login because the account is deactivated.",
  MSG_004:
    'Your account is temporarily blocked for 30 minutes due to excessive 5 failed login attempts.',

  // Sign Up Messages
  MSG_005: 'Invalid email format.',
  MSG_006:
    'Password must be 8-32 characters including uppercase, lowercase, alphanumeric and special characters.',
  MSG_007: 'Confirm Password does not match Password.',
  MSG_008:
    'Name must be 3-32 characters, only allow latin characters and thai characters.',
  MSG_009: 'Please select checkbox to proceed register.',
  MSG_010: 'Email already in use. Please log in or sign up with another email.',
  MSG_011:
    "You can't signup because the account is deactivated. Please contact Admin if you want to reactivate account.",
  MSG_012: 'Your account has been successfully created',
} as const;

// Helper function to get message by code
export const getAuthMessage = (code: keyof typeof AUTH_MESSAGES): string => {
  return AUTH_MESSAGES[code];
};
