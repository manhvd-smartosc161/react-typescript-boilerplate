export interface ProfileFormData {
  email: string;
  name: string;
}

export interface ChangePasswordFormData {
  currentPassword?: string | null;
  newPassword?: string | null;
  confirmPassword?: string | null;
}

export interface NotificationFormData {
  emailNotification: boolean;
  marketingNotification: boolean;
}
