export class ApiError extends Error {
  public readonly status: number;

  public readonly statusText: string;

  public readonly data: any;

  constructor(message: string, status: number, statusText: string, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.statusText = statusText;
    this.data = data;

    // Maintains proper stack trace for where our error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }

  static fromAxiosError(error: any): ApiError {
    const message =
      error.response?.data?.message || error.message || 'An error occurred';
    const status = error.response?.status || 500;
    const statusText = error.response?.statusText || 'Internal Server Error';
    const data = error.response?.data;

    return new ApiError(message, status, statusText, data);
  }
}
