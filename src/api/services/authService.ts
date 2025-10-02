import { User } from '@src/types';
import { mockUser } from '@src/mock/dashboardData';
import apiClient from '../index';

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
  fullName: string;
}

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 600));

    if (credentials.email.length >= 3 && credentials.password.length >= 6) {
      return {
        token: 'mock-jwt-token-' + Date.now(),
        user: {
          id: mockUser.id,
          username: mockUser.username,
          email: mockUser.email,
          fullName: mockUser.fullName,
          avatar: mockUser.avatar,
          department: mockUser.department,
          position: mockUser.position,
          createdAt: mockUser.createdAt,
          updatedAt: mockUser.updatedAt,
        },
      };
    } else {
      throw new Error(
        'Email (minimum 3 characters) and password (minimum 6 characters) are required',
      );
    }
  },

  register: async (userData: RegisterRequest): Promise<LoginResponse> => {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },

  getCurrentUser: async (): Promise<LoginResponse['user']> => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    return {
      id: mockUser.id,
      username: mockUser.username,
      email: mockUser.email,
      fullName: mockUser.fullName,
      avatar: mockUser.avatar,
      department: mockUser.department,
      position: mockUser.position,
      createdAt: mockUser.createdAt,
      updatedAt: mockUser.updatedAt,
    };
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },
};
