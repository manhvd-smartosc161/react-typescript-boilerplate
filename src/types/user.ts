export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  surname: string;
  language?: string;
  emailNotifications?: boolean;
  marketingNotifications?: boolean;
  avatar?: string;
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
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  surname: string;
  department?: string;
  position?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  token: string | null;
  refreshToken?: string;
}
