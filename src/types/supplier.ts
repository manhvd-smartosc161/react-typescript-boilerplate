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

export interface CompanyContact {
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

export interface CompanyPayment {
  id?: string;
  method: string;
  currency: string;
  bankName: string;
  bankBranch: string;
  accountNumber: string;
  accountName: string;
  accountType: 'CURRENT' | 'SAVINGS' | 'CHECKING';
  proofAttached: 'Y' | 'N';
  remittanceEmail: string;
  payeeName: string;
  apType: 'NORMAL' | 'ADVANCE' | 'URGENT';
  paymentTerm: string;
  additionalPaymentTerm?: string;
  invoiceSubmitChannel: 'WEB' | 'EMAIL' | 'MAIL' | 'FAX';
  vendorTraits: string;
  sendRemittanceAdvise: 'Y' | 'N';
  status: 'ACTIVE' | 'INACTIVE';
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

  addresses?: CompanyAddress[];
  contacts?: CompanyContact[];
  payments?: CompanyPayment[];
}

export interface SupplierRegistrationFormValues {
  inforamtion: SupplierInfo;
  sites: SupplierSite[];
}
