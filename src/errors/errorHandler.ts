import { AuthError } from '@src/api/services';
import { MESSAGES } from '@src/constants';
import { ERROR_CODE_MESSAGE_MAPPING } from './errorCode';

/**
 * Utility function to handle authentication errors and return appropriate error messages
 * @param error - The error object (can be AuthError or regular Error)
 * @returns The appropriate error message string
 */
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AuthError) {
    const errorCode = error.code;
    const messageKey = ERROR_CODE_MESSAGE_MAPPING[
      errorCode as keyof typeof ERROR_CODE_MESSAGE_MAPPING
    ] as keyof typeof MESSAGES;

    return MESSAGES[messageKey] || 'An error occurred. Please try again.';
  }

  // Fallback for regular Error objects
  if (error instanceof Error) {
    return error.message;
  }

  // Final fallback
  return 'An error occurred. Please try again.';
};
