export interface ProfileFormData {
  name: string;
  interfaceLanguage: string;
  language: string;
  avatar?: File | null;
}

export interface ChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface NotificationFormData {
  emailNotifications: boolean;
  marketingNotifications: boolean;
}
