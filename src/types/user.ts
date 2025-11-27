export interface Role {
  id: string;
  name: string;
}

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
  registrationId?: string;
  role?: Role;
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

export type UserRole =
  | 'admin'
  | 'manager'
  | 'employee'
  | 'guest'
  | 'buyer'
  | 'supplier';

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

export interface RoleItem {
  id: string;
  name: string;
}

export interface UserRolesItem {
  id: string;
  avatar?: string;
  name: string;
  surname?: string;
  email: string;
  emailNotifications: boolean;
  language?: string;
  marketingNotifications?: boolean;
  updatedAt?: string;
  role?: RoleItem;
  status?: number;
}

export interface UserRoleFormData {
  id: string;
  name: string;
  emailNotifications: boolean;
  roleId?: string;
  status: number;
}

export interface BulkUpdateUserStatus {
  status: number;
  userIds: string[];
}
