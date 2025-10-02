import { ApiError } from '../api/ApiError';

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof ApiError) {
    if (error.data?.message) {
      return error.data.message;
    }

    switch (error.status) {
      case 401:
        return 'Authentication failed';
      case 403:
        return 'You do not have permission';
      case 404:
        return 'Not found';
      case 500:
        return 'Server error, please try again later';
      default:
        return error.message || 'An error occurred';
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An error occurred';
};
