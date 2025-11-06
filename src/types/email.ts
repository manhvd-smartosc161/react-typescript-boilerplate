export interface EmailTemplate {
  id: string;
  subject: string;
  remarks: string;
  emailEn?: string;
  emailTh?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmailSettingItem {
  id: string | number;
  subject: string;
  remarks: string;
  createdDate: string;
  updatedDate: string;
  emailEn?: string;
  emailTh?: string;
}
