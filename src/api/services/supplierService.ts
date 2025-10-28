import apiClient from '../index';
import { SUPPLIER_ENDPOINT } from '@src/constants';
import { SupplierRegistrationFormValues } from '@src/types/supplier';

export interface CreateSupplierResponse {
  id: string;
}

export interface UpdateSupplierResponse {
  id: string;
}

export interface GetSupplierResponse {
  id: string;
  information: any;
  sites: any[];
}

export const supplierService = {
  createSupplier: async (): Promise<CreateSupplierResponse> => {
    try {
      const response = await apiClient.post(SUPPLIER_ENDPOINT.CREATE, {});
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  updateSupplier: async (
    id: string,
    data: SupplierRegistrationFormValues,
  ): Promise<UpdateSupplierResponse> => {
    try {
      const transformedAddresses = data.information.addresses?.map(
        (address) => ({
          ...address,
          purpose: address.purpose?.map((purposeKey) => ({
            key: purposeKey,
            value: true,
          })),
          line_1: address.line1,
          line_2: address.line2,
        }),
      );

      const payload = {
        ...data.information,
        numberOfEmp: Number(data.information.numberOfEmp) || 0,
        addresses: transformedAddresses,
        sites: data.sites,
      };

      const response = await apiClient.patch(
        SUPPLIER_ENDPOINT.UPDATE(id),
        payload,
      );
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  getSupplierById: async (id: string): Promise<GetSupplierResponse> => {
    try {
      const response = await apiClient.get(SUPPLIER_ENDPOINT.GET_BY_ID(id));
      const apiData = response.data;

      const transformedAddresses = apiData.addresses?.map((address: any) => ({
        ...address,
        purpose: address.purpose?.map((purposeObj: any) => purposeObj.key),
      }));

      const transformedData: GetSupplierResponse = {
        id: apiData.id,
        information: {
          nameTh: apiData.nameTh || '',
          nameEn: apiData.nameEn || '',
          taxType: apiData.taxType || '',
          taxCountry: apiData.taxCountry || '',
          taxId: apiData.taxId || '',
          businessRelationship: apiData.businessRelationship || '',
          supType: apiData.supType || '',
          supTradingType: apiData.supTradingType || '',
          smeFlag: apiData.smeFlag || '',
          numberOfEmp: Number(apiData.numberOfEmp) || 0,
          productDivision: apiData.productDivision || '',
          productType: apiData.productType || '',
          documentQuality: apiData.documentQuality || '',
          connectionType: apiData.connectionType || '',
          contactPersonName: apiData.contactPersonName || '',
          contactPersonEmail: apiData.contactPersonEmail || '',
          contactPersonPhone: apiData.contactPersonPhone || '',
          buyerId: apiData.buyerId || '',
          buyerPhone: apiData.buyerPhone || '',
          remark: apiData.remark || '',
          juristicType: apiData.juristicType || '',
          commercialTax: apiData.commercialTax || '',
          withholdingTax: apiData.withholdingTax || '',
          distributionArea: apiData.distributionArea || '',
          incorporationCountry: apiData.incorporationCountry || '',
          businessCountry: apiData.businessCountry || '',
          commuLanguage: apiData.commuLanguage || '',
          businessUnits: apiData.businessUnits || [],
          addresses: transformedAddresses || [],
          contacts: apiData.contacts || [],
          payments: apiData.payments || [],
        },
        sites: apiData.sites || [],
      };

      return transformedData;
    } catch (error: any) {
      throw error;
    }
  },
};
