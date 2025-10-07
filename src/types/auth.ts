export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  surname?: string;
  acceptTerms: boolean;
}

export interface ForgotPasswordFormData {
  email: string;
}
