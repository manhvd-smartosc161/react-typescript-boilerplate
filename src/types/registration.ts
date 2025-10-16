export interface PersonInCharge {
  name: string;
  email: string;
  contact: string;
}

export interface ProductImages {
  packagingFront?: any; // Using any for File type since Yup's mixed() doesn't map well to File
  packagingBehind?: any;
  packagingSide?: any;
  otherAspects?: any;
}

export interface ProductLine {
  soldAt: {
    makro?: boolean;
    lotus?: boolean;
  };
  brandNameTh: string;
  brandNameEn: string;
  productCategory: string;
  productSubcategory: string;
  skuCount: number;
  offerExclusivity: 'yes' | 'no';
  targetCustomerType: string;
  availableChannels?: string[];
  usp?: string;
  currentlySoldIn?: string;
  images: ProductImages;
}

export interface CompanyAddress {
  id?: string;
  type: 'BUSINESS' | 'POSTAL' | 'SHIPPING' | 'BILLING';
  name: string;
  line_1: string;
  line_2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone?: string;
  email?: string;
  fax?: string;
  purpose?: ('ORDERING' | 'REMIT' | 'RFQ' | 'SHIPPING' | 'BILLING')[];
  ship_to_location?: string;
  bill_to_location?: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface CompanyContact {
  id?: string;
  address_ids?: string[];
  department: string;
  salutation: 'Mr.' | 'Ms.' | 'Mrs.' | 'Dr.';
  first_name: string;
  middle_name?: string;
  last_name: string;
  job_title: string;
  phone: string;
  email: string;
  role:
    | 'PRIMARY_CONTACT'
    | 'FINANCE_CONTACT'
    | 'SALES_CONTACT'
    | 'TECHNICAL_CONTACT';
  is_primary: 'Y' | 'N';
  receive_po_by_email: 'Y' | 'N';
  receive_remittance: 'Y' | 'N';
  status: 'ACTIVE' | 'INACTIVE';
}

export interface CompanyPayment {
  id?: string;
  method: string;
  currency: string;
  bank_name: string;
  bank_branch: string;
  account_number: string;
  account_name: string;
  account_type: 'CURRENT' | 'SAVINGS' | 'CHECKING';
  proof_attached: 'Y' | 'N';
  remittance_email: string;
  payee_name: string;
  ap_type: 'NORMAL' | 'ADVANCE' | 'URGENT';
  payment_term: string;
  additional_payment_term?: string;
  invoice_submit_channel: 'WEB' | 'EMAIL' | 'MAIL' | 'FAX';
  vendor_traits: string;
  send_remittance_advise: 'Y' | 'N';
  status: 'ACTIVE' | 'INACTIVE';
}

export interface PercentOffInvoice {
  amount: number;
  start_date: string;
  end_date: string;
}

export interface DnbFinance {
  due_diligence_remarks: string;
  due_diligence_result: 'PASSED' | 'FAILED' | 'PENDING';
  rating_remarks: string;
  rating: string;
  rating_memo: string;
  credit_term_status: 'FOLLOW' | 'DELAY' | 'DEFAULT';
  credit_term_memo: string;
  company_status: 'Y' | 'N';
}

export interface CompanySupplierSite {
  id?: string;
  name: string;
  address_id: string;
  payment_ids: string[];
  percent_off_invoice?: PercentOffInvoice[];
  dnb_finance?: DnbFinance;
  returnable_supplier: 'Y' | 'N';
  delivery_mode: 'STANDARD_DELIVERY' | 'EXPRESS_DELIVERY' | 'PICKUP';
  previous_trade_names?: string;
  preferred_order_day?: (
    | 'MONDAY'
    | 'TUESDAY'
    | 'WEDNESDAY'
    | 'THURSDAY'
    | 'FRIDAY'
    | 'SATURDAY'
    | 'SUNDAY'
  )[];
  preferred_delivery_day?: (
    | 'MONDAY'
    | 'TUESDAY'
    | 'WEDNESDAY'
    | 'THURSDAY'
    | 'FRIDAY'
    | 'SATURDAY'
    | 'SUNDAY'
  )[];
  min_order_value?: number;
  min_order_qty?: number;
  over_receiving_flag: 'Y' | 'N';
}

export interface CompanyInfo {
  companyNameTh: string;
  companyNameEn: string;
  companyAddressTh: string;
  companyAddressEn: string;

  province: string;
  zipCode: string;

  companyEmail: string;
  companyWebsite: string | null;
  contactNumber: string;

  telephoneNumber?: string;
  annualRevenue: number;
  establishmentDate: Date;
  taxpayerNumber: string;
  personsInCharge?: PersonInCharge[];
  companyRegistrationDocuments?: string[];
  addresses?: CompanyAddress[];
  contacts?: CompanyContact[];
  payments?: CompanyPayment[];
  sites?: CompanySupplierSite[];
}

export interface FactoryData {
  factoryName: string;
  factoryAddress: string;
  province: string;
  zipCode: string;
  licensingStatus: 'licensed' | 'not_licensed';
  factoryRegistrationNumber?: string | null;
  licenseExpirationDate?: Date | null;
  factoryStandards?: string[];
}

export interface ProductInfo {
  productLines?: ProductLine[];
}

export interface RegistrationFormValues {
  companyInfo: CompanyInfo;
  factoryData: FactoryData;
  productInfo: ProductInfo;
}
