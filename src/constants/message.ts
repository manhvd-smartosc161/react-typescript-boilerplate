export const MESSAGES = {
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
  MSG_013:
    'A password reset email has already been sent. Please check your inbox. You can request again after 5 minutes.',
  MSG_014: 'Password reset link is expired.',
  MSG_015:
    'Password must not be identical with one of your most 3 recent used passwords.',
  MSG_016: 'At least one address is required',
  MSG_017: 'At least one payment method is required',
  MSG_018: 'At least one site is required',
  MSG_019: 'At least one business unit is required',
  MSG_020: 'At least one address must be selected',
  MSG_021: 'At least one payment must be selected',
  MSG_022: 'At least one purpose is required',
  MSG_023: 'Must be at least 1',
  MSG_024: 'Must be integer',
  MSG_025: 'Tax ID must be 13 digits',
  MSG_026: 'Invalid tax identification number',
  MSG_027: 'Remarks must be less than 500 characters',
  MSG_028: 'Please select at least one of the two fields above.',
} as const;
