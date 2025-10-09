export class ApiError extends Error {
  public readonly code?: number;

  constructor(error: string, code?: number) {
    super(error);
    this.name = 'ApiError';
    this.code = code;

    // Maintains proper stack trace for where our error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }

  static fromAxiosError(error: any): ApiError {
    const message = error.response?.data?.error || 'An error occurred';
    const code = error.response?.data?.code;

    return new ApiError(message, code);
  }
}
