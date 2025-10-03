import { User } from '@src/types';
import { mockUser } from '@src/mock/dashboardData';
import { LOGIN_ERROR_CODE } from '@src/constants/auth';
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
  token: string;
  user: User;
}

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 600));

    if (
      credentials.email === 'admin@gmail.com' &&
      credentials.password === '12345678'
    ) {
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
    }

    if (credentials.email.includes('inactive')) {
      throw new AuthError(LOGIN_ERROR_CODE.ACCOUNT_DEACTIVATED);
    }

    if (
      credentials.email.includes('blocked') ||
      credentials.email.includes('lock')
    ) {
      throw new AuthError(LOGIN_ERROR_CODE.ACCOUNT_BLOCKED);
    }

    throw new AuthError(LOGIN_ERROR_CODE.INCORRECT_CREDENTIALS);
  },

  register: async (userData: RegisterRequest): Promise<RegisterResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (userData.email === 'existing@company.com') {
      throw new AuthError(1005);
    }

    if (
      userData.email.includes('inactive') ||
      userData.email.includes('deleted')
    ) {
      throw new AuthError(1006);
    }

    // Generate fake user data based on input
    const newUserId = Date.now();
    const fakeUsername = userData.email.split('@')[0];

    return {
      token: 'mock-jwt-token-' + newUserId,
      user: {
        id: newUserId,
        username: fakeUsername,
        email: userData.email,
        fullName: `${userData.name}${userData.surname ? ` ${userData.surname}` : ''}`,
        avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 50) + 1}`,
        department: 'IT Department',
        position: 'Employee',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };
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
