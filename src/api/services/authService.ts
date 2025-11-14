import {
  User,
  ValidateResetTokenRequest,
  ValidateResetTokenResponse,
} from '@src/types';
import { AUTH_ENDPOINT } from '@src/constants';
import { setCookie, getCookie } from '@src/utils/cookie';
import { getBrowserLanguage } from '@src/utils/browserLanguage';
import apiClient from '..';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  surname?: string;
  agreedTerms: boolean;
  language?: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface ResetPasswordRequest {
  newPassword: string;
  token: string;
}

export interface ResetPasswordResponse {
  message: string;
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
        surname: userData.surname || '',
        language: userData.language,
        emailNotifications: userData.emailNotifications,
        marketingNotifications: userData.marketingNotifications,
        avatar: userData.avatar,
        registrationId: userData.registrationId,
      },
    };
  },

  register: async (userData: RegisterRequest): Promise<RegisterResponse> => {
    const dataToSend = {
      email: userData.email,
      password: userData.password,
      name: userData.name,
      surname: userData.surname,
      agreedTerms: userData.agreedTerms,
      language: userData.language || getBrowserLanguage(),
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
        ...(user.language && { language: user.language }),
      },
    };
  },

  getCurrentUser: async (): Promise<LoginResponse['user']> => {
    const response = await apiClient.get(AUTH_ENDPOINT.ME);

    const userData = response.data;

    return {
      id: userData.id,
      username: userData.name,
      name: userData.name,
      email: userData.email,
      surname: userData.surname || '',
      language: userData.language,
      emailNotifications: userData.emailNotifications,
      marketingNotifications: userData.marketingNotifications,
      avatar: userData.avatar,
      registrationId: userData.registrationId,
    };
  },

  forgotPassword: async (
    email: ForgotPasswordRequest,
  ): Promise<ForgotPasswordResponse> => {
    const response = await apiClient.post(AUTH_ENDPOINT.FORGOT_PASSWORD, email);
    return response.data;
  },

  validateResetToken: async (
    data: ValidateResetTokenRequest,
  ): Promise<ValidateResetTokenResponse> => {
    const response = await apiClient.post(
      AUTH_ENDPOINT.VALIDATE_RESET_TOKEN,
      data,
    );
    return response.data;
  },

  resetPassword: async (
    data: ResetPasswordRequest,
  ): Promise<ResetPasswordResponse> => {
    const response = await apiClient.post(AUTH_ENDPOINT.RESET_PASSWORD, data);
    return response.data;
  },

  updateUserProfile: async (data: {
    name: string;
    surname: string;
    language: string;
    avatar?: File | null;
  }): Promise<void> => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('surname', data.surname);
    formData.append('language', data.language);

    if (data.avatar && data.avatar instanceof File) {
      formData.append('avatar', data.avatar);
    } else {
      formData.append('avatar', '');
    }

    await apiClient.put(AUTH_ENDPOINT.PROFILE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  updatePassword: async (data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }): Promise<void> => {
    await apiClient.put(AUTH_ENDPOINT.PASSWORD, {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
    });
  },

  updateNotificationSettings: async (data: {
    emailNotifications: boolean;
    marketingNotifications: boolean;
  }): Promise<void> => {
    await apiClient.put(AUTH_ENDPOINT.NOTIFICATIONS, data);
  },
};
