export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  avatar?: string;
  department?: string;
  position?: string;
  phone?: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile extends User {
  preferences?: {
    theme: 'light' | 'dark';
    language: string;
    notifications: boolean;
  };
}

export interface AuthUser {
  id: number;
  email: string;
  fullName: string;
  avatar?: string;
  department?: string;
  position?: string;
  role: UserRole;
  permissions: string[];
}

export type UserRole = 'admin' | 'manager' | 'employee' | 'guest';

export interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  fullName: string;
  department?: string;
  position?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  token: string | null;
  refreshToken?: string;
}
