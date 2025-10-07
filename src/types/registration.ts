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
