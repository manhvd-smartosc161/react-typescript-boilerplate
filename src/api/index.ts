import axios, { AxiosResponse } from 'axios';
import camelCase from 'camelcase-keys';
import { getCookie } from '@src/utils/cookie';
import { camelToSnakeKeys } from '@src/utils/snakeCase';
import { ApiError } from './ApiError';

const API_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: `${API_URL}/api/v1`,
  responseType: 'json',
  timeout: 15 * 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getCookie('accessToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Convert request body to snake_case
    if (
      config.data &&
      typeof config.data === 'object' &&
      !(config.data instanceof FormData)
    ) {
      config.data = camelToSnakeKeys(config.data);
    }

    // Convert query params to snake_case
    if (config.params && typeof config.params === 'object') {
      config.params = camelToSnakeKeys(config.params);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    const camelCasedData = camelCase(response.data.data, { deep: true });

    return {
      ...response,
      data: camelCasedData,
    };
  },
  (error) => {
    const apiError = ApiError.fromAxiosError(error);
    return Promise.reject(apiError);
  },
);

export default apiClient;
export { API_URL };
