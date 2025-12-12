export interface LeadData {
  id: number;
  company: string;
  customerName: string;
  annualRevenue: number;
  date: string;
  status: string;
  remarks: string;
  assigned: boolean;
}

export interface AssignmentLeadFormData {
  assigneeId?: string;
  registrationId: string;
}
