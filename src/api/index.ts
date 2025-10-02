import axios, { AxiosResponse } from 'axios';
import camelCase from 'camelcase-keys';
import { ApiError } from './ApiError';

// Get API URL from environment variables
const API_URL = process.env.REACT_APP_API_URL;

// Create axios instance
const apiClient = axios.create({
  baseURL: `${API_URL}/api/v1`,
  responseType: 'json',
  timeout: 15 * 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Convert response to camelCase
    const camelCasedData = camelCase(response.data, { deep: true });

    return {
      ...response,
      data: camelCasedData,
    };
  },
  (error) => {
    // Convert axios error to our custom ApiError
    const apiError = ApiError.fromAxiosError(error);
    return Promise.reject(apiError);
  },
);

export default apiClient;
export { API_URL };
