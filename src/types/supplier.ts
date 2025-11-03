import {
  EAccountType,
  EApType,
  EInvoiceSubmitChannel,
  EStatus as EPaymentStatus,
  EBooleanFlag as EYesNo,
} from '@src/constants';

export interface SupplierAddress {
  id?: string;
  type: 'BUSINESS' | 'POSTAL' | 'SHIPPING' | 'BILLING';
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
  email?: string;
  fax?: string;
  purpose?: ('ORDERING' | 'REMIT' | 'RFQ' | 'SHIPPING' | 'BILLING')[];
  shipToLocation?: string;
  billToLocation?: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface SupplierContact {
  id?: string;
  addressIds?: string[];
  department: string;
  salutation: 'Mr.' | 'Ms.' | 'Mrs.' | 'Dr.';
  firstName: string;
  middleName?: string;
  lastName: string;
  jobTitle: string;
  phone: string;
  email: string;
  role:
    | 'PRIMARY_CONTACT'
    | 'FINANCE_CONTACT'
    | 'SALES_CONTACT'
    | 'TECHNICAL_CONTACT';
  isPrimary: 'Y' | 'N';
  receivePoByEmail: 'Y' | 'N';
  receiveRemittance: 'Y' | 'N';
  status: 'ACTIVE' | 'INACTIVE';
}

export interface SupplierPayment {
  id?: string;
  method: string;
  currency: string;
  bankName: string;
  bankBranch: string;
  accountNumber: string;
  accountName: string;
  accountType: EAccountType;
  proofAttached: EYesNo;
  remittanceEmail: string;
  payeeName: string;
  apType: EApType;
  paymentTerm: string;
  additionalPaymentTerm?: string;
  invoiceSubmitChannel: EInvoiceSubmitChannel;
  vendorTraints: string;
  sendRemittanceAdvise: EYesNo;
  status: EPaymentStatus;
}

export interface PercentOffInvoice {
  amount: number;
  startDate: string;
  endDate: string;
}

export interface DnbFinance {
  dueDiligenceRemarks: string;
  dueDiligenceResult: 'PASSED' | 'FAILED' | 'PENDING';
  ratingRemarks: string;
  rating: string;
  ratingMemo: string;
  creditTermStatus: 'FOLLOW' | 'DELAY' | 'DEFAULT';
  creditTermMemo: string;
  companyStatus: 'Y' | 'N';
}

export interface SupplierSite {
  id?: string;
  name: string;
  addressId: string;
  paymentIds: string[];
  percentOffInvoice?: PercentOffInvoice[];
  dnbFinance?: DnbFinance;
  returnableSupplier: 'Y' | 'N';
  deliveryMode: 'STANDARD_DELIVERY' | 'EXPRESS_DELIVERY' | 'PICKUP';
  previousTradeNames?: string;
  preferredOrderDay?: (
    | 'MONDAY'
    | 'TUESDAY'
    | 'WEDNESDAY'
    | 'THURSDAY'
    | 'FRIDAY'
    | 'SATURDAY'
    | 'SUNDAY'
  )[];
  preferredDeliveryDay?: (
    | 'MONDAY'
    | 'TUESDAY'
    | 'WEDNESDAY'
    | 'THURSDAY'
    | 'FRIDAY'
    | 'SATURDAY'
    | 'SUNDAY'
  )[];
  minOrderValue?: number;
  minOrderQty?: number;
  overReceivingFlag: 'Y' | 'N';
}

export interface SupplierInfo {
  nameTh: string;
  nameEn: string;

  taxType: string;
  taxCountry: string;
  taxId: string;

  businessRelationship: string;
  supType: string;
  supTradingType: string;
  smeFlag: string;
  numberOfEmp: number;
  productDivision: string;
  productType: string;
  documentQuality: string;
  connectionType: string;

  contactPersonName: string;
  contactPersonEmail: string;
  contactPersonPhone: string;

  buyerId: string;
  buyerPhone: string;
  remark?: string;
  juristicType: string;
  commercialTax: string;
  withholdingTax: string;
  distributionArea: string;
  incorporationCountry: string;
  businessCountry: string;
  commuLanguage: string;
  businessUnits: string[];

  addresses?: SupplierAddress[];
  contacts?: SupplierContact[];
  payments?: SupplierPayment[];
}

export interface SupplierRegistrationFormValues {
  information: SupplierInfo;
  sites: SupplierSite[];
}

export interface SupplierInfoItem {
  id: string;
  nameTh: string;
  nameEn: string;
  taxId: string;
  taxCountry: string;
  businessRelationship: string;
  supType: string;
  smeFlag: string;
  productDivision: string;
  businessCountry: string;
  businessUnits: string[];
  remark: string;
  juristicType: string;
  commercialTax: string;
  withholdingTax: string;
  distributionArea: string;
  incorporationCountry: string;
  commuLanguage: string;
  numberOfEmp: number;
  productType: string;
  documentQuality: string;
  connectionType: string;
  contactPersonName: string;
  contactPersonEmail: string;
  contactPersonPhone: string;
  buyerId: string;
  buyerPhone: string;
  annualRevenue: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface AddLeadFormValue {
  saleAt: string[];
  email: string;
  companyName: string;
  productCategory: string[];
  remarks: string;
}
