import { User } from '@src/types';
import { LOGIN_ERROR_CODE, AUTH_ENDPOINT } from '@src/constants';
import { setCookie, getCookie } from '@src/utils/cookie';
import apiClient from '../index';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface AuthError {
  code: number;
  message: string;
}

export class AuthError extends Error {
  public code: number;

  constructor(code: number) {
    super();
    this.code = code;
    this.name = 'AuthError';
  }
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  surname?: string;
}

export interface RegisterResponse {
  user: User;
}

const TOKEN_COOKIE_KEY = 'accessToken';
const TOKEN_EXPIRY_DAYS = 7;

export const tokenService = {
  saveToken: (token: string): void => {
    const expiryTime = TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000; // 7 days in milliseconds
    setCookie(TOKEN_COOKIE_KEY, token, expiryTime);
  },

  getToken: (): string => {
    return getCookie(TOKEN_COOKIE_KEY);
  },

  removeToken: (): void => {
    setCookie(TOKEN_COOKIE_KEY, '', -1);
  },
};

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await apiClient.post(AUTH_ENDPOINT.LOGIN, credentials);

      const responseData = response.data;
      const token = responseData.accessToken;
      const userData = responseData.user;

      tokenService.saveToken(token);

      return {
        token,
        user: {
          id: userData.id,
          username: userData.name,
          name: userData.name,
          email: userData.email,
          surname: userData.surname,
        },
      };
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new AuthError(LOGIN_ERROR_CODE.INCORRECT_CREDENTIALS);
      }
      if (error.response?.status === 403) {
        throw new AuthError(LOGIN_ERROR_CODE.ACCOUNT_BLOCKED);
      }
      if (error.response?.status === 404) {
        throw new AuthError(LOGIN_ERROR_CODE.ACCOUNT_DEACTIVATED);
      }

      throw new AuthError(LOGIN_ERROR_CODE.INCORRECT_CREDENTIALS);
    }
  },

  register: async (userData: RegisterRequest): Promise<RegisterResponse> => {
    try {
      const dataToSend = {
        email: userData.email,
        password: userData.password,
        name: userData.name,
        surname: userData.surname,
      };

      const response = await apiClient.post(AUTH_ENDPOINT.REGISTER, dataToSend);
      const user = response.data;

      return {
        user: {
          id: user.id,
          username: user.name,
          name: user.name,
          email: user.email,
          surname: user.surname,
        },
      };
    } catch (error: any) {
      if (error.response?.status === 400) {
        throw new AuthError(LOGIN_ERROR_CODE.INCORRECT_CREDENTIALS);
      }
      if (error.response?.status === 403) {
        throw new AuthError(LOGIN_ERROR_CODE.ACCOUNT_BLOCKED);
      }

      throw new AuthError(LOGIN_ERROR_CODE.INCORRECT_CREDENTIALS);
    }
  },

  getCurrentUser: async (): Promise<LoginResponse['user']> => {
    try {
      const response = await apiClient.get(AUTH_ENDPOINT.ME);

      const userData = response.data;

      return {
        id: userData.id,
        username: userData.name,
        name: userData.name,
        email: userData.email,
        surname: userData.surname,
      };
    } catch (error) {
      throw error;
    }
  },

  logout: async (): Promise<void> => {
    try {
      await apiClient.post(AUTH_ENDPOINT.LOGOUT);
    } catch (error) {
    } finally {
      tokenService.removeToken();
    }
  },
};
