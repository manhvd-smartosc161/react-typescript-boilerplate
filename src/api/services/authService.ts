import apiClient from '../index';
import { mockUser } from '@src/mock/dashboardData';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
    fullName: string;
    avatar?: string;
    department?: string;
    position?: string;
  };
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
}

export const authService = {
  // Login user - Mock implementation
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Simple validation - accept any email/password for demo
    if (credentials.email.length >= 3 && credentials.password.length >= 6) {
      // Return mock response
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
        },
      };
    } else {
      throw new Error(
        'Email (minimum 3 characters) and password (minimum 6 characters) are required',
      );
    }

    // Uncomment below when you want to use real API
    // const response = await apiClient.post('/auth/login', credentials);
    // return response.data;
  },

  // Register user
  register: async (userData: RegisterRequest): Promise<LoginResponse> => {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },

  // Get current user info
  getCurrentUser: async (): Promise<LoginResponse['user']> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Return mock user data
    return {
      id: mockUser.id,
      username: mockUser.username,
      email: mockUser.email,
      fullName: mockUser.fullName,
      avatar: mockUser.avatar,
      department: mockUser.department,
      position: mockUser.position,
    };

    // Real API
    // const response = await apiClient.get('/auth/me');
    // return response.data;
  },

  // Logout user (if backend requires it)
  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },
};
